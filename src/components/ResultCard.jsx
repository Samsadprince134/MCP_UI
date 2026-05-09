const ResultCard = ({ event }) => {

  const data = event.data || {};

  // FRIENDLY STAGE NAMES

  const getReadableStage = (stage) => {

    switch(stage) {

      case "starting":
        return "Pipeline Initialization Started";

      case "input_validated":
        return "Input Validation Completed";

      case "input_error":
        return "Project Path Validation Failed";

      case "generator_failed":
        return "JUnit Test Generation Failed";

      case "junit_generated":
        return "JUnit Test Generation Completed";

      case "junit_validated":
        return "JUnit Validation Completed";

      case "compilation_failed":
        return "Compilation Failed";

      case "completed":
        return "Pipeline Completed";

      default:
        return stage || "Processing Pipeline";
    }
  };

  // STATUS COLORS

  const getStatusColor = () => {

    const stage = data.stage || "";

    // ERROR STATES

    if (
      stage.includes("failed") ||
      stage.includes("error")
    ) {
      return "text-red-400";
    }

    // SUCCESS STATES

    if(stage.includes("validated"))
      return "text-green-400";

    // GENERATED STATES

    if(stage.includes("generated"))
      return "text-blue-400";

    // DEFAULT

    return "text-yellow-400";
  };

  // FRIENDLY STAGE MESSAGES

  const getStageMessage = () => {

    const stage = data.stage || "";

    switch(stage) {

      case "starting":
        return "Pipeline execution has started successfully and the MCP engine is initializing.";

      case "input_validated":
        return "Project path validation completed successfully. MCP pipeline can now proceed to test generation.";

      case "input_error":
        return "The provided project path is invalid or does not exist on the server environment.";

      case "generator_failed":
        return "The MCP engine could not generate JUnit tests because the project structure or path validation failed.";

      case "junit_generated":
        return "JUnit test cases were generated successfully using AI-powered analysis.";

      case "junit_validated":
        return "Generated JUnit test files were validated successfully and passed quality verification checks.";

      case "compilation_failed":
        return "Compilation process failed during pipeline execution. Human review or environment correction may be required.";

      default:
        return "Pipeline stage processed successfully.";
    }
  };

  return (

    <div
      className="
        bg-slate-800
        rounded-2xl
        p-6
        shadow-2xl
        border border-slate-700

        opacity-0
        translate-y-5

        animate-[smoothCardEntry_0.7s_cubic-bezier(0.22,1,0.36,1)_forwards]
      "
    >

      {/* HEADER */}

      <div className="flex justify-between items-start gap-5">

        <div>

          <h2 className={`text-2xl font-bold ${getStatusColor()}`}>
            {getReadableStage(data.stage)}
          </h2>

          <p className="text-slate-400 mt-2 text-sm">
            Event Type: {event.type}
          </p>

        </div>

        <div className="bg-slate-900 px-4 py-2 rounded-lg text-sm text-slate-300 whitespace-nowrap">
          Live Pipeline Update
        </div>

      </div>

      {/* STAGE MESSAGE */}

      <div className={`
        border rounded-xl p-5 mt-6
        transition-all duration-500
        ${
          data.stage?.includes("error") ||
          data.stage?.includes("failed")
            ? "bg-red-950 border-red-500"
            : "bg-slate-900 border-slate-700"
        }
      `}>

        <p className={`
          font-semibold mb-2
          ${
            data.stage?.includes("error") ||
            data.stage?.includes("failed")
              ? "text-red-400"
              : "text-blue-400"
          }
        `}>
          Stage Description
        </p>

        <p className="text-slate-300 leading-7">
          {data.message || getStageMessage()}
        </p>

      </div>

      {/* TIMESTAMP */}

      <div className="mt-5">

        <p className="text-slate-500 text-sm">
          Timestamp: {event.timestamp}
        </p>

      </div>

      {/* METRICS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

        {data.coverage_iterations > 0 && (
          <div className="bg-slate-900 p-5 rounded-xl">

            <p className="text-slate-400">
              Coverage Improvement Iterations
            </p>

            <h3 className="text-white text-2xl font-bold mt-2">
              {data.coverage_iterations}
            </h3>

          </div>
        )}

        {data.test_pass_iterations > 0 && (
          <div className="bg-slate-900 p-5 rounded-xl">

            <p className="text-slate-400">
              Test Pass Optimization Iterations
            </p>

            <h3 className="text-white text-2xl font-bold mt-2">
              {data.test_pass_iterations}
            </h3>

          </div>
        )}

        {data.file_count !== undefined && (
          <div className="bg-slate-900 p-5 rounded-xl">

            <p className="text-slate-400">
              Total Generated Test Files
            </p>

            <h3 className="text-blue-400 text-2xl font-bold mt-2">
              {data.file_count}
            </h3>

          </div>
        )}

        {data.fixed_count !== undefined && (
          <div className="bg-slate-900 p-5 rounded-xl">

            <p className="text-slate-400">
              Automatically Fixed Issues
            </p>

            <h3 className="text-green-400 text-2xl font-bold mt-2">
              {data.fixed_count}
            </h3>

          </div>
        )}

      </div>

      {/* GENERATED FILES */}

      {data.generated_files && (

        <div className="bg-slate-900 p-5 rounded-xl mt-6">

          <p className="text-blue-400 mb-4 text-lg font-semibold">
            Generated Test Files
          </p>

          <div className="space-y-3">

            {data.generated_files.map((file, index) => (
              <div
                key={index}
                className="bg-slate-800 p-3 rounded-lg text-slate-300 text-sm break-all"
              >
                {file}
              </div>
            ))}

          </div>

        </div>
      )}

      {/* VALIDATION RESULTS */}

      {data.validation_results && data.validation_results.length > 0 && (

        <div className="bg-slate-900 p-5 rounded-xl mt-6">

          <p className="text-green-400 mb-4 text-lg font-semibold">
            Validation Results
          </p>

          <div className="space-y-5">

            {data.validation_results.map((item, index) => (

              <div
                key={index}
                className="bg-slate-800 p-5 rounded-xl"
              >

                <p className="text-slate-300 text-sm break-all">
                  {item.test_file}
                </p>

                <p
                  className={`mt-3 font-bold ${
                    item.is_valid
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {item.is_valid
                    ? "Validation Successful"
                    : "Validation Failed"}
                </p>

                {/* SUMMARY */}

                {item.summary && (

                  <div className="mt-4 bg-slate-900 border border-slate-700 p-4 rounded-lg">

                    <p className="text-blue-400 mb-2 font-semibold">
                      AI Validation Summary
                    </p>

                    <p className="text-slate-300 text-sm leading-7">
                      {item.summary}
                    </p>

                  </div>
                )}

                {/* ISSUES */}

                {item.issues?.length > 0 && (

                  <div className="mt-4">

                    <p className="text-red-400 mb-2 font-semibold">
                      Validation Issues
                    </p>

                    {item.issues.map((issue, idx) => (

                      <div
                        key={idx}
                        className="bg-red-950 border border-red-500 text-red-200 p-3 rounded-lg text-sm mb-2"
                      >
                        {issue}
                      </div>

                    ))}

                  </div>
                )}

              </div>
            ))}

          </div>

        </div>
      )}

      {/* PIPELINE FAILED */}

      {event.type === "failed" && (

        <div className="bg-red-950 border border-red-500 rounded-xl p-5 mt-6">

          <h3 className="text-red-400 text-xl font-bold mb-3">
            Pipeline Execution Failed
          </h3>

          <p className="text-red-300 mb-4 leading-7">
            MCP pipeline execution stopped because of an invalid project path or backend processing failure.
          </p>

          <pre className="text-red-200 whitespace-pre-wrap text-sm leading-7">
            {data.error || data.message}
          </pre>

        </div>
      )}

      {/* PIPELINE PAUSED */}

      {event.type === "paused" && (

        <div className="bg-red-950 border border-red-500 rounded-xl p-5 mt-6">

          <h3 className="text-red-400 text-xl font-bold mb-3">
            Pipeline Execution Paused
          </h3>

          <p className="text-red-300 mb-4 leading-7">
            MCP pipeline execution was interrupted because of compilation or environment-related issues.
          </p>

          <pre className="text-red-200 whitespace-pre-wrap text-sm leading-7">
            {data.reason}
          </pre>

        </div>
      )}

    </div>
  );
};

export default ResultCard;