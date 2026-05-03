import Header from "./header";
import Timer from "./components/Timer";
import Options from "./components/Options";
import NextButton from "./components/NextButton";
import Footer from "./components/Footer";
import Progress from "./components/Progress";
import { useQuiz } from "./contexts/quizContext";

function Question() {
  const { state, dispatch } = useQuiz();                        //useQuiz() → gives you Context (global quiz data), state → full quiz state object, dispatch → function to update state (e.g., to move to next question, select an answer, restart quiz, etc.). We will use state to get the current question, score, and other relevant data to display in this component. We will also use dispatch to trigger actions based on user interactions (e.g., when they click the "Next" button or select an answer).
  const { questions, index, score, timeOver } = state;         //Then you extract only what you need: questions → all quiz questions, index → current question number, score → current score, timeOver → whether timer ended

  const total = questions.length;                           //Just counts how many questions exist
  const question = questions[index];                         //Picks the current question being shown

  if (!question) {
    return null;
  }

  if (timeOver) {                                    //If timer ends → stop quiz UI and show results screen
    const percentage = total === 0 ? 0 : Math.round((score / total) * 100);                //If no questions → prevent divide by zero Otherwise calculate percentage.

    return (
      <div
        style={{                    // this is the style for the main container of the time over screen. It has a dark gradient background, white text, and takes up the full viewport height. It uses flexbox to center its content both vertically and horizontally, and it arranges its children in a column.
          background: "linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)",
          color: "white",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />

        <div
          style={{                 //this is the style for the content container inside the time over screen. It has a fixed width, a dark background with a gradient, rounded corners, padding, and a box shadow to give it a card-like appearance. It uses flexbox to center its content and arrange it in a column. The text is centered and has some spacing between elements.
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <div>
            <h1
              style={{                        //this is the style for the "Time Over" title. It has a large font size, bold weight, and a gradient text color that transitions from red to orange. The background clip and text fill properties are used to create the gradient effect on the text. It also has a margin at the bottom to separate it from the score display below.
                fontSize: "48px",
                marginBottom: "16px",
                fontWeight: "bold",
                background: "linear-gradient(to right, #ff6b6b, #ffa500)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ⏰ Time Over
            </h1>

            <div
              style={{                                 // this is the style for the score display container. It has a dark background with a gradient, rounded corners, padding, and a box shadow to give it a card-like appearance. The text inside is styled to show the final score and percentage of correct answers, with the score having a gradient text color similar to the title.
                background: "linear-gradient(to bottom right, #1e293b, #0f172a)",
                borderRadius: "12px",
                padding: "32px",
                marginBottom: "32px",
                boxShadow: "0 20px 25px rgba(0,0,0,0.3)",
                border: "1px solid #334155",
              }}
            >
              <p style={{ fontSize: "20px", marginBottom: "24px", color: "#cbd5e1" }}>       {/*this is the style for the "Final Score" label above the actual score. It has a medium font size, a margin at the bottom to separate it from the score, and a lighter color to differentiate it from the main score text.*/}
                Final Score
              </p>
              <p
                style={{                  //this is the style for the actual score display. It has a large font size, bold weight, and a gradient text color that transitions from cyan to purple. The background clip and text fill properties are used to create the gradient effect on the text. It also has a margin at the bottom to separate it from the percentage display below.
                  fontSize: "48px",
                  fontWeight: "bold",
                  background: "linear-gradient(to right, #06b6d4, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "8px",
                }}
              >
                {score} / {total}
              </p>
              <p style={{ color: "#94a3b8", marginTop: "16px" }}>           {/*this is the style for the percentage display below the score. It has a smaller font size, a lighter color to differentiate it from the main score text, and a margin at the top to separate it from the score.*/}
                {percentage}% Correct
              </p>
            </div>

            <button
              onClick={() => dispatch({ type: "restart" })}
              style={{                                        // this is the style for the "Try Again" button. It has padding, a gradient background that transitions from cyan to blue, white text, bold weight, rounded corners, and a box shadow to make it stand out. The cursor changes to a pointer on hover, and there is a transform effect that slightly scales the button up when hovered for interactivity.
                padding: "12px 32px",
                background: "linear-gradient(to right, #06b6d4, #3b82f6)",
                color: "white",
                fontWeight: "bold",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                cursor: "pointer",
                transition: "transform 0.2s",
                fontSize: "16px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
            >
              Try Again →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{                                       // this is the style for the main container of the question screen. It has a dark gradient background, white text, and takes up the full viewport height. It uses flexbox to arrange its content in a column and center it horizontally.
        background: "linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <div
        style={{                        // this is the style for the content container inside the question screen. It has padding to create space around the content, a maximum width to prevent it from stretching too wide on large screens, and it uses flexbox to center its content and arrange it in a column. The padding also creates space at the top and bottom to ensure the content is not too close to the edges of the viewport.
          paddingTop: "112px",
          paddingBottom: "112px",
          paddingLeft: "24px",
          paddingRight: "24px",
          maxWidth: "672px",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Progress />

        <div
          style={{                                // this is the style for the question card container. It has a fixed width, a dark background with a gradient, rounded corners, padding, and a box shadow to give it a card-like appearance. It uses flexbox to center its content and arrange it in a column. The text is centered and has some spacing between elements.
            width: "100%",
            background: "linear-gradient(to bottom right, #1e293b, #0f172a)",
            borderRadius: "12px",
            padding: "32px",
            marginTop: "20px",
            boxShadow: "0 20px 25px rgba(0,0,0,0.3)",
            border: "1px solid #334155",
          }}
        >
          <h2
            style={{                                     // this is the style for the question text. It has a large font size, bold weight, and a gradient text color that transitions from green to light green. The background clip and text fill properties are used to create the gradient effect on the text. It also has a margin at the bottom to separate it from the options below, and the text is centered.
              fontSize: "25px",
              fontWeight: "bold",
              marginBottom: "32px",
              textAlign: "center",
              color: "white",
              lineHeight: "1.6",
            }}
          >
            {question.question}
          </h2>

          <Options />

          <div
            style={{                                 // this is the style for the container that holds the next button. It uses flexbox to align the button to the right side of the card, and it has a margin at the top to create space between the options and the button.
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <div>
              <p style={{ fontSize: "12px", color: "#94a3b8" }}>Score</p>                 {/*this is the style for the percentage display below the score. It has a smaller font size, a lighter color to differentiate it from the main score text, and a margin at the top to separate it from the score.*/}
              <p style={{ fontSize: "22px", color: "#06b6d4", fontWeight: "bold" }}>        {/*this is the style for the score text. It has a larger font size, a blue color, and bold weight to make it stand out.*/}
                {score} / {total}
              </p>
            </div>

            <NextButton />
          </div>
        </div>
      </div>

      <Footer />

      <div style={{ display: "none" }}>               {/*this is the timer container, which is hidden by default */}
        <Timer />
      </div>
    </div>
  );
}

export default Question;