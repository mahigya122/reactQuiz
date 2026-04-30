import Header from "./header";
import Timer from "./components/Timer";
import Options from "./components/Options";
import NextButton from "./components/NextButton";
import Footer from "./components/Footer";
import Progress from "./components/Progress";

interface Props {
  question: any;
  index: number;
  total: number;

  selected: number | null;

  onAnswer: (i: number) => void;
  onNext: () => void;

  score: number;

  setIndex: (i: number) => void;
  setSelected: (v: number | null) => void;
  setScore: (v: number) => void;

  timeLeft: number;
  setTimeLeft: (t: number | ((prev: number) => number)) => void;
  timeOver: boolean;
  setTimeOver: (v: boolean) => void;
}

function Question({
  question,
  index,
  total,
  selected,
  onAnswer,
  onNext,
  score,
  setIndex,
  setSelected,
  setScore,
  timeLeft,
  setTimeLeft,
  timeOver,
  setTimeOver,
}: Props) {
  const correct = question.correctIndex;
  const isAnswered = selected !== null;

  // RESTART quiz
  const restartQuiz = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setTimeLeft(420);
    setTimeOver(false);
  };

  // TIME OVER 
  if (timeOver) {
    const percentage = ((score / total) * 100).toFixed(0);
    return (
      <div style={{
        background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <Header onRestart={restartQuiz} />

        <div style={{textAlign: 'center'}}>
          <h1 style={{
            fontSize: '48px',
            marginBottom: '16px',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #ff6b6b, #ffa500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>⏰ Time Over</h1>

          <div style={{
            background: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
            borderRadius: '12px',
            padding: '32px',
            marginBottom: '32px',
            boxShadow: '0 20px 25px rgba(0,0,0,0.3)',
            border: '1px solid #334155'
          }}>
            <p style={{fontSize: '20px', marginBottom: '24px', color: '#cbd5e1'}}>Final Score</p>
            <p style={{
              fontSize: '48px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #06b6d4, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '8px'
            }}>
              {score} / {total}
            </p>
            <p style={{color: '#94a3b8', marginTop: '16px'}}>
              {percentage}% Correct
            </p>
          </div>

          <button
            onClick={restartQuiz}
            style={{
              padding: '12px 32px',
              background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
              color: 'white',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              fontSize: '16px'
            }}
            // onMouseEnter → scale(1.05), onMouseLeave → scale(1) = This makes button “pop”
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'scale(1)';
            }}
          >
            Try Again →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>

      {/* HEADER */}
      <Header onRestart={restartQuiz} />

      {/* MAIN CONTENT */}
      <div style={{
        paddingTop: '112px',
        paddingBottom: '112px',
        paddingLeft: '24px',
        paddingRight: '24px',
        maxWidth: '672px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>

        {/* PROGRESS */}
        <Progress index={index} total={total} />

        {/* QUESTION CONTAINER */}
        <div style={{
          width: '100%',
          background: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
          borderRadius: '12px',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: '0 20px 25px rgba(0,0,0,0.3)',
          border: '1px solid #334155'
        }}>
          {/* QUESTION TEXT */}
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '32px',
            textAlign: 'center',
            color: 'white',
            lineHeight: '1.6'
          }}>
            {question.question}
          </h2>

          {/* OPTIONS */}
          <Options
            options={question.options}
            correctIndex={correct}
            selected={selected}
            onAnswer={onAnswer}
          />

        {/* CORRECT ANSWER MESSAGE */}
        {isAnswered && (
        selected === correct ? (
        <p style={{ textShadow: "0 0 10px rgba(34, 197, 94, 0.5)" }}>
         ✔ Correct! Well done 🎉
        </p>
        ) : (
        <p style={{ textShadow: "0 0 10px rgba(225, 215, 0, 0.5)" }}>
         ✗ Wrong! Correct answer:{" "}
        <strong>{question.options[correct]}</strong>
        </p>
     )
)}
        </div>

        {/* NEXT BUTTON */}
        <NextButton
          isAnswered={isAnswered}
          isLastQuestion={index === total - 1}
          onNext={onNext}
        />
      </div>

      {/* FOOTER */}
      <Footer
        score={score}
        timeLeft={timeLeft}
        total={total}
        index={index}
      />

      {/* TIMER (hidden logic component - only one timer running) */}
      <div style={{display: 'none'}}>
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