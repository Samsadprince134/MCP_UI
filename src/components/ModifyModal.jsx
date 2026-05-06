const ModifyModal = ({
  showModify,
  setShowModify,
  modifyPrompt,
  setModifyPrompt,
  handleRegenerate,
  regenerating
}) => {

  if (!showModify) return null;

  return (

    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 px-4">

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-2xl shadow-2xl">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-white">
            Modify AI Report
          </h2>

          <button
            onClick={() => !regenerating && setShowModify(false)}
            className="text-slate-400 hover:text-white text-3xl"
          >
            ×
          </button>

        </div>

        <p className="text-slate-400 mb-5">
          Enter modifications or improvements required in the generated report.
        </p>

        <textarea
          rows="6"
          value={modifyPrompt}
          disabled={regenerating}
          onChange={(e) => setModifyPrompt(e.target.value)}
          placeholder="Example: Add more detailed compliance analysis and failed test explanations..."
          className="w-full bg-slate-900 border border-slate-600 rounded-xl p-5 text-white outline-none focus:border-blue-500 resize-none disabled:opacity-50"
        />

        <div className="flex justify-end gap-4 mt-6">

          <button
            disabled={regenerating}
            onClick={() => setShowModify(false)}
            className="bg-slate-700 hover:bg-slate-600 transition-all duration-300 text-white px-5 py-3 rounded-xl disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            disabled={regenerating}
            onClick={handleRegenerate}
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-5 py-3 rounded-xl font-semibold min-w-[220px] flex justify-center items-center gap-3 disabled:opacity-50"
          >

            {regenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                Regenerating...
              </>
            ) : (
              "Regenerate Report"
            )}

          </button>

        </div>

      </div>

    </div>
  );
};

export default ModifyModal;