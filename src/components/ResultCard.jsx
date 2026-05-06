const ResultCard = ({ result }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 mt-8 shadow-lg border border-slate-700">
      
      <h2 className="text-2xl font-semibold text-white mb-6">
        Analysis Report
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="bg-slate-900 p-4 rounded-lg">
          <p className="text-slate-400">Status</p>
          <h3 className="text-green-400 text-xl font-bold mt-1">
            {result.status}
          </h3>
        </div>

        <div className="bg-slate-900 p-4 rounded-lg">
          <p className="text-slate-400">Coverage</p>
          <h3 className="text-white text-xl font-bold mt-1">
            {result.coverage}%
          </h3>
        </div>

        <div className="bg-slate-900 p-4 rounded-lg">
          <p className="text-slate-400">Tests Passed</p>
          <h3 className="text-white text-xl font-bold mt-1">
            {result.testsPassed}
          </h3>
        </div>

        <div className="bg-slate-900 p-4 rounded-lg">
          <p className="text-slate-400">Compliance</p>
          <h3 className="text-blue-400 text-xl font-bold mt-1">
            {result.compliance}
          </h3>
        </div>

      </div>

      <div className="bg-slate-900 p-4 rounded-lg mt-6">
        <p className="text-slate-400 mb-2">Logs</p>

        <div className="text-sm text-slate-300 space-y-1">
          {result.logs?.map((log, index) => (
            <p key={index}>• {log}</p>
          ))}
        </div>
      </div>

    </div>
  )
}

export default ResultCard