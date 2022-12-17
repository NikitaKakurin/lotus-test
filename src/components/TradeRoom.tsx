import { useFetch } from 'hooks/useFetch';
import React, { useEffect, useState } from 'react';
import { fixCost } from 'utils/fixCost';
import Spinner from './spinner/Spinner';
import { BsChatLeftText, BsPersonCircle } from 'react-icons/bs';
import { RxUpdate } from 'react-icons/rx';
import { FaHammer } from 'react-icons/fa';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Button from './Button';
import { timerLength } from 'constants/timer';
import { fixTimer } from 'utils/fixTimer';
import { GiSandsOfTime } from 'react-icons/gi';

interface IProps {
  setPopupVisible: (arg: boolean) => void;
}

export default function TradeRoom({ setPopupVisible }: IProps) {
  const title = 'Тестовые торги на аппарат ЛОТОС №2033564 (09.11.2020 07:00)';
  const [timerTime, setTimerTime] = useState(timerLength);
  const [currentPlayerIndex, setCurrentPlayer] = useState(0);
  const { isError, isLoading, data } = useFetch('some url');
  const { startTradeTime, participants } = data;
  const minDiscount = 25000;
  const wantedCost = 2475000;

  useEffect(() => {
    function timer() {
      const currentTime = Date.now();
      const diffTimeSS = Math.floor((currentTime - startTradeTime) / 1000);
      const currentPlayer = Math.floor(diffTimeSS / timerLength) % participants.length;
      const currentTimerTime = diffTimeSS % timerLength;
      console.log(currentTimerTime);
      setTimerTime(currentTimerTime);
      setCurrentPlayer(currentPlayer);
      console.log(currentPlayer);
    }
    const interval = setInterval(timer, 1000);
    return () => clearInterval(interval);
  }, [startTradeTime, participants]);

  return (
    <div className="h-[95vh] w-[96vw] overflow-y-auto rounded-lg bg-slate-50 p-5">
      <Spinner isLoading={isLoading} />
      <h2 className="mb-4 w-full border-b-2 border-gray-400/70 pb-5 text-xl text-red-400">
        Ход торгов <span className="text-xl font-medium text-red-500">{title}</span>
      </h2>
      <p className="rounded-xs  inline bg-gray-200/90 px-1 text-red-400">
        Уважаемые участники, во время вашего хода вы можете изменить параметры торгов, указанных в
        таблице:
      </p>
      {isError ? (
        <h2 className="text-lg font-semibold text-red-500">Error Message</h2>
      ) : (
        <div className="mt-8 h-[70%] overflow-auto">
          <table className="text-center text-sm">
            <tbody className="[&>*:nth-child(odd)]:bg-gray-200/50 [&>*:nth-child(1)]:bg-transparent">
              <tr className="h-[100px]">
                <th className="min-w-[400px] font-normal uppercase text-cyan-500">ХОД</th>
                {participants.map((item, index) => (
                  <td key={item.id}>
                    {currentPlayerIndex === index && (
                      <div className="relative flex h-[50px] items-center justify-center rounded-sm bg-red-200">
                        <span>{fixTimer(timerTime)}</span>
                        <span className="absolute top-[16px] right-[14px]">
                          <GiSandsOfTime size="18px" />
                        </span>
                      </div>
                    )}
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
                <th className="p-2 text-left font-normal">
                  Стоимость изготовления лота, руб. (без НДС)
                </th>
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
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-2 pt-3 sm:justify-end">
        <Button color="green">
          <div className="flex flex-nowrap items-center justify-between gap-1">
            <span>ЧАТ</span>
            <BsChatLeftText />
          </div>
        </Button>
        <Button>
          <div className="flex flex-nowrap items-center justify-between gap-1">
            <span>ОБНОВИТЬ</span>
            <RxUpdate />
          </div>
        </Button>
        <Button color="red">
          <div className="flex flex-nowrap items-center justify-between gap-1">
            <span>ЗАВЕРШИТЬ ТОРГИ</span>
            <FaHammer color="white" />
          </div>
        </Button>
        <Button color="whiteRed">
          <div className="flex flex-nowrap items-center justify-between gap-1">
            <span className="text-red-400">ОТЧЕТ</span>
            <HiOutlineNewspaper color="red" />
          </div>
        </Button>
        <Button onClick={() => setPopupVisible(false)} color="gray">
          <div className="flex flex-nowrap items-center justify-between gap-1">
            <span>ЗAКРЫТЬ</span>
            <AiOutlineCloseCircle />
          </div>
        </Button>
      </div>
    </div>
  );
}
