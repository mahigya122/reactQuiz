import { useEffect } from "react";
import { useQuiz } from "../contexts/quizContext";

function Timer() {
  const { state, dispatch } = useQuiz();
  const { timeLeft, timeOver } = state;

  useEffect(() => {
    if (timeOver) return;

    const interval = setInterval(() => {
      dispatch({
        type: "setTimeLeft",
        payload: (t: number) => {
          if (t <= 1) {
            dispatch({ type: "setTimeOver", payload: true });
            clearInterval(interval);
            return 0;
          }
          return t - 1;
        },
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeOver, dispatch]);

  return (
    <p className="text-gray-300">
      ⏳ {Math.floor(timeLeft / 60)}:
      {(timeLeft % 60).toString().padStart(2, "0")}
    </p>
  );
}

export default Timer;