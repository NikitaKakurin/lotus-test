import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './timer.css';
import { GiSandsOfTime } from 'react-icons/gi';

interface IProps {
  isShowTimer: boolean;
  children: string;
}
export default function Timer({ isShowTimer, children }: IProps) {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isShowTimer}
      timeout={300}
      mountOnEnter
      unmountOnExit
      classNames="timer-animation"
    >
      <div
        ref={nodeRef}
        className="relative flex h-[50px] items-center justify-center rounded-sm bg-red-200"
      >
        <span>{children}</span>
        <span className="absolute top-[16px] right-[14px]">
          <GiSandsOfTime size="18px" />
        </span>
      </div>
    </CSSTransition>
  );
}
