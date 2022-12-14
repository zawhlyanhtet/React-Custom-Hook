import { useCallback, useState } from "react";

const useHttp = function () {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    try {
      const res = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      if (!res.ok) throw new Error("Request failed!");

      const data = await res.json();

      applyData(data);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  }, []);
  return { isLoading, error, sendRequest };
};

export default useHttp;
