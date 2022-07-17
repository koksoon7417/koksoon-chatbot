import axios, { Method } from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export class Server {
  static async request<T>(args: {
    method: Method,
    url: string,
    data?: any
  }): Promise<T> {
    const { method, url, data } = args;
    
    return axios
      .request({
        method,
        url,
        baseURL: BASE_URL,
        data,
        responseType: 'json'
      }).then(res => {
        const { data } = res;

        return data;
      }).catch((err) => {
        throw err;
      });
  }
}
