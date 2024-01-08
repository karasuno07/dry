import { Prisma } from '@prisma/client';
import { assign } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';
import { HttpClientError, HttpMethod, HttpServerError } from 'types/api';

export type RequestBaseConfig = {
  baseURL?: string;
  headers?: HeadersInit;
  external?: boolean;
};
export type RequestConfig<D = any> = Omit<RequestInit, 'method'> & {
  json?: D;
  params?: Record<string, any>;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
};
export type RequestHandlers<T = any> = {
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
};
export type ResponseStatus = {
  code: number;
  text: string;
} | null;
export type ResponseData<T = any, R = unknown> = {
  status: ResponseStatus;
  data: T | null;
  error: R;
};

export const http = (baseConfig?: RequestBaseConfig) => {
  async function request<T = any, D = any>(
    method: HttpMethod,
    url: string,
    config?: RequestConfig<D>,
    handlers?: RequestHandlers<T>
  ): Promise<ResponseData<T>> {
    const baseURL = baseConfig?.external
      ? process.env.NEXT_PUBLIC_API_DOMAIN_URL || 'http://localhost:3000'
      : baseConfig?.baseURL;
    const baseHeaders = baseConfig?.headers;
    let status: ResponseStatus = null;

    try {
      const params = config?.params ? new URLSearchParams(config.params) : undefined;
      const requestUrl = baseURL
        ? concatSearchParams(concatURL(baseURL, url), params)
        : concatSearchParams(url, params);
      const headers = assign(config?.headers, baseHeaders);

      const response = await fetch(requestUrl, {
        method,
        headers,
        body: config?.json ? JSON.stringify(config.json) : config?.body,
        ...config,
      });

      const acceptStatuses = ['GET', 'PUT', 'PATCH', 'DELETE'].includes(method)
        ? [200]
        : [200, 201];
      if (!acceptStatuses.includes(response.status)) {
        throw new Error(`Fail to fetch request on ${requestUrl}`);
      }

      status = {
        code: response.status,
        text: response.statusText,
      };

      let data;
      switch (config?.responseType) {
        case 'text':
          data = await response.text();
          break;
        case 'arraybuffer':
          data = await response.arrayBuffer();
          break;
        case 'blob':
          data = await response.blob();
          break;
        default:
          data = await response.json();
          break;
      }

      if (handlers?.onSuccess) {
        handlers.onSuccess(data);
      }

      return {
        status,
        data,
        error: null,
      };
    } catch (err: unknown) {
      if (handlers?.onError) {
        handlers.onError(err);
      } else {
        console.log(err);
      }

      return {
        status,
        data: null,
        error: err,
      };
    }
  }

  return {
    fetch: request,
    get<T = any, D = AnimationPlayState>(
      url: string,
      config?: RequestConfig,
      handlers?: RequestHandlers
    ) {
      return request<T, D>('GET', url, config, handlers);
    },
    post<T = any, D = AnimationPlayState>(
      url: string,
      config?: RequestConfig,
      handlers?: RequestHandlers
    ) {
      return request<T, D>('POST', url, config, handlers);
    },
    put<T = any, D = AnimationPlayState>(
      url: string,
      config?: RequestConfig,
      handlers?: RequestHandlers
    ) {
      return request<T, D>('PUT', url, config, handlers);
    },
    delete<T = any, D = AnimationPlayState>(
      url: string,
      config?: RequestConfig,
      handlers?: RequestHandlers
    ) {
      return request<T, D>('DELETE', url, config, handlers);
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
    return HttpClientError.json(HttpClientError.badClient(error.message, error.cause as string));
  } else {
    console.error(error);
    return HttpServerError.json(HttpServerError.internalServerError(error as string));
  }
}

function concatURL(base: string, ...urls: string[]) {
  let result = base + urls.join('/');
  return result.replace(/([^:\\/])\/+/g, '$1/');
}

function concatSearchParams(url: string, params?: URLSearchParams) {
  return params ? url.concat(`?${params.toString()}`) : url;
}
