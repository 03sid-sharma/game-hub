import { useState, useEffect } from "react";
import apiGpt from "../services/api-gpt";
import { CanceledError } from "axios";

export interface GptRequest {
  contents: Content[];
}

export interface GptResponse {
  candidates: Candidate[];
}

export interface Candidate {
  content: Content;
}

export interface Content {
  parts: ContentPart[];
  role: string;
}

export interface ContentPart {
  text: string;
}

const useGpt = (initialRequest?: GptRequest, deps?: any[]) => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const sendRequest = async (requestConfig: GptRequest) => {
    try {
      setLoading(true);
      const response = await apiGpt.post<GptResponse>("", {
        ...requestConfig,
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      if (err instanceof CanceledError) return null;
      setError((err as Error).message);
      setLoading(false);
      return null;
    }
  };

  useEffect(
    () => {
      if (initialRequest) {
        sendRequest(initialRequest);
      }
    },
    deps ? [...deps] : []
  );

  return {error, isLoading, sendRequest };
};

export default useGpt;
