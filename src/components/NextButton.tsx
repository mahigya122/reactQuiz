interface Props {
  isAnswered: boolean;
  isLastQuestion: boolean;
  onNext: () => void;
}

function NextButton({ isAnswered, isLastQuestion, onNext }: Props) {
  if (!isAnswered) return null;

  return (
    <button
      onClick={onNext}
      className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
    >
      {isLastQuestion ? "Finish" : "Next"}
    </button>
  );
}

export default NextButton;