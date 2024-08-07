import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { messageContent, setMessageContent } from "@/stores/atom";
import { deleteSession, getSession } from "@/utils/session";

export class ApiService {
  /**
   * Create Axios Instance.
   */
  private axiosInstance: AxiosInstance;
  /**
   * Login data declaration from local storage.
   * @returns Login Data string
   */
  private loginData(): string {
    const session = getSession();

    return session.token ?? "";
  }

  /**
   * API Service constructor.
   * Contains of declaration of API Base URL, Request Interceptor, and Response Interceptor.
   */
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  /**
   * Request Interceptor
   * For intercepting the request call to the API.
   * Adding the Authorization headers for using a access token from Backend
   */
  private initializeRequestInterceptor(): void {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.loginData();
        config.headers["Authorization"] = token;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  /**
   * Response Interceptor
   * For intercepting the response call to the API.
   */
  private initializeResponseInterceptor(): void {
    this.axiosInstance.interceptors.response.use(undefined, async (err) => {
      if (err.response.status === 401) {
        this.errorHandling;
      }
      return Promise.reject(err);
    });
  }

  /**
   * Notification Handling
   * To store the message content to Jotai Atom state management.
   * @param type Toast Message type
   * @param message Message from API Response
   * @returns Message Response string
   */
  private notifHandling(type: any, message: string) {
    setMessageContent.set(messageContent, {
      type: type,
      message: message,
    });
    return message;
  }

  /**
   * Error Handling
   * Used for handling the error when the token is invalid.
   * @param error Error response from API
   * @returns Notification handling function
   */
  private errorHandling(error: AxiosError) {
    delete axios.defaults.headers["Authorization"];
    delete axios.defaults.headers.common["Authorization"];
    if (error?.response?.status === 401) {
      deleteSession();
    }
    return this.notifHandling("warning", String(error?.response));
  }

  /**
   * Request function
   * Used for generalizing the request method from Axios.
   * @param config Axios Request Config
   * @returns Axios Instance function
   */
  protected async request(config: AxiosRequestConfig) {
    return this.axiosInstance(config)
      .then((response) => response)
      .catch((error) => {
        if ("response" in error)
          return this.notifHandling("warning", error.response);
        return this.notifHandling(
          "warning",
          "We can't continue with your request. Please try again later."
        );
      });
  }

  public async get(url: string) {
    return await this.request({ method: "GET", url: url });
  }

  public async post(url: string, payload?: any) {
    return await this.request({ method: "POST", url: url, data: payload });
  }

  public async put(url: string, payload?: any) {
    return await this.request({ method: "PUT", url: url, data: payload });
  }

  public async patch(url: string, payload?: any) {
    return await this.request({ method: "PATCH", url: url, data: payload });
  }

  public async delete(url: string, payload?: any) {
    return await this.request({ method: "DELETE", url: url, data: payload });
  }
}

const apiService = new ApiService();

export default apiService;
