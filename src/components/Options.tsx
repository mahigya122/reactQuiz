import { useQuiz } from "../contexts/quizContext";

function Options() {
  const { state, dispatch } = useQuiz();
  const question = state.questions[state.index];

  if (!question) {
    return null;
  }

  const { options, correctIndex } = question;
  const { selected, timeOver } = state;
  const isAnswered = selected !== null || timeOver;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
      {options.map((option: string, i: number) => {
        const isSelected = selected === i;
        const isCorrect = i === correctIndex;

        return (
          <button
            key={i}
            onClick={() => dispatch({ type: "answer", payload: i })}
            disabled={isAnswered}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid",
              transition: "all 0.2s",
              cursor: isAnswered ? "not-allowed" : "pointer",
              ...(isAnswered
                ? isCorrect
                  ? { background: "rgba(16, 185, 129, 0.2)", borderColor: "#10b981", color: "#86efac" }
                  : isSelected
                  ? { background: "rgba(239, 68, 68, 0.2)", borderColor: "#ef4444", color: "#fca5a5" }
                  : { opacity: 0.6, background: "#334155", borderColor: "#475569", color: "#cbd5e1" }
                : { background: "#1e293b", borderColor: "#475569", color: "#e2e8f0" })
            }}
            onMouseEnter={(e) => {
              if (!isAnswered) {
                (e.currentTarget as HTMLButtonElement).style.background = "#334155";
              }
            }}
            onMouseLeave={(e) => {
              if (!isAnswered) {
                (e.currentTarget as HTMLButtonElement).style.background = "#1e293b";
              }
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;