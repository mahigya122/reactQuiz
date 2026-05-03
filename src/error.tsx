//This defines what data your component is allowed to receive.
interface Props {
  message?: string;                    //message is a string, ? means it is optional
  onRetry?: () => void;              //onRetry is a function () => void means: takes no arguments returns nothing, ? means optional
}


//here component is error.
function Error({ message, onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      
      {/* ERROR ICON */}
      <h1 className="text-2xl mb-4 text-red-500">
        ❌ Something went wrong
      </h1>

      {/* MESSAGE */}
      <p className="text-gray-400 mb-6 text-center max-w-md">
        {message ?? "Failed to load questions. Please try again."}
      </p>

      {/* RETRY BUTTON */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded transition"
        >
          Retry
        </button>
      )}
    </div>
  );
}

export default Error;