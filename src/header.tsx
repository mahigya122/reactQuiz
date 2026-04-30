interface Props {
  title?: string;
  onRestart?: () => void;
  index?: number;
  total?: number;
  onTitleClick?: () => void;  // Callback when clicking the title
}

function Header({ title = "Quiz App", index, total, onTitleClick }: Props) {
    {/*//It calculates how far the user is in the quiz (in %)*/}
  const progressPercentage = index !== undefined && total !== undefined    //Prevents errors if props are missing
    ? Math.round((index / total) * 100)         
    : 0;

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
        padding: '12px 24px',
        height: '70px'
      }}>
        {/* TITLE - LEFT */}
        <h1 
          onClick={onTitleClick}  // Go to start screen when clicked
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            letterSpacing: '0.05em',
            background: 'linear-gradient(to right, #06b6d4, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            flex: 1,
            cursor: onTitleClick ? 'pointer' : 'default',  // Show hand cursor if clickable
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => {
            if (onTitleClick) (e.currentTarget as HTMLHeadingElement).style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            if (onTitleClick) (e.currentTarget as HTMLHeadingElement).style.opacity = '1';
          }}
        >
          {title}
        </h1>

        {/* PROGRESS - right */}
        {index !== undefined && total !== undefined && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',     // to place it at the right end of the header
            gap: '2px',
            flex: 1
          }}>
            <p style={{
              fontSize: '22px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
              lineHeight: '1.2'
            }}>
              {progressPercentage}%
            </p>
            <p style={{
              fontSize: '11px',
              color: '#94a3b8',
              margin: 0,
              lineHeight: '1.2'
            }}>
              Question {index + 1} of {total}
            </p>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;