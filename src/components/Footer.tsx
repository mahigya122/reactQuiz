interface Props {
  score: number;
  timeLeft: number;
  total: number;
  index: number;
}

function Footer({ score, timeLeft, total, index }: Props) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  const isLowTime = timeLeft < 60;
  
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      background: 'linear-gradient(to right, #0f172a, #1e293b)',
      color: 'white',
      borderTop: '1px solid #334155',
      backdropFilter: 'blur(4px)',
      opacity: 0.95
    }}>
      <div style={{
        maxWidth: '1536px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '16px 24px',
        fontSize: '14px'
      }}>
        {/* SCORE */}
        <div style={{textAlign: 'center'}}>
          <p style={{color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Score</p>
          <p style={{fontSize: '20px', fontWeight: 'bold', color: '#06b6d4'}}>{score} / {total}</p>
        </div>

        {/* PROGRESS */}
        <div style={{textAlign: 'center'}}>
          <p style={{color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Progress</p>
          <p style={{fontSize: '20px', fontWeight: 'bold', color: '#a78bfa'}}>Q {index + 1} of {total}</p>
        </div>

        {/* TIMER */}
        <div style={{textAlign: 'center'}}>
          <p style={{color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Time</p>
          <p style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: isLowTime ? '#ff6b6b' : '#10b981',
            animation: isLowTime ? 'pulse 1s infinite' : 'none'
          }}>
            ⏳ {minutes}:{seconds}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

export default Footer;