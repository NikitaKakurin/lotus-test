import React, { ReactNode, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './popup.css';

interface IProps {
  popupVisible: boolean;
  setPopupVisible: (arg: boolean) => void;
  children: ReactNode;
}

export default function Popup({ popupVisible, setPopupVisible, children }: IProps) {
  const [innerAnim, setInnerAnim] = useState(false);
  const outerRef = React.useRef(null);
  const innerRef = React.useRef(null);
  return (
    <CSSTransition
      nodeRef={outerRef}
      in={popupVisible}
      timeout={500}
      mountOnEnter
      unmountOnExit
      classNames="external-animation"
      onEnter={() => setInnerAnim(true)}
      onExited={() => setInnerAnim(false)}
    >
      <div
        ref={outerRef}
        className="overlay"
        onClick={() => {
          setInnerAnim(false);
          setPopupVisible(false);
        }}
      >
        <CSSTransition
          nodeRef={innerRef}
          in={innerAnim}
          timeout={400}
          mountOnEnter
          unmountOnExit
          classNames="inner-animation"
        >
          <div ref={innerRef} className="popup" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
}
