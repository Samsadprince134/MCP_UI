import { useState, useEffect, useRef } from "react";
import axios from "axios";

import Loader from "./Loader";
import ResultCard from "./ResultCard";
import Notification from "./Notification";

const AnalysisForm = () => {
  const [projectPath, setProjectPath] = useState("");

  const [loading, setLoading] = useState(false);

  const [events, setEvents] = useState([]);

  const [runId, setRunId] = useState("");

  const [notification, setNotification] = useState("");

  const [notificationType, setNotificationType] = useState("");

  // AUTO SCROLL REF

  const bottomRef = useRef(null);

  // PROFESSIONAL SMOOTH AUTO SCROLL

  useEffect(() => {
    const smoothScrollToBottom = () => {
      const startPosition = window.scrollY;

      const targetPosition =
        document.documentElement.scrollHeight - window.innerHeight;

      const distance = targetPosition - startPosition;

      const duration = 1200;

      let startTime = null;

      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animation = (currentTime) => {
        if (!startTime) startTime = currentTime;

        const timeElapsed = currentTime - startTime;

        const progress = Math.min(timeElapsed / duration, 1);

        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    smoothScrollToBottom();
  }, [events, loading]);

  // START PIPELINE

  const startPipeline = async () => {
    // EMPTY INPUT VALIDATION

    if (!projectPath.trim()) {
      setNotificationType("error");

      setNotification("Project path or Bitbucket repository URL is required.");

      setTimeout(() => {
        setNotification("");
      }, 5000);

      return;
    }

    try {
      setLoading(true);

      setEvents([]);

      setRunId("");

      const response = await axios.post(
        "http://13.127.9.92:8000/api/pipeline/run",
        {
          project_path: projectPath,
        },
      );

      // INVALID RESPONSE CHECK

      if (!response.data?.stream_url) {
        setLoading(false);

        setNotificationType("error");

        setNotification("Invalid response received from MCP backend.");

        setTimeout(() => {
          setNotification("");
        }, 5000);

        return;
      }

      setRunId(response.data.run_id);

      setNotificationType("info");

      setNotification("Pipeline execution started successfully.");

      setTimeout(() => {
        setNotification("");
      }, 4000);

      const streamUrl = `http://13.127.9.92:8000${response.data.stream_url}`;

      connectToStream(streamUrl);
    } catch (error) {
      console.log(error);

      setLoading(false);

      setNotificationType("error");

      setNotification(
        "Unable to start MCP pipeline. Please check the backend server.",
      );

      setTimeout(() => {
        setNotification("");
      }, 5000);
    }
  };

  // CONNECT TO SSE STREAM

  const connectToStream = (url) => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      if (!event.data) return;

      const parsedData = JSON.parse(event.data);

      console.log(parsedData);

      // INPUT ERROR → STOP EVERYTHING

      if (parsedData.data?.stage === "input_error") {
        setEvents((prev) => [
          ...prev,
          {
            ...parsedData,
            data: {
              ...parsedData.data,
              message:
                "The provided project path or Bitbucket repository URL is invalid or inaccessible.",
            },
          },
        ]);

        setNotificationType("error");

        setNotification(
          "Invalid project path or Bitbucket URL. Pipeline execution stopped.",
        );

        setLoading(false);

        eventSource.close();

        setTimeout(() => {
          setNotification("");
        }, 6000);

        return;
      }

      // ADD NORMAL EVENTS

      setEvents((prev) => [...prev, parsedData]);

      // PIPELINE FAILED

      if (parsedData.type === "failed") {
        setNotificationType("error");

        setNotification(
          parsedData.data?.message ||
            parsedData.data?.error ||
            "Pipeline execution failed.",
        );

        setLoading(false);

        eventSource.close();

        setTimeout(() => {
          setNotification("");
        }, 7000);

        return;
      }

      // PIPELINE PAUSED

      if (parsedData.type === "paused") {
        setNotificationType("error");

        const dynamicMessage =
          parsedData.data?.message ||
          parsedData.data?.reason ||
          "Pipeline execution paused.";

        setNotification(dynamicMessage);

        setLoading(false);

        eventSource.close();

        setTimeout(() => {
          setNotification("");
        }, 7000);

        return;
      }

      // PIPELINE COMPLETED

      if (parsedData.type === "completed") {
        setNotificationType("success");

        setNotification(
          parsedData.data?.message ||
            "Pipeline execution completed successfully.",
        );

        setLoading(false);

        eventSource.close();

        setTimeout(() => {
          setNotification("");
        }, 6000);

        return;
      }
    };

    // STREAM ERROR

    eventSource.onerror = () => {
      setLoading(false);

      eventSource.close();

      setNotificationType("error");

      setNotification("Stream connection lost or pipeline interrupted.");

      setTimeout(() => {
        setNotification("");
      }, 6000);
    };
  };

  return (
    <div className="max-w-7xl mx-auto mt-10">
      {/* NOTIFICATION */}

      {notification && (
        <Notification message={notification} type={notificationType} />
      )}

      {/* INPUT SECTION */}

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-8">
          Start Pipeline
        </h2>

        <div>
          <label className="text-slate-300 block mb-4 text-lg font-medium">
            Project Path or Bitbucket Repository URL
          </label>

          <div className="flex flex-col md:flex-row gap-4">
            {/* INPUT */}

            <input
              type="text"
              placeholder="/home/ubuntu/ApiDemo or https://bitbucket.org/company/project.git"
              value={projectPath}
              onChange={(e) => setProjectPath(e.target.value)}
              className="
  flex-1
  bg-slate-900
  border border-slate-600
  rounded-xl
  px-5 py-4
  text-white
  placeholder:text-slate-700
  outline-none
  focus:border-blue-500
  transition-all duration-300
  text-lg
"
            />

            {/* BUTTON */}

            <button
              disabled={loading}
              onClick={startPipeline}
              className="
                bg-blue-600
                hover:bg-blue-700
                disabled:opacity-50
                transition-all duration-300
                text-white
                px-8 py-4
                rounded-xl
                font-bold
                text-lg
                min-w-[240px]
                shadow-lg
              "
            >
              {loading ? "Pipeline Running..." : "Run Pipeline"}
            </button>
          </div>

          {/* HELPER SECTION */}

          {/* <div className="mt-4 bg-slate-900 border border-slate-700 rounded-xl p-4">

            <p className="text-slate-400 text-sm leading-7">

              Supported Inputs:

              <span className="text-blue-400">
                {" "}Local Project Path
              </span>

              {" "}or{" "}

              <span className="text-cyan-400">
                Bitbucket Repository URL
              </span>

            </p>

            <div className="mt-3 space-y-2 text-sm">

              <p className="text-slate-500 break-all">
                Example Local Path:
                <span className="text-slate-300">
                  {" "}/home/ubuntu/ApiDemo
                </span>
              </p>

              <p className="text-slate-500 break-all">
                Example Bitbucket URL:
                <span className="text-slate-300">
                  {" "}https://bitbucket.org/company/project.git
                </span>
              </p>

            </div>

          </div> */}
        </div>
      </div>

      {/* RUN ID */}

      {runId && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 mt-6">
          <p className="text-slate-400">Run ID</p>

          <p className="text-white mt-2 break-all">{runId}</p>
        </div>
      )}

      {/* LIVE EVENTS */}

      <div className="space-y-6 mt-8">
        {events.map((event, index) => (
          <ResultCard key={index} event={event} />
        ))}

        {/* LOADER */}

        {loading && (
          <div className="pb-10">
            <Loader />
          </div>
        )}

        {/* AUTO SCROLL TARGET */}

        <div ref={bottomRef}></div>
      </div>
    </div>
  );
};

export default AnalysisForm;
