import { Controls } from "./Controls";
import { TimeDisplay } from "./TimeDisplay";
import { LapLatest } from "./LapLatest";
import { useStopwatch } from "./useStopwatch";

export const StopwatchCard = () => {
  const { status, laps, elapsedTime, start, stop, reset, lap } = useStopwatch();

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 1000 / 60 / 60)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((ms / 1000 / 60) % 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((ms / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const milliseconds = Math.floor(ms % 1000)
      .toString()
      .padStart(3, "0");

    return { hours, minutes, seconds, milliseconds };
  };

  const formatTimeText = (ms: number) => {
    const { minutes, seconds, milliseconds } = formatTime(ms);
    return `${minutes}'${seconds}"${milliseconds}`;
  };

  const { hours, minutes, seconds, milliseconds } = formatTime(elapsedTime);
  return (
    <div className="aspect-square rounded-2xl border border-white/10 bg-white/7 p-4">

      <div className="mt-5 rounded-2xl bg-linear-to-b from-white/10 to-white/5 p-5 ring-1 ring-white/10">
        <LapLatest laps={laps} formatTimeText={formatTimeText} />
        <TimeDisplay
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          milliseconds={milliseconds}
        />
      </div>

      <Controls
        statusConf={status}
        onStart={start}
        onStop={stop}
        onReset={reset}
        onLap={lap}
      />
    </div>
  );
};