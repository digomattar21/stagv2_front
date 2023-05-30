import type { AxiosRequestConfig } from 'axios';

import HttpClient from '../httpClient';

class ArticlesApi extends HttpClient {
  public constructor() {
    super(`${process.env.REACT_APP_BASE_URL}`);
    this.initializeRequestInterceptor();
  }

  public initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this.handleRequest,
      this.handleError
    );
  };

  private handleRequest = (config: AxiosRequestConfig | any) => {
    if (config) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  };

  public async submitArticles(payload: any): Promise<any> {
    return this.instance.post(`/userArticles/articles-submission`, payload);
  }
}

export default new ArticlesApi();
