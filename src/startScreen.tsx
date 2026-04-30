import Header from "./header";

interface Props {
  total: number;
  onStart: () => void;
}

function StartScreen({ total, onStart }: Props) {
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

      {/* MAIN CONTENT */}
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
              "linear-gradient(to right, #06b6d4, #60a5fa, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Quiz Master
        </h1>

        {/* DECOR LINE */}
        <div
          style={{
            width: "96px",
            height: "4px",
            background: "linear-gradient(to right, #06b6d4, #a78bfa)",
            borderRadius: "9999px",
            marginBottom: "32px",
          }}
        />

        {/* WELCOME */}
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 600,
            marginBottom: "16px",
            color: "#cbd5e1",
          }}
        >
          Welcome Back!
        </h2>

        {/* DESCRIPTION */}
        <p
          style={{
            fontSize: "18px",
            color: "#94a3b8",
            marginBottom: "32px",
            maxWidth: "520px",
            lineHeight: "1.6",
          }}
        >
          Ready to take the challenge? You will answer{" "}
          <span style={{ color: "#06b6d4", fontWeight: "bold" }}>
            {total} questions
          </span>{" "}
          in just{" "}
          <span style={{ color: "#a78bfa", fontWeight: "bold" }}>
            7 minutes
          </span>
          . Test your React knowledge and track your performance.
        </p>

        {/* STATS */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            marginBottom: "40px",
            alignItems: "center",
          }}
        >
          {/* QUESTIONS */}
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#06b6d4",
                margin: 0,
              }}
            >
              {total}
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "#94a3b8",
                margin: 0,
              }}
            >
              QUESTIONS
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

          {/* TIME */}
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#a78bfa",
                margin: 0,
              }}
            >
              7
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "#94a3b8",
                margin: 0,
              }}
            >
              MINUTES
            </p>
          </div>
        </div>

        {/* START BUTTON */}
        <button
          onClick={onStart}
          style={{
            padding: "16px 42px",
            background: "linear-gradient(to right, #06b6d4, #3b82f6)",
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
            el.style.boxShadow = "0 12px 25px rgba(0,0,0,0.5)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.transform = "scale(1)";
            el.style.boxShadow = "0 10px 20px rgba(0,0,0,0.35)";
          }}
        >
          Start Quiz →
        </button>
      </div>
    </div>
  );
}

export default StartScreen;