import { tradeData } from 'data/data';
import { ITradeData } from 'models/typescript';

// A mock function to mimic making an async request for data
export function fetchGetTradeRoom() {
  // если бы использовался сервер использовался бы экземпляр axios(api):
  // const response = await api.get<ITradeData>(
  //   `url`
  // );
  // return response.data;

  return new Promise<{ data: ITradeData }>((resolve) =>
    setTimeout(() => resolve({ data: tradeData }), 1000)
  );
}
