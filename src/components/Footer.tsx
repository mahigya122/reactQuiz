interface Props {
  timeLeft: number;
}

function Footer({ timeLeft }: Props) {
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
        display: 'flex-end',          // to align content to the right
        justifyContent: 'space-between',
        marginRight: '24px',
        alignItems: 'center',
        padding: '16px 24px',
        fontSize: '14px'
      }}>

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