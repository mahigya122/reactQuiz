import Header from "./header";

interface Props {
  total: number;
  onStart: () => void;
}

function StartScreen({ total, onStart }: Props) {
  return (
    //FULL PAGE BACKGROUND
    <div style={{
      background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
      color: 'white',
      minHeight: '100vh',  //full screen height
      display: 'flex',      // layout system
      flexDirection: 'column'   //stack vertically
    }}>
      {/* HEADER */}
      <Header />

      {/* CONTENT(CENTER AREA) */}
      <div style={{
        flex: 1,                //takes remaining space
        display: 'flex',
        alignItems: 'center',          //horizontal center
        justifyContent: 'center',       //vertical center
        flexDirection: 'column',      //stack content vertically
        padding: '20px',
        textAlign: 'center'           //center text
      }}>
        {/* MAIN HEADING */}
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '8px',
          background: 'linear-gradient(to right, #06b6d4, #60a5fa, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Quiz Master
        </h1>

        {/* DIVIDER LINE*/}
        <div style={{
          width: '96px',
          height: '4px',
          background: 'linear-gradient(to right, #06b6d4, #a78bfa)',
          borderRadius: '9999px',
          marginBottom: '32px'
        }}></div>

        {/* WELCOME TEXT */}
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#cbd5e1'
        }}>
          Welcome Back!
        </h2>

        {/* DESCRIPTION */}
        <p style={{
          fontSize: '18px',
          color: '#94a3b8',
          marginBottom: '32px',
          maxWidth: '512px',
          lineHeight: '1.5'
        }}>
          Ready to take the challenge? You will answer <span style={{color: '#06b6d4', fontWeight: 'bold'}}>{total} questions</span> in just <span style={{color: '#a78bfa', fontWeight: 'bold'}}>7 minutes</span>. Test your knowledge in React and see how you perform!
        </p>

        {/* STATS = for questions and timer */}
        <div style={{
          display: 'flex',
          gap: '32px',
          marginBottom: '40px',
          justifyContent: 'center'
        }}>
          <div style={{textAlign: 'center'}}>
            <p style={{fontSize: '30px', fontWeight: 'bold', color: '#06b6d4'}}>{total}</p>
            <p style={{fontSize: '12px', color: '#94a3b8', marginTop: '4px'}}>QUESTIONS</p>
          </div>
          
          <div style={{width: '1px', background: '#475569'}}></div>     {/*vertical divider between question and time*/}
          
          <div style={{textAlign: 'center'}}>
            <p style={{fontSize: '30px', fontWeight: 'bold', color: '#a78bfa'}}>7</p>
            <p style={{fontSize: '12px', color: '#94a3b8', marginTop: '4px'}}>MINUTES</p>
          </div>
        </div>

        {/* CTA BUTTON */}
        <button
          onClick={onStart}
          style={{
            padding: '16px 40px',
            background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 10px 15px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          //onMouseEnter → scale(1.05) and onMouseLeave → scale(1) This makes button “pop”*
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.transform = 'scale(1)';
          }}
        >
          Start Quiz →
        </button>
      </div>
    </div>
  );
}

export default StartScreen;