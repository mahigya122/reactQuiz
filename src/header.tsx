interface Props {
  title?: string;
  onRestart?: () => void;
}

function Header({ title = "Quiz App", onRestart }: Props) {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      background: 'linear-gradient(to right, #0f172a, #1e293b)',
      color: 'white',
      borderBottom: '1px solid #334155',
      zIndex: 50,
      backdropFilter: 'blur(4px)',
      opacity: 0.95
    }}>
      <div style={{
        maxWidth: '1536px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px'
      }}>
        {/* TITLE */}
        <h1 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          letterSpacing: '0.05em',
          background: 'linear-gradient(to right, #06b6d4, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {title}
        </h1>

        {/* RESTART BUTTON */}
        {onRestart && (
          <button
            onClick={onRestart}
            style={{
              fontSize: '14px',
              padding: '8px 16px',
              background: 'linear-gradient(to right, #ef4444, #f97316)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'scale(1)';
            }}
          >
            ↻ Restart
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;