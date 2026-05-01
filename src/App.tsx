import StartScreen from "./startScreen";
import Question from "./question";
import FinishScreen from "./components/FinishScreen";
import Error from "./error";
import Loader from "./loader";
import { useQuiz } from "./contexts/quizContext";

function App() {
  const { state, fetchQuestions } = useQuiz();

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

  return <Question />;
}

export default App;