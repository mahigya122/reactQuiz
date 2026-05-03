import Header from "../header";
import { useQuiz } from "../contexts/quizContext";

function FinishScreen() {
  const {
    state: { score, questions, timeOver },                   //score → user score, questions → total questions list, timeOver → whether timer ended
    dispatch,
  } = useQuiz();               //Gives you access to the global context: state → all quiz data, dispatch → functions to change state

  const total = questions.length;
  const percentage = total === 0 ? 0 : (score / total) * 100;

  const title = timeOver ? "Time Ended ⏰" : "Quiz Completed 🎯";

  const getMessage = () => {
    if (percentage === 100) return "🔥 Perfect Score!";
    if (percentage >= 70) return "🎉 Great Job!";
    if (percentage >= 40) return "👍 Not Bad!";
    return "📚 Keep Practicing!";
  };

  return (
    <div
      style={{                                  // this is the style for the main container of the finish screen. It sets a dark gradient background, white text color, minimum height to fill the viewport, and uses flexbox to center its content both vertically and horizontally. The flexDirection is set to column to stack the header and content vertically.
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
        style={{                                     // this is the style for the center content of the finish screen. It allows the content to grow and fill the available space, centers its items, and adds padding around it. The text is also centered for better presentation.
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
          style={{                             // this is the style for the title of the finish screen. It has a large font size, bold weight, and a gradient color that transitions from orange to red to purple. The WebkitBackgroundClip and WebkitTextFillColor properties are used to create a gradient text effect. The marginBottom adds spacing below the title.
            fontSize: "48px",
            fontWeight: "bold",
            marginBottom: "12px",
            background:
              "linear-gradient(to right, #f97316, #ef4444, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {title}
        </h1>

        {/* SCORE CARD */}
        <div
          style={{                                 // this is the style for the score card that displays the user's score and percentage. It has a margin at the top to separate it from the title, padding for spacing inside the card, a semi-transparent background with a border and box shadow for a modern look, and rounded corners. The content inside is centered and stacked vertically.
            marginTop: "20px",
            padding: "28px 48px",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
          }}
        >
          <p style={{ fontSize: "32px", fontWeight: "bold", margin: 0 }}>                       {/* this is the style for the score text in the score card. It has a large font size, bold weight, and no margin to remove default spacing. It displays the user's score out of the total number of questions. */}
            {score} / {total}
          </p>

          <p style={{ color: "#94a3b8", marginTop: "8px" }}>                  {/* this is the style for the percentage text in the score card. It has a lighter gray color to differentiate it from the score, and a margin at the top to separate it from the score text. It displays the user's percentage of correct answers. */}
            {Math.round(percentage)}% Correct
          </p>
        </div>

        {/* MESSAGE */}
        <p
          style={{                                    // this is the style for the message that gives feedback based on the user's performance. It has a margin at the top to separate it from the score card, a larger font size for emphasis, and a medium font weight. The color is set to a green shade to indicate positivity.
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
          style={{                                  // this is the style for the stats section that shows the number of correct and wrong answers. It uses flexbox to align its items in the center and has a gap between them. The margin at the top separates it from the message above.
            display: "flex",
            gap: "40px",
            marginTop: "32px",
            alignItems: "center",
          }}
        >
          {/* CORRECT */}
          <div style={{ textAlign: "center" }}>            
            <p
              style={{                                    // this is the style for the correct answers number in the stats section. It has a large font size, bold weight, and a green color to indicate correctness. The margin is set to 0 to remove any default spacing around the text.}}
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