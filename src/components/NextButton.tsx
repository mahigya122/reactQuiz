import { useQuiz } from "../contexts/quizContext";

function NextButton() {
  const { state, dispatch } = useQuiz();
  const isAnswered = state.selected !== null;
  const isLastQuestion = state.index === state.questions.length - 1;

  if (!isAnswered) return null;

  return (
    <button
      onClick={() => dispatch({ type: "next" })}
      style={{
        padding: "12px 40px",
        borderRadius: "8px",
        fontWeight: "bold",
        fontSize: "16px",
        color: "white",
        border: "none",
        background: "linear-gradient(to right, #06b6d4, #3b82f6)",
        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
        cursor: "pointer",
        transition: "all 0.2s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        const btn = e.currentTarget;
        btn.style.background =
          "linear-gradient(to right, #22d3ee, #60a5fa)";
        btn.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget;
        btn.style.background =
          "linear-gradient(to right, #06b6d4, #3b82f6)";
        btn.style.transform = "scale(1)";
      }}
    >
      {isLastQuestion ? "Finish Quiz 🎉" : "Next →"}
    </button>
  );
}

export default NextButton;