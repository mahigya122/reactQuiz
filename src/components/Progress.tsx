interface Props {
  index: number;
  total: number;
  isAnswered: boolean;
}

function Progress({ index, total, isAnswered }: Props) {
  const completedQuestions = index + (isAnswered ? 1 : 0);

  const progressPercent = (completedQuestions / total) * 100;

  return (
    <div style={{ width: "100%", marginBottom: "24px" }}>
      {/* BACKGROUND BAR */}
      <div
        style={{
          width: "100%",
          height: "8px",
          background: "#334155",
          borderRadius: "9999px",
          overflow: "hidden",
        }}
      >
        {/* FILL BAR */}
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            background: "linear-gradient(to right, #4ade80, #22c55e)",
            boxShadow: "0 0 8px rgba(34,197,94,0.6)",
            transition: "width 0.4s ease-in-out",
          }}
        />
      </div>
    </div>
  );
}

export default Progress;