import { useState } from "react";
import axios from "axios";

import Loader from "./Loader";
import ResultCard from "./ResultCard";
import ModifyModal from "./ModifyModal";

const AnalysisForm = () => {

  const [repoUrl, setRepoUrl] = useState("");
 // const [localPath, setLocalPath] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const [showModify, setShowModify] = useState(false);

  const [modifyPrompt, setModifyPrompt] = useState("");

  const [reportVersion, setReportVersion] = useState(1);

  const [regenerating, setRegenerating] = useState(false);

  // INITIAL MCP ANALYSIS
  const handleAnalyze = async () => {

    try {

      setLoading(true);

      setResult(null);

      const response = await axios.post(
        "http://localhost:8080/api/mcp/analyze",
        {
          repoUrl,
         // localPath
        }
      );

      setResult(response.data);

      setReportVersion(1);

    } catch (error) {

      console.log(error);

      // MOCK RESPONSE FOR DEMO
      setTimeout(() => {

        setResult({
          status: "SUCCESS",
          coverage: 87,
          testsPassed: 142,
          compliance: "PASSED",
          summary:
            "Initial MCP analysis completed successfully. Compilation, validation, test execution, and compliance checks passed.",
          logs: [
            "Validator completed successfully",
            "Compilation successful",
            "Test execution completed",
            "Jacoco coverage generated",
            "Compliance checks passed",
            "Jenkins trigger successful"
          ]
        });

        setReportVersion(1);

        setLoading(false);

      }, 2000);

      return;
    }

    setLoading(false);
  };

  // HUMAN FEEDBACK LOOP
  const handleRegenerate = async () => {

    try {

      setRegenerating(true);

      const response = await axios.post(
        "http://localhost:8080/api/mcp/regenerate-report",
        {
          previousReport: result,
          userPrompt: modifyPrompt
        }
      );

      setResult(response.data);

      setReportVersion((prev) => prev + 1);

      setModifyPrompt("");

      setShowModify(false);

    } catch (error) {

      console.log(error);

      // MOCK UPDATED RESPONSE
      setTimeout(() => {

        setResult({
          status: "SUCCESS",
          coverage: 91,
          testsPassed: 151,
          compliance: "PASSED",
          summary:
            "Enhanced AI-generated report with detailed compliance analysis, failed test explanation, optimization recommendations, and refined validation insights based on user feedback.",
          logs: [
            "User feedback received",
            "Prompt refinement completed",
            "AI report regeneration completed",
            "Coverage optimization analysis added",
            "Enhanced compliance summary generated",
            "Updated report ready"
          ]
        });

        setReportVersion((prev) => prev + 1);

        setModifyPrompt("");

        setShowModify(false);

        setRegenerating(false);

      }, 2500);

      return;
    }

    setRegenerating(false);
  };

  return (

    <div className="max-w-6xl mx-auto mt-10">

      {/* INPUT SECTION */}

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">

        <h2 className="text-3xl font-bold text-white mb-8">
          Start MCP Analysis
        </h2>

        <div className="space-y-6">

          <div>

            <label className="text-slate-300 block mb-3">
              Bitbucket Repository URL
            </label>

            <input
              type="text"
              placeholder="https://bitbucket.org/company/project"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500"
            />

          </div>

          

         

          <button
            onClick={handleAnalyze}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-4 rounded-xl font-bold text-lg"
          >
            Run MCP Analysis
          </button>

        </div>

      </div>

      {/* MAIN LOADER */}

      {loading && <Loader />}

      {/* RESULT SECTION */}

      {result && (
        <>
          <ResultCard
            result={result}
            version={reportVersion}
          />

          <div className="mt-6 flex justify-end">

            <button
              onClick={() => setShowModify(true)}
              className="bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Modify Report
            </button>

          </div>
        </>
      )}

      {/* MODIFY MODAL */}

      <ModifyModal
        showModify={showModify}
        setShowModify={setShowModify}
        modifyPrompt={modifyPrompt}
        setModifyPrompt={setModifyPrompt}
        handleRegenerate={handleRegenerate}
        regenerating={regenerating}
      />

    </div>
  );
};

export default AnalysisForm;