interface Props {
  index: number;
  total: number;
}

function Progress({ index, total }: Props) {
  const progressPercent = ((index + 1) / total) * 100;

  return (
    <div className="mb-4">

      {/* TEXT PROGRESS */}
      <div className="flex justify-between text-sm text-gray-300 mb-2">
        <p>
          Question {index + 1} / {total}
        </p>

        <p>{Math.round(progressPercent)}%</p>
      </div>

      {/* PROGRESS BAR BACKGROUND */}
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">

        {/* FILLED BAR */}
        <div
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

    </div>
  );
}

export default Progress;