import axios from 'axios';

type ApiErrorPayload = {
  detail?: string | { message?: string };
  message?: string;
};

export const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getApiErrorMessage = (error: unknown) => {
  if (axios.isAxiosError<ApiErrorPayload>(error)) {
    const responseData = error.response?.data;

    if (typeof responseData?.detail === 'string') {
      return responseData.detail;
    }

    if (typeof responseData?.message === 'string') {
      return responseData.message;
    }

    if (responseData?.detail && typeof responseData.detail === 'object' && typeof responseData.detail.message === 'string') {
      return responseData.detail.message;
    }

    if (error.code === 'ERR_NETWORK') {
      return 'API недоступен. Проверьте, что серверная часть запущена на http://127.0.0.1:8000.';
    }

    if (typeof error.message === 'string' && error.message.length > 0) {
      return error.message;
    }
  }

  return 'Произошла непредвиденная ошибка. Попробуйте еще раз.';
};
