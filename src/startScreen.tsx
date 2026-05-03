import Header from "./header";
import { useQuiz } from "./contexts/quizContext";

function StartScreen() {
  const {
    state: { questions },
    dispatch,
  } = useQuiz();           //Get everything from global context instead of props (state contains all quiz data, dispatch allows us to trigger actions to update state). We specifically extract questions from state to display the total number of questions on the start screen. We also get dispatch to be able to start the quiz when the user clicks the "Start Quiz" button.

  const total = questions.length;

  return (
    <div
      style={{                        // this is the style for the main container of the start screen. It has a dark gradient background, white text color, minimum height of the viewport, and uses flexbox to center its content both vertically and horizontally. The flexDirection is set to "column" to stack the child elements vertically.
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
        style={{                         // this is the style for the main content container of the start screen. It has a maximum width to prevent it from stretching too much on large screens, centers itself horizontally with margin auto, and uses flexbox to align its items in the center both vertically and horizontally. The padding adds space around the content, and textAlign center ensures that all text inside this container is centered.
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
          style={{                             // this is the style for the title text on the start screen. It has a large font size, bold weight, and a gradient text color that transitions from cyan to blue to purple. The background clip and text fill properties are used to create the gradient effect on the text. It also has a margin at the bottom to separate it from the description below.
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
          style={{                                       // this is the style for the decorative line below the title. It has a fixed width and height, a gradient background that matches the title colors, rounded edges to make it look like a pill shape, and a margin at the bottom to separate it from the description.
            width: "96px",
            height: "4px",
            background: "linear-gradient(to right, #06b6d4, #a78bfa)",
            borderRadius: "9999px",
            marginBottom: "32px",
          }}
        />

        {/* WELCOME */}
        <h2
          style={{                                           // this is the style for the welcome message on the start screen. It has a medium-large font size, semi-bold weight, a light gray color to differentiate it from the title, and a margin at the bottom to separate it from the description below.
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
          style={{                                               // this is the style for the description text on the start screen. It has a smaller font size than the welcome message, a lighter gray color to make it less prominent, a margin at the bottom to separate it from the stats and start button below, a maximum width to prevent it from stretching too much on large screens, and a line height to improve readability.
            fontSize: "18px",
            color: "#94a3b8",
            marginBottom: "32px",
            maxWidth: "520px",
            lineHeight: "1.6",
          }}
        >
          Ready to take the challenge? You will answer{" "}
          <span style={{ color: "#06b6d4", fontWeight: "bold" }}>           {/*this is the style for the total questions display within the description. It has a blue color and bold weight to make it stand out from the rest of the text.*/}
            {total} questions
          </span>{" "}
          in just{" "}
            <span style={{ color: "#a78bfa", fontWeight: "bold" }}>            {/*this is the style for the time limit display within the description. It has a purple color and bold weight to make it stand out from the rest of the text.*/}
            5 minutes
          </span>
          . Test your React knowledge and track your performance.
        </p>

        {/* STATS */}
        <div
          style={{                                   // this is the style for the stats container on the start screen. It uses flexbox to align its items in the center and has a gap between them. The margin at the bottom separates it from the start button below.
            display: "flex",
            gap: "40px",
            marginBottom: "40px",
            alignItems: "center",
          }}
        >
          {/* QUESTIONS */}
          <div style={{ textAlign: "center" }}>                 {/*this is the style for the questions stat. It centers its text and has a gap between the number and the label.*/}
            <p
              style={{                                         // this is the style for the total questions number in the stats section. It has a large font size, bold weight, and a cyan color to make it stand out. The margin is set to 0 to remove any default spacing around the text.}}
                fontSize: "32px",
                fontWeight: "bold",
                color: "#06b6d4",
                margin: 0,
              }}
            >
              {total}
            </p>
            <p
              style={{                               // this is the style for the "QUESTIONS" label in the stats section. It has a smaller font size than the number, a lighter gray color to differentiate it from the number, and a margin of 0 to remove any default spacing around the text.}}
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
            style={{                               // this is the style for the divider between the stats. It has a fixed width and height, and a background color that matches the overall color scheme of the start screen.}}
              width: "1px",
              height: "40px",
              background: "#475569",
            }}
          />

          {/* TIME */}
          <div style={{ textAlign: "center" }}>
            <p
              style={{                                   // this is the style for the time limit number in the stats section. It has a large font size, bold weight, and a purple color to make it stand out. The margin is set to 0 to remove any default spacing around the text.}}
                fontSize: "32px",
                fontWeight: "bold",
                color: "#a78bfa",
                margin: 0,
              }}
            >
              5
            </p>
            <p
              style={{                               // this is the style for the "MINUTES" label in the stats section. It has a smaller font size than the number, a lighter gray color to differentiate it from the number, and a margin of 0 to remove any default spacing around the text.}}
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
          onClick={() => dispatch({ type: "start" })}
          style={{                                                    // this is the style for the start quiz button on the start screen. It has padding to increase its clickable area, a gradient background that transitions from cyan to blue, white text color, bold font weight, and a larger font size to make it stand out. The border is set to none and it has rounded corners for a modern look. A box shadow adds depth, and the cursor changes to a pointer on hover to indicate it's clickable. The transition property creates a smooth animation effect when the button is hovered over.
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