import Header from "./header";

interface Props {
  total: number;
  onStart: () => void;
}

function StartScreen({ total, onStart }: Props) {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">

      {/* HEADER */}
      <Header />

      {/* CONTENT */}
      <div className="flex flex-1 items-center justify-center flex-col px-4 text-center">

        <h1 className="text-3xl font-bold mb-4">
          Welcome to the Quiz
        </h1>

        <p className="text-gray-400 mb-6">
          You will answer {total} questions in 7 minutes.
        </p>

        <button
          onClick={onStart}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
        >
          Start Quiz
        </button>

      </div>
    </div>
  );
}

export default StartScreen;