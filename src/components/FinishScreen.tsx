import Header from "../header";

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
            marginBottom: "8px",
            background:
              "linear-gradient(to right, #f97316, #ef4444, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Quiz Completed 🎯
        </h1>

        {/* SCORE BOX */}
        <div
          style={{
            marginTop: "20px",
            padding: "20px 40px",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* SCORE */}
          <p style={{ fontSize: "28px", fontWeight: "bold" }}>
            {score} / {total}
          </p>

          {/* PERCENTAGE */}
          <p style={{ color: "#94a3b8", marginTop: "8px" }}>
            {Math.round(percentage)}% Correct
          </p>
        </div>

        {/* MESSAGE */}
        <p
          style={{
            marginTop: "24px",
            fontSize: "20px",
            color: "#34d399",
            fontWeight: "500",
          }}
        >
          {message}
        </p>

        {/* STATS ROW */}
        <div
          style={{
            display: "flex",
            gap: "32px",
            marginTop: "30px",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#06b6d4" }}>
              {score}
            </p>
            <p style={{ fontSize: "12px", color: "#94a3b8" }}>CORRECT</p>
          </div>

          <div style={{ width: "1px", background: "#475569" }}></div>

          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#ef4444" }}>
              {total - score}
            </p>
            <p style={{ fontSize: "12px", color: "#94a3b8" }}>WRONG</p>
          </div>
        </div>

        {/* RESTART BUTTON */}
        <button
          onClick={onRestart}
          style={{
            marginTop: "40px",
            padding: "16px 40px",
            background: "linear-gradient(to right, #ef4444, #f97316)",
            color: "white",
            fontWeight: "bold",
            fontSize: "18px",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0 10px 15px rgba(0,0,0,0.3)",
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          Restart Quiz ↻
        </button>
      </div>
    </div>
  );
}

export default FinishScreen;