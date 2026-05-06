import Header from "./components/Header"
import AnalysisForm from "./components/AnalysisForm"

const App = () => {
  return (
    <div className="min-h-screen bg-slate-900 ">

      <Header />

      <div className="px-6 pb-10">
        <AnalysisForm />
      </div>

    </div>
  )
}

export default App