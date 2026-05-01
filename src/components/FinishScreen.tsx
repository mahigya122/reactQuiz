import Header from "../header";
import { useQuiz } from "../contexts/quizContext";

function FinishScreen() {
  const {
    state: { score, questions },
    dispatch,
  } = useQuiz();

  const total = questions.length;
  const percentage = total === 0 ? 0 : (score / total) * 100;

  const getMessage = () => {
    if (percentage === 100) return "🔥 Perfect Score!";
    if (percentage >= 70) return "🎉 Great Job!";
    if (percentage >= 40) return "👍 Not Bad!";
    return "📚 Keep Practicing!";
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <Header />

      {/* CENTER CONTENT */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "20px",
          textAlign: "center",
        }}
      >
        {/* TITLE */}
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            marginBottom: "12px",
            background:
              "linear-gradient(to right, #f97316, #ef4444, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Quiz Completed 🎯
        </h1>

        {/* SCORE CARD */}
        <div
          style={{
            marginTop: "20px",
            padding: "28px 48px",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
          }}
        >
          <p style={{ fontSize: "32px", fontWeight: "bold", margin: 0 }}>
            {score} / {total}
          </p>

          <p style={{ color: "#94a3b8", marginTop: "8px" }}>
            {Math.round(percentage)}% Correct
          </p>
        </div>

        {/* MESSAGE */}
        <p
          style={{
            marginTop: "24px",
            fontSize: "20px",
            fontWeight: 500,
            color: "#34d399",
          }}
        >
          {getMessage()}
        </p>

        {/* STATS */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            marginTop: "32px",
            alignItems: "center",
          }}
        >
          {/* CORRECT */}
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                color: "#06b6d4",
                margin: 0,
              }}
            >
              {score}
            </p>
            <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
              CORRECT
            </p>
          </div>

          {/* DIVIDER */}
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "#475569",
            }}
          />

          {/* WRONG */}
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                color: "#ef4444",
                margin: 0,
              }}
            >
              {total - score}
            </p>
            <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
              WRONG
            </p>
          </div>
        </div>

        {/* RESTART BUTTON */}
        <button
          onClick={() => dispatch({ type: "restart" })}
          style={{
            marginTop: "40px",
            padding: "16px 42px",
            background: "linear-gradient(to right, #ef4444, #f97316)",
            color: "white",
            fontWeight: "bold",
            fontSize: "18px",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.35)",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.transform = "scale(1.05)";
            el.style.boxShadow = "0 15px 30px rgba(0,0,0,0.5)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.transform = "scale(1)";
            el.style.boxShadow = "0 10px 20px rgba(0,0,0,0.35)";
          }}
        >
          Restart Quiz ↻
        </button>
      </div>
    </div>
  );
}

export default FinishScreen;