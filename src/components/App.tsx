import { useState } from 'react';
import Button from './Button';
import Popup from 'components/popup/Popup';
import TradeRoom from './TradeRoom';

function App() {
  const [isShowRoom, setShowRoom] = useState(false);
  return (
    <div className="min-h-screen bg-slate-100">
      <Button onClick={() => setShowRoom(true)}>open room</Button>
      <Popup popupVisible={isShowRoom} setPopupVisible={setShowRoom}>
        <TradeRoom></TradeRoom>
      </Popup>
    </div>
  );
}

export default App;
