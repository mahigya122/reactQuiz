import { createContext, useCallback, useContext, useEffect, useReducer } from "react";

//format for questions in (how i want to render question inside my app) your app
interface QuestionType {
  question: string;
  options: string[];
  correctIndex: number;               // this is different from API's correctOption, so we will map it when we fetch data from API
}

//This is the format coming from API
interface ApiQuestion {
  question: string;
  options: string[];
  correctOption: number;
}

type QuizStatus = "loading" | "error" | "ready" | "active" | "finished";

//defines what data your quiz app stores at any moment i.e. What does my app remember right now?
interface QuizState {
  questions: QuestionType[];           // All quiz questions
  status: QuizStatus;                 // Current quiz status
  index: number;                        //Current question position
  selected: number | null;             //Which option user clicked, null → no answer yet, 2 → user picked option index 2
  score: number;                       // Total correct answers
  timeLeft: number;                    //Countdown timer (in seconds)
  timeOver: boolean;                  // Has the time run out? (true/false)
}

//This is a TypeScript union type that defines all possible actions your reducer can handle. It tells TypeScript:“Only these types of actions are allowed in dispatch()”
type QuizAction =
  | { type: "loading" }                                    //Used when fetching starts
  | { type: "dataLoaded"; payload: QuestionType[] }        // payload carries the loaded questions when fetch is successful
  | { type: "dataFailed" }                                 //Used when fetch fails
  | { type: "start" }                                      //Used to start the quiz
  | { type: "answer"; payload: number }                    //payload is the index of the option user selected, used when user answers a question
  | { type: "next" }                                        // Used to move to the next question
  | { type: "restart" }                                   // Used to restart the quiz
  | { type: "goToStartScreen" }                           // Used to go back to the start screen
  | { type: "setTimeLeft"; payload: number | ((prev: number) => number) }                    //payload can be a number (to set time directly, direct value → 120) or a function (to update time based on previous value, useful for countdown timer i.e. function → (prev) => prev - 1)
  | { type: "setTimeOver"; payload: boolean };                                 //payload is a boolean indicating whether time is over or not, used when timer runs out

  //defines the shape of the context value that will be provided to components consuming this context. It includes the current state of the quiz (question, status, index, selects..etc), a dispatch function to update the state, and a function to fetch questions from the API.
interface QuizContextValue {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;                  //function to update state based on actions defined in QuizAction type (onAnswer, onNext, onRestart...etc)
  fetchQuestions: () => void;                     //This is a function to load questions from API
}

const initialTimeLeft = 300; // 5 minutes in seconds

//starting state for the entire quiz app — basically the default values before anything happens.
const initialState: QuizState = {
  questions: [],
  status: "loading",
  index: 0,
  selected: null,
  score: 0,
  timeLeft: initialTimeLeft,
  timeOver: false,
};

//core of useReducer — this function takes the current state and an action, and returns a new state based on the action type. It defines how the state should change in response to different actions (like loading data, answering a question, moving to the next question, etc.). Each case in the switch statement corresponds to a specific action type and describes how the state should be updated when that action is dispatched.
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
        questions: action.payload,                //when data is successfully loaded, we update the questions in our state with the payload (the loaded questions) and set the status to "ready", which means the quiz is ready to be started.
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
      if (state.selected !== null || state.timeOver) return state;                   //If user already answered → do nothing, if time is over → do nothing

      const isCorrect =
        action.payload === state.questions[state.index].correctIndex;                  // Check if the selected option index (action.payload) matches the correct option index for the current question (state.questions[state.index].correctIndex). This determines whether the user's answer is correct or not.

      return {
        ...state,
        selected: action.payload,                   //Stores which option user picked
        score: isCorrect ? state.score + 1 : state.score,           // If the answer is correct, we increment the score by 1; if it's incorrect, we keep the score unchanged.
      };
    }

    case "next":
      return {
        ...state,                                      //Keep everything else the same, but move to the next question by incrementing the index. We also reset the selected answer to null for the next question. If we are already at the last question, we keep the index unchanged. Finally, we update the status to "finished" if we just moved past the last question, otherwise we keep it "active".
        index:
          state.index < state.questions.length - 1             //If we are not at the last question, move to the next question by incrementing the index. If we are already at the last question, keep the index unchanged (don't go out of bounds). 
            ? state.index + 1
            : state.index,                               // This prevents going out of bounds if we are already at the last question.
        selected: null,                                  //Clears previous answer so next question starts fresh
        status: 
          state.index === state.questions.length - 1 ? "finished" : "active",            // If we just moved past the last question (i.e., we were on the last question and now we are trying to go to the next), we set the status to "finished". Otherwise, we keep it "active" since we are still in the middle of the quiz.
      };

    case "restart":
      return {
        ...state,
        status: "ready",            // Set status to "ready" to show the start screen again
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
        typeof action.payload === "function"                //Handle two types of updates : Is payload a function? or If it's not a function
          ? action.payload(state.timeLeft)           // If payload is a function, we call it with the current timeLeft to get the next timeLeft (useful for countdown timer where we want to decrease time based on previous value).
          : action.payload;                          // If payload is not a function, we assume it's a direct number value and use it as the next timeLeft.

      return {
        ...state,
        timeLeft: nextTimeLeft,                          // Update timeLeft with the calculated nextTimeLeft
        timeOver: nextTimeLeft <= 0 ? true : state.timeOver,          // If the next timeLeft is less than or equal to 0, we set timeOver to true. Otherwise, we keep the existing value of timeOver (which means if time was already over, it stays over; if it wasn't, it remains unchanged). This ensures that when the timer runs out, we mark time as over, but if we are just updating timeLeft without it running out, we don't change the timeOver status.
      };
    }

    case "setTimeOver":
      return {
        ...state,
        timeOver: action.payload,                                    // Update timeOver based on the payload (line 154) (true if time is over, false if not). This action is used when the timer runs out to indicate that time is over.
        status: action.payload ? "finished" : state.status,              // If time is over (payload is true), we set the status to "finished". If time is not over (payload is false), we keep the existing status. This ensures that when the timer runs out, the quiz is marked as finished.
      };

    default:
      return state;
  }
}

//creating a “global storage box” for your quiz app.
const QuizContext = createContext<QuizContextValue | null>(null);                      //This context will either contain QuizContextValue OR be null initially

//this(component=QuizProvider) is a wrapper component that: holds global state (quiz data) and allows all child components to access it i.e what we did in main <QuizProvider> <App /> </QuizProvider> now Now App and everything inside it can access context.
function QuizProvider({ children }: { children: React.ReactNode }) {              //children = everything inside <QuizProvider>...</QuizProvider> so app
  const [state, dispatch] = useReducer(reducer, initialState);                  // useReducer is a React hook that manages complex state logic. It takes a reducer function (which defines how state updates in response to actions) and an initial state, and returns the current state and a dispatch function to send actions to the reducer. In this case, we are using our custom reducer function defined above and the initialState for our quiz app. The state variable will hold the current state of the quiz, and the dispatch function will be used to update the state based on user interactions (like answering questions, moving to next question, etc.) or when fetching data from the API.

  const fetchQuestions = useCallback(() => {            //Create a stable function called fetchQuestions that we can use to load questions from the API. We use useCallback to memoize this function so that it doesn't get recreated on every render, which can help prevent unnecessary re-renders in components that depend on this function.
    dispatch({ type: "loading" });                   // When we start fetching questions, we dispatch a "loading" action to update the state and indicate that we are currently loading data. This can be used to show a loading spinner or message in the UI while the data is being fetched.

    fetch("http://localhost:8000/questions")
      .then((res) => res.json())                        // After we receive the response from the API, we call res.json() to parse the response body as JSON. 
      .then((data) => {                                         // Once we have the parsed data, we need to transform it from the format provided by the API (ApiQuestion) to the format we want to use in our app (QuestionType). 
        const mappedData = (data.questions as ApiQuestion[]).map((q) => ({        // ApiQuestion = “raw data from server” . we are updating it to match our QuestionType (the format we want to use in our app) by mapping over the array of questions and creating a new array where each question is transformed to have the properties we defined in QuestionType. Specifically, we rename correctOption from the API to correctIndex in our app for consistency with our QuestionType definition.
          question: q.question,
          options: q.options,
          correctIndex: q.correctOption,        //rename here to match our QuestionType, so we can use it in our app without worrying about API's naming
        }));

        dispatch({ type: "dataLoaded", payload: mappedData });          //Save questions into global state and update status to "ready" to indicate that the quiz is ready to be started. The payload of this action is the mappedData, which is the array of questions in the format we want to use in our app. This will allow us to access the loaded questions from our state and render them in our components.
      })
      .catch(() => dispatch({ type: "dataFailed" }));                         
  }, []);

  //As soon as QuizProvider mounts, fetch the questions from the backend API.
  useEffect(() => {
    fetchQuestions();               //Why [fetchQuestions]? Because fetchQuestions is wrapped in useCallback, React says: “Only re-run this effect if fetchQuestions changes” But since useCallback([]) makes it stable → it runs only once on mount.
  }, [fetchQuestions]);

//Everything inside app can access quiz state + actions without prop drilling.
  return (
    <QuizContext.Provider value={{ state, dispatch, fetchQuestions }}>             {/*state Contains everything:questions, index, score, selected answer, timer, status...etc. So any component can read quiz data. dispatch: This is your “action sender” Instead of: onClick={() => setScore(score + 1)} you can do onClick={() => dispatch({ type: "answer", payload: selectedOptionIndex })} to update state based on your reducer logic. fetchQuestions: This allows components to trigger a refetch of questions from the API if needed (e.g., when restarting the quiz).*/}
      {children}
    </QuizContext.Provider>
  );
}

//A custom React hook that provides safe access to your QuizContext values.
function useQuiz() {
  const context = useContext(QuizContext);             //useContext is a React hook that allows you to access the current value of a context. In this case, we are trying to access the value of QuizContext, which should contain our quiz state, dispatch function, and fetchQuestions function. However, since QuizContext can be null (as defined in createContext), we need to check if context is null before trying to use it. If context is null, it means that useQuiz is being called outside of a QuizProvider, which would be an error because there would be no context value available. In that case, we throw an error to inform the developer that they need to wrap their component tree with QuizProvider in order to use the useQuiz hook. If context is not null, we return the context value so that components can access the quiz state and actions.
  if (!context) {
    throw new Error("useQuiz must be used inside QuizProvider");
  }
  return context;
}

export { QuizProvider, useQuiz };          //QuizProvider = power source, useQuiz = safe plug socket