interface Props {
  index: number;
  total: number;
  isAnswered: boolean;
}

function Progress({ index, total, isAnswered }: Props) {                       // we can also use HTML <progress> Tag <label for="file">Downloading progress:</label> <progress id="file" value="32" max="100"> 32% </progress> but it will be difficult to style it and make it look good, so we will use a custom div based progress bar


  const progressPercent = ((index + (isAnswered ? 1 : 0)) / total) * 100;

  return (
    <div style={{ width: '100%', marginBottom: '24px' }}>
      <div style={{
        width: '100%',
        height: '8px',
        background: '#334155',
        borderRadius: '9999px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${progressPercent}%`,
          background: 'linear-gradient(to right, #4ade80, #22c55e)',
          boxShadow: '0 0 8px rgba(34,197,94,0.6)',
          transition: 'width 0.3s ease-in-out'
        }} />
      </div>
    </div>
  );
}

export default Progress;