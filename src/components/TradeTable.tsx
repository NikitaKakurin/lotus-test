import { useEffect, useState } from 'react';
import { fixCost } from 'utils/fixCost';
import { BsPersonCircle } from 'react-icons/bs';
import { timerLength } from 'constants/timer';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getTradeRoomAsync } from 'app/slices/tradeRoomSlice';
import Timer from './timer/Timer';
import { fixTimer } from 'utils/fixTimer';

export default function TradeTable() {
  const dispatch = useAppDispatch();
  const [timerTime, setTimerTime] = useState(timerLength);
  const [currentPlayerIndex, setCurrentPlayer] = useState(0);
  const { data } = useAppSelector((state) => state.tradeRoom);
  const { startTradeTime, participants, minDiscount, wantedCost } = data;

  useEffect(() => {
    dispatch(getTradeRoomAsync());
  }, []);

  useEffect(() => {
    function timer() {
      const currentTime = Date.now();
      const diffTimeSS = Math.floor((currentTime - startTradeTime) / 1000);
      const currentPlayer = Math.floor(diffTimeSS / timerLength) % participants.length;
      const currentTimerTime = diffTimeSS % timerLength;
      setTimerTime(currentTimerTime);
      setCurrentPlayer(currentPlayer);
    }
    const interval = setInterval(timer, 1000);
    return () => clearInterval(interval);
  }, [startTradeTime, participants]);
  return (
    <table className="text-center text-sm">
      <tbody className="[&>*:nth-child(odd)]:bg-gray-200/50 [&>*:nth-child(1)]:bg-transparent">
        <tr className="h-[100px]">
          <th className="min-w-[400px] font-normal uppercase text-cyan-500">ХОД</th>
          {participants.map((item, index) => (
            <td key={item.id}>
              <Timer isShowTimer={index === currentPlayerIndex}>{fixTimer(timerTime)}</Timer>
            </td>
          ))}
        </tr>
        <tr>
          <th className="min-w-[400px] font-normal uppercase text-cyan-500">
            ПАРАМЕТРЫ И ТРЕБОВАНИЯ
          </th>
          {participants.map((item, index) => (
            <td key={item.id} className="min-w-[300px] font-normal uppercase text-cyan-500">
              <p>{`УЧАСТНИК №${index + 1}`}</p>
              <p className="flex items-center justify-center gap-2 font-medium">
                {item.isOnline && <BsPersonCircle color="rgb(34 197 94)" />}
                {item.name}
              </p>
            </td>
          ))}
        </tr>
        <tr>
          <th className="p-2 text-left font-normal">
            Наличие комплекса мероприятий, повышающих стандарты изготовления
          </th>
          {participants.map((item) => (
            <td key={item.id}>
              <p>{item.qualityActivities || '·'}</p>
            </td>
          ))}
        </tr>
        <tr>
          <th className="p-2 text-left font-normal">Сроки изготовления лота, дней</th>
          {participants.map((item) => (
            <td key={item.id}>
              <p>{item.productionTime}</p>
            </td>
          ))}
        </tr>
        <tr>
          <th className="p-2 text-left font-normal">Гарантийные обязательства, мес</th>
          {participants.map((item, index) => (
            <td key={item.id}>
              <p>{item.warranty}</p>
            </td>
          ))}
        </tr>
        <tr>
          <th className="p-2 text-left font-normal">Условия оплаты, мес</th>
          {participants.map((item) => (
            <td key={item.id}>
              <p>{item.paymentTerms}</p>
            </td>
          ))}
        </tr>
        <tr>
          <th className="p-2 text-left font-normal">Стоимость изготовления лота, руб. (без НДС)</th>
          {participants.map((item) => (
            <td key={item.id}>
              <p className="text-blue-500">{fixCost(item.cost)}</p>
              <p className="text-red-500">-{fixCost(minDiscount)}</p>
              <p className="text-green-500">{fixCost(wantedCost)}</p>
            </td>
          ))}
        </tr>
        <tr>
          <th className="min-h-[20px] p-2 text-left font-normal">Действия</th>
          {participants.map((item) => (
            <td key={item.id}>
              <p>{item.actions}</p>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
