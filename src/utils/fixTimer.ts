import { timerLength } from 'constants/timer';

export function fixTimer(seconds: number) {
  const time = timerLength - seconds;
  const mm = `0${Math.floor(time / 60)}`;
  const sec = time % 60;
  const ss = sec > 9 ? `${sec}` : `0${sec}`;
  return `${mm}:${ss}`;
}
