import Header from "./header";
import Timer from "./components/Timer";
import Options from "./components/Options";
import NextButton from "./components/NextButton";
import Footer from "./components/Footer";
import Progress from "./components/Progress";

interface Props {
  question: any;
  index: number;
  total: number;

  selected: number | null;

  onAnswer: (i: number) => void;
  onNext: () => void;

  score: number;

  setIndex: (i: number) => void;
  setSelected: (v: number | null) => void;
  setScore: (v: number) => void;

  timeLeft: number;
  setTimeLeft: (t: number | ((prev: number) => number)) => void;
  timeOver: boolean;
  setTimeOver: (v: boolean) => void;
}

function Question({
  question,
  index,
  total,
  selected,
  onAnswer,
  onNext,
  score,
  setIndex,
  setSelected,
  setScore,
  timeLeft,
  setTimeLeft,
  timeOver,
  setTimeOver,
}: Props) {
  const correct = question.correctIndex;
  const isAnswered = selected !== null;

  // RESTART quiz
  const restartQuiz = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setTimeLeft(420);
    setTimeOver(false);
  };

  // TIME OVER 
  if (timeOver) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
        <Header onRestart={restartQuiz} />

        <h1 className="text-3xl mb-4 mt-20">⏰ Time Over</h1>

        <p className="mb-4">
          Score: {score} / {total}
        </p>

        <button
          onClick={restartQuiz}
          className="px-6 py-3 bg-red-600 rounded"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">

      {/* HEADER */}
      <Header onRestart={restartQuiz} />

      {/* MAIN CONTENT */}
      <div className="pt-20 pb-24 px-6 max-w-3xl mx-auto">

        {/* PROGRESS */}
        <Progress index={index} total={total} />

        {/* QUESTION */}
        <h2 className="text-xl mb-6">
          {question.question}
        </h2>

        {/* OPTIONS */}
        <Options
          options={question.options}
          correctIndex={correct}
          selected={selected}
          onAnswer={onAnswer}
        />

        {/* CORRECT ANSWER MESSAGE */}
        {isAnswered && selected !== correct && (
          <p className="mt-4 text-green-400">
            Correct Answer: {question.options[correct]}
          </p>
        )}

        {/* NEXT BUTTON */}
        <NextButton
          isAnswered={isAnswered}
          isLastQuestion={index === total - 1}
          onNext={onNext}
        />
      </div>

      {/* FOOTER */}
      <Footer
        score={score}
        timeLeft={timeLeft}
        total={total}
        index={index}
      />

      {/* TIMER (hidden logic component) */}
      <div className="hidden">
        <Timer
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          timeOver={timeOver}
          setTimeOver={setTimeOver}
        />
      </div>
    </div>
  );
}

export default Question;