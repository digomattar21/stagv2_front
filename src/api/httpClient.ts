/* eslint class-methods-use-this: "off" */
import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';

export default abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: any) {
    this.instance = axios.create({
      baseURL,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-api-key': 'UOFtwW7dTk6PloufJOkYEvXp3hzKn2xakqMY4kYa'
    //   }
    });

    this.initializeResponseInterceptor();
  }

  public initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this.handleResponse, this.handleError);
  };

  public handleResponse = ({ data }: AxiosResponse) => data;

  public handleError = (error: any) => Promise.reject(error);
}
