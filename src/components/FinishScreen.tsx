interface Props {
  score: number;
  total: number;
  onRestart: () => void;
}

function FinishScreen({ score, total, onRestart }: Props) {
  const percentage = (score / total) * 100;

  let message = "";

  if (percentage === 100) {
    message = "🔥 Perfect Score!";
  } else if (percentage >= 70) {
    message = "🎉 Great Job!";
  } else if (percentage >= 40) {
    message = "👍 Not Bad!";
  } else {
    message = "📚 Keep Practicing!";
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-4">
        Quiz Finished
      </h1>

      {/* SCORE */}
      <p className="text-xl mb-2">
        Score: {score} / {total}
      </p>

      {/* PERCENTAGE */}
      <p className="text-gray-400 mb-4">
        {Math.round(percentage)}% Correct
      </p>

      {/* MESSAGE */}
      <p className="text-green-400 mb-6 text-lg">
        {message}
      </p>

      {/* RESTART BUTTON */}
      <button
        onClick={onRestart}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded"
      >
        Restart Quiz
      </button>

    </div>
  );
}

export default FinishScreen;