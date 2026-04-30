interface Props {
  isAnswered: boolean;
  isLastQuestion: boolean;
  onNext: () => void;
}

function NextButton({ isAnswered, isLastQuestion, onNext }: Props) {
  if (!isAnswered) return null;

  return (
    <button
      onClick={onNext}
      style={{
        marginTop: '24px',
        width: '100%',
        padding: '12px 24px',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '16px',
        color: 'white',
        border: 'none',
        background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
      onMouseEnter={(e) => {
        (e.target as HTMLButtonElement).style.background = 'linear-gradient(to right, #22d3ee, #60a5fa)';
        (e.target as HTMLButtonElement).style.transform = 'scale(1.02)';
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLButtonElement).style.background = 'linear-gradient(to right, #06b6d4, #3b82f6)';
        (e.target as HTMLButtonElement).style.transform = 'scale(1)';
      }}
    >
      {isLastQuestion ? "Finish Quiz 🎉" : "Next →"}
    </button>
  );
}

export default NextButton;