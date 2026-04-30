interface Props {
  score: number;
  timeLeft: number;
  total: number;
  index: number;
}

function Footer({ score, timeLeft, total, index }: Props) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white border-t border-gray-700">

      <div className="max-w-4xl mx-auto flex justify-between items-center px-4 py-3 text-sm">

        {/* SCORE */}
        <p>
          Score: <span className="text-green-400">{score}</span>
        </p>

        {/* PROGRESS */}
        <p>
          Q: {index + 1} / {total}
        </p>

        {/* TIMER */}
        <p>
          ⏳ {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </p>

      </div>

    </div>
  );
}

export default Footer;