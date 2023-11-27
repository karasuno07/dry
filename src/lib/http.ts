import cache from '@lib/cache';
import { Prisma } from '@prisma/client';
import { HttpClientError, HttpMethod, HttpServerError } from 'api';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

interface HttpConfig<D> extends Omit<AxiosRequestConfig<D>, 'url' | 'method'> {
  revalidateSeconds?: number;
}

const defaultAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_DOMAIN_URL || 'http://localhost:3000',
  headers: {},
});

export const http = (axiosInstance: AxiosInstance = defaultAxiosInstance) => {
  async function fetch<T = any, D = any>(
    method: HttpMethod,
    url: string,
    config?: HttpConfig<D>
  ): Promise<T> {
    const cachedKey = `${method}-${url}${
      config?.params ? '-' + JSON.stringify(config.params) : ''
    }`;
    const revalidateSeconds = config?.revalidateSeconds || 1000;
    const cachedData = cache.get<T>(cachedKey);

    if (
      cachedData !== undefined &&
      cache.getTtl(cachedKey) !== undefined &&
      (cache.getTtl(cachedKey) as number) > 0
    ) {
      return convertObjectToPromise(cachedData);
    }

    try {
      const response = await axiosInstance<T, AxiosResponse<T, any>, D>({
        method,
        url,
        ...config,
      });
      const data = response.data;
      cache.set(cachedKey, data, revalidateSeconds);
      return data satisfies T;
    } catch (error) {
      console.error(error);
      return await Promise.reject(error);
    }
  }

  return {
    get<T = any, D = any>(url: string, config?: HttpConfig<D>) {
      return fetch<T, D>('GET', url, config);
    },
    post<T = any, D = any>(url: string, config?: HttpConfig<D>) {
      return fetch<T, D>('POST', url, config);
    },
    put<T = any, D = any>(url: string, config?: HttpConfig<D>) {
      return fetch<T, D>('PUT', url, config);
    },
    delete<T = any, D = any>(url: string, config?: HttpConfig<D>) {
      return fetch<T, D>('DELETE', url, config);
    },
  };
};

export function apiHandler(handler: { [method: string]: Function }) {
  const wrappedHandler: any = {};
  const httpMethods: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  httpMethods.forEach((method) => {
    if (typeof handler[method] !== 'function') return;

    wrappedHandler[method] = async (req: NextRequest, ...args: any) => {
      try {
        // global middleware

        // route handler
        const response: NextResponse = await handler[method](req, ...args);
        const body = await response.json();

        return NextResponse.json(body, {
          status: response.status,
          headers: response.headers,
        });
      } catch (err: any) {
        // global error handler
        return errorHandler(err);
      }
    };
  });

  return wrappedHandler;
}

function errorHandler(error: unknown) {
  if (error instanceof HttpClientError) {
    return HttpClientError.json(error);
  } else if (error instanceof HttpServerError) {
    return HttpServerError.json(error);
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return HttpClientError.json(
        HttpClientError.badClient('Unique constraint violation.', error.meta)
      );
    }
  } else if (error instanceof TypeError || error instanceof SyntaxError) {
    return HttpClientError.json(
      HttpClientError.badClient(error.message, error.cause as string)
    );
  } else {
    console.error(error);
    return HttpServerError.json(
      HttpServerError.internalServerError(error as string)
    );
  }
}

function convertObjectToPromise<T>(obj: T): Promise<T> {
  return new Promise<T>((resolve, _) => {
    resolve(obj);
  });
}
