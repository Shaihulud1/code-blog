export type RequestConfig = {
    method: 'post' | 'get';
    url: string;
    body?: unknown;
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
}

export type ViAxiosResponse = {
    success: boolean;
    response: unknown;
    error?: {
        message: string,
        code: string,
    },
    code: number;
}
