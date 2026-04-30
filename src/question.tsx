import Header from "./header";
import Timer from "./components/Timer";
import Options from "./components/Options";
import NextButton from "./components/NextButton";
import Footer from "./components/Footer";
import Progress from "./components/Progress";

interface QuestionData {
  question: string;
  options: string[];
  correctIndex: number;
}

interface Props {
  question: QuestionData;
  index: number;
  total: number;
  selected: number | null;
  onAnswer: (i: number) => void;
  onNext: () => void;
  score: number;
  timeLeft: number;
  setTimeLeft: (t: number | ((prev: number) => number)) => void;
  timeOver: boolean;
  setTimeOver: (v: boolean) => void;
  onRestart: () => void;
  onTitleClick: () => void;
}

function Question({
  question,
  index,
  total,
  selected,
  onAnswer,
  onNext,
  score,
  timeLeft,
  setTimeLeft,
  timeOver,
  setTimeOver,
  onRestart,
  onTitleClick,
}: Props) {
  const correct = question.correctIndex;
  const isAnswered = selected !== null;

  if (timeOver) {
    const percentage = total === 0 ? 0 : Math.round((score / total) * 100);

    return (
      <div
        style={{
          background: "linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)",
          color: "white",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header index={index} total={total} onTitleClick={onTitleClick} />

        <div
          style={{
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
              style={{
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
              style={{
                background: "linear-gradient(to bottom right, #1e293b, #0f172a)",
                borderRadius: "12px",
                padding: "32px",
                marginBottom: "32px",
                boxShadow: "0 20px 25px rgba(0,0,0,0.3)",
                border: "1px solid #334155",
              }}
            >
              <p style={{ fontSize: "20px", marginBottom: "24px", color: "#cbd5e1" }}>
                Final Score
              </p>
              <p
                style={{
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
              <p style={{ color: "#94a3b8", marginTop: "16px" }}>
                {percentage}% Correct
              </p>
            </div>

            <button
              onClick={onRestart}
              style={{
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
      style={{
        background: "linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header index={index} total={total} onTitleClick={onTitleClick} />

      <div
        style={{
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
        <Progress index={index} total={total} isAnswered={isAnswered} />

        <div
          style={{
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
            style={{
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

          <Options
            options={question.options}
            correctIndex={correct}
            selected={selected}
            onAnswer={onAnswer}
          />

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <div>
              <p style={{ fontSize: "12px", color: "#94a3b8" }}>Score</p>
              <p style={{ fontSize: "22px", color: "#06b6d4", fontWeight: "bold" }}>
                {score} / {total}
              </p>
            </div>

            <NextButton
              isAnswered={isAnswered}
              isLastQuestion={index === total - 1}
              onNext={onNext}
            />
          </div>
        </div>
      </div>

      <Footer timeLeft={timeLeft} />

      <div style={{ display: "none" }}>
        <Timer
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          timeOver={timeOver}
          setTimeOver={setTimeOver}
        />
      </div>
    </div>
  );
}

export default Question;