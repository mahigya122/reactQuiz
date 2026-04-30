import { useEffect } from "react";

interface Props {
  timeLeft: number;
  setTimeLeft: (t: number | ((prev: number) => number)) => void;
  timeOver: boolean;
  setTimeOver: (v: boolean) => void;
}

function Timer({ timeLeft, setTimeLeft, timeOver, setTimeOver }: Props) {
  useEffect(() => {
    if (timeOver) return;

    const interval = setInterval(() => {
      setTimeLeft((t: number) => {
        if (t <= 1) {
          setTimeOver(true);
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeOver, setTimeLeft, setTimeOver]);

  return (
    <p className="text-gray-300">
      ⏳ {Math.floor(timeLeft / 60)}:
      {(timeLeft % 60).toString().padStart(2, "0")}
    </p>
  );
}

export default Timer;