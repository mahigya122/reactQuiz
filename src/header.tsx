interface Props {
  title?: string;
  index?: number;
  total?: number;
  onTitleClick?: () => void;
}

function Header({
  title = "Quiz App",
  index,
  total,
  onTitleClick,
}: Props) {
  // Calculate progress percentage
  const progressPercentage =
    index !== undefined && total !== undefined
      ? Math.round((index / total) * 100)
      : 0;

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "linear-gradient(to right, #0f172a, #1e293b)",
        color: "white",
        borderBottom: "1px solid #334155",
        zIndex: 50,
        backdropFilter: "blur(4px)",
        opacity: 0.95,
      }}
    >
      <div
        style={{
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
          onClick={onTitleClick}
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            letterSpacing: "0.05em",
            background: "linear-gradient(to right, #06b6d4, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0,
            flex: 1,
            cursor: onTitleClick ? "pointer" : "default",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => {
            if (onTitleClick) e.currentTarget.style.opacity = "0.8";
          }}
          onMouseLeave={(e) => {
            if (onTitleClick) e.currentTarget.style.opacity = "1";
          }}
        >
          {title}
        </h1>

        {/* PROGRESS */}
        {index !== undefined && total !== undefined && (
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
              Question {index + 1} of {total}
            </p>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;