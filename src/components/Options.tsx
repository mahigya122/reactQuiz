interface Props {
  options: string[];
  correctIndex: number;
  selected: number | null;
  onAnswer: (i: number) => void;
}

function Options({ options, correctIndex, selected, onAnswer }: Props) {
  const isAnswered = selected !== null;

  return (
    <div className="space-y-3">
      {options.map((opt, i) => {
        let bg = "bg-gray-800";

        if (isAnswered) {
          if (i === correctIndex) {
            bg = "bg-green-600"; // correct answer
          } else if (i === selected) {
            bg = "bg-red-600"; // wrong selected
          }
        }

        return (
          <button
            key={i}
            onClick={() => onAnswer(i)}
            disabled={isAnswered}
            className={`w-full p-3 rounded transition ${bg}`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export default Options;