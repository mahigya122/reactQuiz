import { useQuiz } from "./contexts/quizContext";

function Header() {
  const { state, dispatch } = useQuiz();        //pulling global quiz state from Context and getting dispatch to trigger actions later (like restart, navigation, etc.)
  const total = state.questions.length;                  //Gets total number of quiz questions.
  const showProgress = state.status === "active" && total > 0;       //Progress is shown only if: quiz is running (active) and questions exist (total > 0). This prevents showing progress when there are no questions or when the quiz is not active (e.g., on start screen or finish screen).

  const progressPercentage = showProgress                  //If quiz is active: calculate progress percentage based on current question index and total questions. We use state.index to get the current question index (0-based), divide by total to get a fraction, and multiply by 100 to convert to percentage. We also round it to the nearest whole number for cleaner display. If showProgress is false, we set progressPercentage to 0 since we won't be showing it anyway.
    ? Math.round((state.index / total) * 100)       
    : 0;

  const canReturnToStart = state.status === "active";        //this is a boolean flag: it will be true if the quiz is currently active (which means the user is in the middle of taking the quiz) and false otherwise (e.g., on start screen, finish screen, loading, or error states). We will use this flag to determine whether the title in the header should be clickable to allow users to return to the start screen. If canReturnToStart is true, we will add an onClick handler to the title that dispatches a "goToStartScreen" action when clicked, allowing users to restart the quiz. If canReturnToStart is false, the title will not be clickable and will not have any hover effects.

  return (
    <header
      style={{                             // this is the style for the header element. It is a fixed header that stays at the top of the page, with a dark background and white text. It has a border at the bottom and a slight blur effect to give it a modern look. The opacity is set to 0.95 to make it slightly transparent, allowing some of the background to show through.
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "linear-gradient(to right, #0f172a, #1e293b)",               //Creates a smooth color transition background
        color: "white",
        borderBottom: "1px solid #334155",
        zIndex: 50,
        backdropFilter: "blur(4px)",
        opacity: 0.95,
      }}
    >
      <div
        style={{                        // this is the style for the div container inside the header.
          maxWidth: "1536px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 24px",
          height: "70px",
        }}
      >
        {/* TITLE */}
        <h1
          onClick={() => {
            if (canReturnToStart) {
              dispatch({ type: "goToStartScreen" });
            }
          }}
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            letterSpacing: "0.05em",
            background: "linear-gradient(to right, #06b6d4, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0,
            flex: 1,
            cursor: canReturnToStart ? "pointer" : "default",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => {
            if (canReturnToStart) e.currentTarget.style.opacity = "0.8";
          }}
          onMouseLeave={(e) => {
            if (canReturnToStart) e.currentTarget.style.opacity = "1";
          }}
        >
          Quiz App
        </h1>

        {/* PROGRESS */}
        {showProgress && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "2px",
              flex: 1,
            }}
          >
            {/* Percentage */}
            <p
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                background:
                  "linear-gradient(to right, #06b6d4, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                margin: 0,
                lineHeight: "1.2",
              }}
            >
              {progressPercentage}%
            </p>

            {/* Question counter */}
            <p
              style={{
                fontSize: "11px",
                color: "#94a3b8",
                margin: 0,
                lineHeight: "1.2",
              }}
            >
              Question {state.index + 1} of {total}
            </p>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;