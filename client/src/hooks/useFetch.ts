import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (API_URL: string) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const response = await axios.get(API_URL, {
          signal,
        });

        if (response.status === 200) {
          setData(response.data);
          setIsLoading(false);
          setIsSuccess(true);
        } else {
          console.error(`HTTP error! Status: ${response.status}`);
          setIsSuccess(false);
        }
      } catch (error) {
        setIsLoading(false);
        setIsSuccess(false);
        if (!axios.isCancel(error)) {
          console.error(error);
        }
      }
    })();

    return () => {
      // Cancel the request when the component unmounts
      controller.abort();
    };
  }, [API_URL]);

  return { isLoading, isSuccess, data };
};

export default useFetch;
