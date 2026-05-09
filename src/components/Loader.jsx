const Loader = () => {
  return (

    <div className="flex flex-col items-center justify-center py-12">

      {/* BIG SMOOTH SPINNER */}

      <div className="relative w-16 h-16">

        {/* OUTER RING */}

        <div className="
          absolute inset-0
          rounded-full
          border-4 border-slate-700
        "></div>

        {/* ANIMATED RING */}

        <div className="
          absolute inset-0
          rounded-full
          border-4 border-transparent
          border-t-blue-500
          border-r-cyan-400
          animate-spin
        "
        style={{
          animationDuration: "1s"
        }}
        ></div>

      </div>

      {/* LOADING TEXT */}

      <div className="mt-6 text-center">

        <p className="text-blue-400 text-lg font-semibold">
          {/* MCP Pipeline Running */}
        </p>

        <p className="text-slate-400 text-sm mt-2">
          Waiting for response...
        </p>

      </div>

    </div>
  );
};

export default Loader;