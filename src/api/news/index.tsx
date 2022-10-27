import type { AxiosRequestConfig } from "axios";

import HttpClient from "../httpClient";

class NewsApi extends HttpClient {
  public constructor() {
    super(`${process.env.NEWS_API_BASE_URL}`);
    this.initializeRequestInterceptor();
  }

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this.handleRequest,
      this.handleError
    );
  };

  private handleRequest = (config: AxiosRequestConfig | any) => {
    return config;
  };

  public async getNewsTest(): Promise<any> {
    return this.instance.get(`/news`);
  }
}

export default new NewsApi();
