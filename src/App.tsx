import { useEffect, useState } from "react";

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

function App() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [status, setStatus] = useState<
    "loading" | "error" | "ready" | "active" | "finished"
  >("loading");

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  // for TIMER STATE
  const [timeLeft, setTimeLeft] = useState(420); // 7 min
  const [timeOver, setTimeOver] = useState(false);

  // FETCH QUESTIONS 
  const fetchQuestions = () => {
    setStatus("loading");

    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        const mappedData = data.questions.map((q: any) => ({
          question: q.question,
          options: q.options,
          correctIndex: q.correctOption
        }));
        setQuestions(mappedData);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // START QUIZ 
  const handleStart = () => {
    setStatus("active");
  };

  // ANSWER QUESTION
  const handleAnswer = (i: number) => {
    if (selected !== null) return;

    setSelected(i);

    if (i === questions[index].correctIndex) {
      setScore((s) => s + 1);
    }
  };

  // NEXT QUESTION
  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      setSelected(null);
    } else {
      setStatus("finished");
    }
  };

  // RESTART QUIZ
  const restartQuiz = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setTimeLeft(420);
    setTimeOver(false);
    setStatus("ready");
  };

  //to render different screens based on status
  if (status === "loading") {
  return <Loader message="Fetching questions..." />;
}

  if (status === "error") {
    return (
      <Error
        message="Failed to load questions."
        onRetry={fetchQuestions}
      />
    );
  }

  if (status === "ready") {
    return (
      <StartScreen
        total={questions.length}
        onStart={handleStart}
      />
    );
  }

  if (status === "finished") {
    return (
      <FinishScreen
        score={score}
        total={questions.length}
        onRestart={restartQuiz}
      />
    );
  }

  // ACTIVE QUIZ 
  return (
    <Question
      question={questions[index]}
      index={index}
      total={questions.length}
      selected={selected}
      onAnswer={handleAnswer}
      onNext={handleNext}
      score={score}
      setIndex={setIndex}
      setSelected={setSelected}
      setScore={setScore}
      timeLeft={timeLeft}
      setTimeLeft={setTimeLeft}
      timeOver={timeOver}
      setTimeOver={setTimeOver}
    />
  );
}

export default App;