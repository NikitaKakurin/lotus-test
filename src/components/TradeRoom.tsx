import Spinner from './spinner/Spinner';
import { BsChatLeftText } from 'react-icons/bs';
import { RxUpdate } from 'react-icons/rx';
import { FaHammer } from 'react-icons/fa';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Button from './Button';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getTradeRoomAsync } from 'app/slices/tradeRoomSlice';
import TradeTable from 'components/TradeTable';

interface IProps {
  setPopupVisible: (arg: boolean) => void;
}

export default function TradeRoom({ setPopupVisible }: IProps) {
  const dispatch = useAppDispatch();

  const { isError, isLoading, data } = useAppSelector((state) => state.tradeRoom);
  const { title } = data;
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
          <TradeTable />
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-2 pt-3 sm:justify-end">
        <Button color="green">
          <div className="flex flex-nowrap items-center justify-between gap-1">
            <span>ЧАТ</span>
            <BsChatLeftText />
          </div>
        </Button>
        <Button onClick={() => dispatch(getTradeRoomAsync())}>
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
