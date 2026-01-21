import { TransactionTable } from "./components/TransactionTable";
import { SummaryCards } from "./components/SummaryCards";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-white text-2xl font-bold mb-6 italic">
          SAFEPAY TERMINAL
        </h1>
        <SummaryCards />
        <TransactionTable />
      </div>
    </div>
  );
}

export default App;
