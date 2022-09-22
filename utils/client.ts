import { APIResponse } from '../types';

const wait = (s: number) =>
  new Promise<never>((_, reject) =>
    setTimeout(() => {
      reject(`Request timeout. Server took too long to respond (${s} seconds)`);
    }, s * 1000)
  );

export const client = async <T>(
  path: string,
  options?: {
    method: 'POST' | 'DELETE' | 'PATCH';
    body: any;
  }
) => {
  try {
    const url = `/api/${path}`;

    const resPromise = !options
      ? fetch(url)
      : fetch(url, {
          method: options.method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(options.body),
        });

    const res = await Promise.race([resPromise, wait(10)]);

    const data: APIResponse<T> = await res.json();

    if (data.status === 'success') {
      return data.data;
    } else {
      throw new Error(`${data.message}. (${res.status})`);
    }
  } catch (err) {
    throw err;
  }
};
