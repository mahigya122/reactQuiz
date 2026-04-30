interface Props {
  message?: string;
}

function Loader({ message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">

      {/* SPINNER */}
      <div className="h-12 w-12 border-4 border-gray-600 border-t-white rounded-full animate-spin mb-4"></div>

      {/* TEXT */}
      <p className="text-gray-400">
        {message || "Loading..."}
      </p>

    </div>
  );
}

export default Loader;