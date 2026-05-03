import StartScreen from "./startScreen";
import Question from "./question";
import FinishScreen from "./components/FinishScreen";
import Error from "./error";
import Loader from "./loader";
import { useQuiz } from "./contexts/quizContext";

function App() {
  const { state, fetchQuestions } = useQuiz();           // We are using the useQuiz hook to access the quiz state and the fetchQuestions function from our QuizContext. The state variable contains all the information about the quiz, such as the current status (loading, error, ready, finished), the questions, the user's answers, etc. The fetchQuestions function allows us to trigger a refetch of questions from the API if needed (e.g., when restarting the quiz). We will use these values to determine what to render in our App component based on the current status of the quiz.

  if (state.status === "loading") {
    return <Loader message="Fetching questions..." />;
  }

  if (state.status === "error") {
    return <Error message="Failed to load questions." onRetry={fetchQuestions} />;
  }

  if (state.status === "ready") {
    return <StartScreen />;
  }

  if (state.status === "finished") {
    return <FinishScreen />;
  }

  return <Question />;              //render Question component if status is "active" (which means the quiz is currently in progress and we should show the current question to the user). This is the default case when none of the above conditions are met, so it will render the Question component when the quiz is active.
}

export default App;