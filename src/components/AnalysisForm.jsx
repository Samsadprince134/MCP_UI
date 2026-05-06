import { useState } from "react"
import axios from "axios"
import Loader from "./Loader"
import ResultCard from "./ResultCard"

const AnalysisForm = () => {

  const [repoUrl, setRepoUrl] = useState("")
//   const [localPath, setLocalPath] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleAnalyze = async () => {

    try {

      setLoading(true)
      setResult(null)
      console.log("reporl", repoUrl)

      // Replace with actual backend API
      const response = await axios.post(
        "http://localhost:8080/api/mcp/analyze",
        {
          repoUrl,
         // localPath
        }
      )

      setResult(response.data)

    } catch (error) {

      console.log(error)

      // Mock response for demo
      setTimeout(() => {

        setResult({
          status: "SUCCESS",
          coverage: 87,
          testsPassed: 142,
          compliance: "PASSED",
          logs: [
            "Validator completed successfully",
            "Compilation successful",
            "Test execution completed",
            "Jacoco coverage generated",
            "Compliance checks passed",
            "Jenkins trigger successful"
          ]
        })

        setLoading(false)

      }, 2000)

      return
    }

    setLoading(false)
  }

  return (

    <div className="max-w-5xl mx-auto mt-10">

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">

        <h2 className="text-2xl font-semibold text-white mb-8">
          Start MCP Analysis
        </h2>

        <div className="space-y-6">

          <div>
            <label className="text-slate-300 block mb-2">
              Bitbucket Repository URL
            </label>

            <input
              type="text"
              placeholder="https://bitbucket.org/project/repository"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* <div className="text-center text-slate-400">
            OR
          </div>

          <div>
            <label className="text-slate-300 block mb-2">
              Local Project Path
            </label>

            <input
              type="text"
              placeholder="C:/projects/banking-app"
              value={localPath}
              onChange={(e) => setLocalPath(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div> */}

          <button
            onClick={handleAnalyze}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-3 rounded-lg font-semibold text-lg"
          >
            Run MCP Analysis
          </button>

        </div>

      </div>

      {loading && <Loader />}

      {result && <ResultCard result={result} />}

    </div>
  )
}

export default AnalysisForm