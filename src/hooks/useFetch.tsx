import { TradeData } from 'data/data';
import { ITradeData } from 'models/typescript';
import { useState, useEffect } from 'react';

const initialData: ITradeData = { participants: [], startTradeTime: 0 };
export const useFetch = (url: string) => {
  const [data, setData] = useState(initialData);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getTradeData = async (url: string) => {
      setIsLoading(true);
      try {
        // если бы был сервер было бы как то так, или через axios
        // const res = await fetch(url, {
        //   headers: { Authorization: `Bearer ${API_TOKEN}` },
        // });
        // const data = await res.json();

        setTimeout(() => {
          setData(TradeData);
          setIsLoading(false);
        }, 1000);
      } catch (e) {
        setIsError(true);
      } finally {
        // если бы был сервер было бы как то так
        // setIsLoading(false);
      }
    };

    getTradeData(url);
  }, [url]);
  return { data, isLoading, isError };
};
