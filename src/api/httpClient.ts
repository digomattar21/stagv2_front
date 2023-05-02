import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export default abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: any) {
    this.instance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  public initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      const token = localStorage.getItem('token');
      if (token) {
        if (!config.headers) {
          config.headers = {};
        }
        console.log('aqui');
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
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
