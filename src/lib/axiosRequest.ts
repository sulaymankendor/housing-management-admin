import axios, { AxiosError } from "axios";
import { expenseType, landlordType, receiptType, tenantType } from "./types";
import { UseFormReset } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";

type RequestState = {
  isLoading: boolean;
  axiosRequestError: string;
};

export const axisoRequest = {
  get: async (
    routeSegment: string,
    setRequest: Dispatch<SetStateAction<RequestState>>
  ): Promise<any> => {
    setRequest((currentRequestState) => {
      return { ...currentRequestState, isLoading: true };
    });
    try {
      const response = await axios.get(`/api/${routeSegment}`);
      setRequest((_) => {
        return {
          isLoading: false,
          axiosRequestError: "",
        };
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setRequest((_) => {
        return {
          isLoading: false,
          axiosRequestError: errorMessage,
        };
      });
    }
  },

  getBasedOnID: async (
    routeSegment: string,
    setRequest: Dispatch<SetStateAction<RequestState>>,
    id: string | number,
    idName: string
  ): Promise<any> => {
    setRequest((currentRequestState) => {
      return { ...currentRequestState, isLoading: true };
    });
    try {
      const response = await axios.get(`/api/${routeSegment}?${idName}=${id}`);
      setRequest((_) => {
        return {
          isLoading: false,
          axiosRequestError: "",
        };
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setRequest((_) => {
        return {
          isLoading: false,
          axiosRequestError: errorMessage,
        };
      });
    }
  },

  post: async (
    routeSegment: string,
    newLandlord: landlordType | tenantType | expenseType | receiptType,
    setRequest: Dispatch<SetStateAction<RequestState>>,
    reset: UseFormReset<any>
  ): Promise<any> => {
    setRequest((currentRequestState) => {
      return {
        ...currentRequestState,
        isLoading: true,
      };
    });

    try {
      const response = await axios.post(`/api/${routeSegment}`, newLandlord);
      setRequest((_) => {
        return {
          isLoading: false,
          axiosRequestError: "",
        };
      });
      reset();
      return response.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setRequest((_) => {
        return {
          isLoading: false,
          axiosRequestError: errorMessage,
        };
      });
    }
  },

  delete: async (
    id: string,
    routeSegment: string,
    setRequest: Dispatch<SetStateAction<RequestState>>
  ): Promise<void> => {
    setRequest((currentRequestState) => {
      return { ...currentRequestState, isLoading: true };
    });
    try {
      const response = await axios.delete(`/api/${routeSegment}?id=${id}`);
      setRequest((_) => {
        return {
          isLoading: false,
          axiosRequestError: "",
        };
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setRequest((_) => {
        return {
          isLoading: false,
          axiosRequestError: errorMessage,
        };
      });
    }
  },
};
