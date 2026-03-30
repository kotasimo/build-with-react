import { Controls } from "./Controls";
import { Header } from "./Header";
import { LapTable } from "./LapTable";
import { TimeDisplay } from "./TimeDisplay";
import { useStopwatch } from "./useStopwatch";
import { LapLatest } from "./LapLatest";

export default function App() {
  const { status, laps, elapsedTime, start, stop, reset, lap } = useStopwatch();

  // 時間を表示するためのフォーマット関数
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

  // ラップ用のフォーマット
  const formatTimeText = (ms: number) => {
    const { hours, minutes, seconds, milliseconds } = formatTime(ms);
    return `${hours}:${minutes}'${seconds}"${milliseconds}`;
  };

  // 表示用のフォーマット
  const { hours, minutes, seconds, milliseconds } = formatTime(elapsedTime);

  // 状態用（「as const」でreadonlyにする）
  const statusConfig = {
    idle: {
      label: "待機中",
      dot: "bg-slate-400/90",
    },
    running: {
      label: "計測中",
      dot: "bg-emerald-400/90",
    },
    stopped: {
      label: "一時停止中",
      dot: "bg-amber-400/90",
    },
  } as const;

  const { label, dot } = statusConfig[status];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Header label={label} dot={dot} />

        <main className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <section className="lg:col-span-5 flex justify-center">
            <div className="rounded-2xl border border-white/10 bg-white/7 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_80px_-40px_rgba(0,0,0,0.8)]">

              <div className="mt-5 rounded-2xl bg-linear-to-b from-white/10 to-white/5 p-5 ring-1 ring-white/10">
              <LapLatest
              laps={laps} formatTimeText={formatTimeText}
              />
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
          </section>

          <section className="lg:col-span-7">

            <div className="max-h-88 overflow-auto border-t border-white/10">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10 bg-slate-950/70">
                  <tr className="text-slate-300">
                    <th className="px-6 py-3 text-left font-medium">Lap</th>
                    <th className="px-6 py-3 text-right font-medium">
                      Lap Time
                    </th>
                    <th className="px-6 py-3 text-right font-medium">Total</th>
                  </tr>
                </thead>
                <LapTable laps={laps} formatTimeText={formatTimeText} />
              </table>
            </div>
          </section>
        </main>

      </div>
    </div>
  );
}
