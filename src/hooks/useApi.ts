import { RequestBaseConfig, RequestConfig, ResponseStatus, http } from '@lib/http';
import { useState } from 'react';
import { HttpError, HttpMethod } from 'types/api';

export function useApi<T = any>(defaultConfig?: Omit<RequestBaseConfig, 'external'>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<ResponseStatus | null>(null);
  const [error, setError] = useState<HttpError | undefined>(undefined);

  const request = async (method: HttpMethod, url: string, config?: RequestConfig) => {
    setLoading(true);
    setError(undefined);
    let status: ResponseStatus = null;
    let data: T | null = null;

    try {
      const response = await http({ external: true, ...defaultConfig }).fetch<T>(
        method,
        url,
        config
      );
      status = response.status;
      data = response.data;
      setData(data);
    } catch (error) {
      const httpError = error as HttpError;
      setError(httpError);
    } finally {
      setLoading(false);
      setStatus(status);
    }

    return {
      status,
      data,
    };
  };

  return {
    data,
    loading,
    status,
    error,
    GET: (url: string, config?: RequestConfig) => request('GET', url, config),
    POST: (url: string, config?: RequestConfig) => request('POST', url, config),
    PUT: (url: string, config?: RequestConfig) => request('PUT', url, config),
    PATCH: (url: string, config?: RequestConfig) => request('PATCH', url, config),
    DELETE: (url: string, config?: RequestConfig) => request('DELETE', url, config),
  };
}
