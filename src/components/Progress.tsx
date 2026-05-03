import { useQuiz } from "../contexts/quizContext";

function Progress() {
  const {
    state: { index, questions, selected },
  } = useQuiz();

  const total = questions.length;
  const isAnswered = selected !== null;

  if (total === 0) {
    return null;
  }

  const completedQuestions = index + (isAnswered ? 1 : 0);
  const progressPercent = (completedQuestions / total) * 100;

  return (
    <div style={{ width: "100%", marginBottom: "24px" }}>
      {/* BACKGROUND BAR */}
      <div
        style={{
          width: "100%",
          height: "8px",
          background: "#334155",
          borderRadius: "9999px",
          overflow: "hidden",
        }}
      >
        {/* FILL BAR */}
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            background: "linear-gradient(to right, #4ade80, #22c55e)",
            boxShadow: "0 0 8px rgba(250,250,210,1)",
            transition: "width 0.4s ease-in-out",
          }}
        />
      </div>
    </div>
  );
}

export default Progress;