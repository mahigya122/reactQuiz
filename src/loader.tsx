interface Props {                       //this defines what data your component is allowed to receive as props. message is a string ? means optional
  message?: string;         //This component may or may not receive a message, and if it does, it must be a string
}

function Loader({ message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">

      {/* SPINNER */}
      <div className="h-12 w-12 border-4 border-gray-600 border-t-white rounded-full animate-spin mb-4"></div>

      {/* TEXT */}
      <p className="text-gray-400">
        {message ?? "Loading..."}   {/* Nullish Coalescing: it checks if message is null or undefined, if it is then it will show "Loading..." otherwise it will show the message */}
      </p>

    </div>
  );
}

export default Loader;