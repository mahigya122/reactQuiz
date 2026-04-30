import { useEffect, useReducer } from "react";

import StartScreen from "./startScreen";
import Question from "./question";
import FinishScreen from "./components/FinishScreen";
import Error from "./error";
import Loader from "./loader";

interface QuestionType {
  question: string;
  options: string[];
  correctIndex: number;
}

// Raw response shape from the API before we normalize it into QuestionType.
interface ApiQuestion {
  question: string;
  options: string[];
  correctOption: number;
}

type QuizStatus = "loading" | "error" | "ready" | "active" | "finished";

interface QuizState {
  questions: QuestionType[];
  status: QuizStatus;
  index: number;
  selected: number | null;
  score: number;
  timeLeft: number;
  timeOver: boolean;
}

type QuizAction =
  | { type: "loading" }
  | { type: "dataLoaded"; payload: QuestionType[] }
  | { type: "dataFailed" }
  | { type: "start" }
  | { type: "answer"; payload: number }
  | { type: "next" }
  | { type: "restart" }
  | { type: "goToStartScreen" }
  | { type: "setTimeLeft"; payload: number | ((prev: number) => number) }
  | { type: "setTimeOver"; payload: boolean };

const initialTimeLeft = 420;

const initialState: QuizState = {
  questions: [],
  status: "loading",
  index: 0,
  selected: null,
  score: 0,
  timeLeft: initialTimeLeft,
  timeOver: false,
};

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        status: "loading",
      };

    case "dataLoaded":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        index: 0,
        selected: null,
        score: 0,
        timeLeft: initialTimeLeft,
        timeOver: false,
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
        index: 0,
        selected: null,
        score: 0,
        timeLeft: initialTimeLeft,
        timeOver: false,
      };

    case "answer": {
      if (state.selected !== null || state.timeOver) return state;

      const isCorrect =
        action.payload === state.questions[state.index].correctIndex;

      return {
        ...state,
        selected: action.payload,
        score: isCorrect ? state.score + 1 : state.score,
      };
    }

    case "next":
      return {
        ...state,
        index:
          state.index < state.questions.length - 1
            ? state.index + 1
            : state.index,
        selected: null,
        status:
          state.index === state.questions.length - 1 ? "finished" : "active",
      };

    case "restart":
      return {
        ...state,
        status: "ready",
        index: 0,
        selected: null,
        score: 0,
        timeLeft: initialTimeLeft,
        timeOver: false,
      };

    case "goToStartScreen":
      return {
        ...state,
        status: "ready",
        selected: null,
      };

    case "setTimeLeft": {
      const nextTimeLeft =
        typeof action.payload === "function"
          ? action.payload(state.timeLeft)
          : action.payload;

      return {
        ...state,
        timeLeft: nextTimeLeft,
        timeOver: nextTimeLeft <= 0 ? true : state.timeOver,
      };
    }

    case "setTimeOver":
      return {
        ...state,
        timeOver: action.payload,
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch, normalize, and store quiz questions in the reducer state.
  const fetchQuestions = () => {
    dispatch({ type: "loading" });

    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        const mappedData = (data.questions as ApiQuestion[]).map((q) => ({
          question: q.question,
          options: q.options,
          correctIndex: q.correctOption,
        }));

        dispatch({ type: "dataLoaded", payload: mappedData });
      })
      .catch(() => dispatch({ type: "dataFailed" }));
  };

  // Load the quiz once when the app starts.
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Small action wrappers keep the JSX clean and centralize dispatch calls.
  const handleStart = () => {
    dispatch({ type: "start" });
  };

  const handleAnswer = (i: number) => {
    dispatch({ type: "answer", payload: i });
  };

  const handleNext = () => {
    dispatch({ type: "next" });
  };

  const restartQuiz = () => {
    dispatch({ type: "restart" });
  };

  const goToStartScreen = () => {
    dispatch({ type: "goToStartScreen" });
  };

  const setTimeLeft = (value: number | ((prev: number) => number)) => {
    dispatch({ type: "setTimeLeft", payload: value });
  };

  const setTimeOver = (value: boolean) => {
    dispatch({ type: "setTimeOver", payload: value });
  };

  if (state.status === "loading") {
    return <Loader message="Fetching questions..." />;
  }

  if (state.status === "error") {
    return <Error message="Failed to load questions." onRetry={fetchQuestions} />;
  }

  if (state.status === "ready") {
    return <StartScreen total={state.questions.length} onStart={handleStart} />;
  }

  if (state.status === "finished") {
    return (
      <FinishScreen
        score={state.score}
        total={state.questions.length}
        onRestart={restartQuiz}
      />
    );
  }

  return (
    <Question
      question={state.questions[state.index]}
      index={state.index}
      total={state.questions.length}
      selected={state.selected}
      onAnswer={handleAnswer}
      onNext={handleNext}
      score={state.score}
      timeLeft={state.timeLeft}
      setTimeLeft={setTimeLeft}
      timeOver={state.timeOver}
      setTimeOver={setTimeOver}
      onRestart={restartQuiz}
      onTitleClick={goToStartScreen}
    />
  );
}

export default App;