import type { Lap } from "./type";

type Props = {
  laps: Lap[];
  formatTimeText: (ms: number) => string;
};

export const LapLatest = ({ laps, formatTimeText }: Props) => {
  const latest = laps.at(-1);

  const lapNumber = latest?.lap ?? 0;
  const lapTime = latest?.lapTime ?? 0;
  const totalTime = latest?.totalTime ?? 0;

  return (
    <div>
      <div className="grid grid-cols-[64px_40px_1fr] grid-rows-2 items-center gap-x-4 gap-y-3">
        <div className="text-sm uppercase tracking-wide text-slate-300">
          SPLIT
        </div>

        <div className="row-span-2 self-center text-center text-2xl text-slate-200">
          {lapNumber}
        </div>
        
        <div className="text-right font-mono tabular-nums text-3xl text-slate-100">
          {formatTimeText(totalTime)}
        </div>

        <div className="text-sm uppercase tracking-wide text-slate-300">
          LAP
        </div>
        
        <div className="text-right font-mono tabular-nums text-3xl text-slate-100">
          {formatTimeText(lapTime)}
        </div>
      </div>

      <div className="mt-2 border-t border-white/20" />
    </div>
  );
};
