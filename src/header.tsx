interface Props {
  title?: string;
  onRestart?: () => void;
}

function Header({ title = "Quiz App", onRestart }: Props) {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 text-white border-b border-gray-700 z-50">

      <div className="max-w-4xl mx-auto flex justify-between items-center px-4 py-3">

        {/* TITLE */}
        <h1 className="text-lg font-bold tracking-wide">
          {title}
        </h1>

        {/* RESTART BUTTON (optional) */}
        {onRestart && (
          <button
            onClick={onRestart}
            className="text-sm px-3 py-1 bg-red-600 hover:bg-red-700 rounded"
          >
            Restart
          </button>
        )}

      </div>
    </header>
  );
}

export default Header;