const ResultCard = ({ result, version }) => {

  return (

    <div className="bg-slate-800 rounded-2xl p-6 mt-8 shadow-2xl border border-slate-700">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-white">
          Analysis Report
        </h2>

        <span className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
          Version {version}
        </span>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="bg-slate-900 p-5 rounded-xl">
          <p className="text-slate-400">Status</p>

          <h3 className="text-green-400 text-2xl font-bold mt-2">
            {result.status}
          </h3>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl">
          <p className="text-slate-400">Coverage</p>

          <h3 className="text-white text-2xl font-bold mt-2">
            {result.coverage}%
          </h3>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl">
          <p className="text-slate-400">Tests Passed</p>

          <h3 className="text-white text-2xl font-bold mt-2">
            {result.testsPassed}
          </h3>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl">
          <p className="text-slate-400">Compliance</p>

          <h3 className="text-blue-400 text-2xl font-bold mt-2">
            {result.compliance}
          </h3>
        </div>

      </div>

      <div className="bg-slate-900 p-5 rounded-xl mt-6">

        <p className="text-slate-400 mb-3 text-lg">
          AI Summary
        </p>

        <p className="text-slate-200 leading-7">
          {result.summary}
        </p>

      </div>

      <div className="bg-slate-900 p-5 rounded-xl mt-6">

        <p className="text-slate-400 mb-3 text-lg">
          Execution Logs
        </p>

        <div className="space-y-2">

          {result.logs?.map((log, index) => (
            <div
              key={index}
              className="bg-slate-800 p-3 rounded-lg text-slate-300 text-sm"
            >
              • {log}
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default ResultCard;