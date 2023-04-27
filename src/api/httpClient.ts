/* eslint class-methods-use-this: "off" */
import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';

export default abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: any) {
    this.instance = axios.create({
      baseURL,
    });

    this.initializeResponseInterceptor();
    this.setAuthorizationHeader();
  }

  private setAuthorizationHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
      this.instance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;
    }
  };

  public initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  };

  public handleResponse = ({ data }: AxiosResponse) => data;

  public handleError = (error: any) => Promise.reject(error);
}
