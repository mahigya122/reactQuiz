import { createContext, useCallback, useContext, useEffect, useReducer } from "react";

interface QuestionType {
  question: string;
  options: string[];
  correctIndex: number;
}

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

interface QuizContextValue {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
  fetchQuestions: () => void;
}

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

const QuizContext = createContext<QuizContextValue | null>(null);

function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchQuestions = useCallback(() => {
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
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <QuizContext.Provider value={{ state, dispatch, fetchQuestions }}>
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used inside QuizProvider");
  }
  return context;
}

export { QuizProvider, useQuiz };