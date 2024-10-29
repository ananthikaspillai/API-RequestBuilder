interface RequestConfig<TBody> {
    params?: Record<string, string | number>;
    query?: Record<string, string | number | boolean>;
    body?: TBody;
    headers?: Record<string, string>;
}

class RequestBuilder<TBody, TResponse> {
    private value: RequestConfig<TBody> = {};
  
    constructor(value?: RequestConfig<TBody>) {
      if (value) this.value = value;
    }
  
    withParams<P extends Record<string, string | number>>(
      params: P
    ): RequestBuilder<TBody, TResponse> {
      this.value.params = params;
      return this;
    }
  
    withQuery<Q extends Record<string, string | number | boolean>>(
      query: Q
    ): RequestBuilder<TBody, TResponse> {
      this.value.query = query;
      return this;
    }
  
    withBody<B extends TBody>(body: B): RequestBuilder<B, TResponse> {
      this.value.body = body;
      return new RequestBuilder<B, TResponse>(this.value as RequestConfig<B>);
    }
  
    withResponseType<R>(): RequestBuilder<TBody, R> {
      return new RequestBuilder<TBody, R>(this.value);
    }
  
    async execute(): Promise<TResponse> {
      console.log('Executing request with value:', this.value);
  
     
      return new Promise((resolve) =>
        setTimeout(() => {
          const mockResponse = { id: 1, name: 'John' } as unknown as TResponse;
          resolve(mockResponse);
        }, 500)
      );
    }
  }
  interface User {
    id: number;
    name: string;
  }
  
  interface CreateUserRequest {
    name: string;
    email: string;
  }
  
  const request = new RequestBuilder<CreateUserRequest, User>()
    .withParams({ organizationId: '123' })
    .withQuery({ include: 'profile' })
    .withBody({
      name: 'John',
      email: 'john@example.com',
    })
    .execute();
  
  request.then((response) => console.log('Response:', response));