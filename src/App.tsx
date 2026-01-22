import { TransactionTable } from "./components/TransactionTable";
import { SummaryCards } from "./components/SummaryCards";
import { useActivityFeed } from "./hooks/useActivityFeed";

function App() {
  const { transactions, metrics } = useActivityFeed();

  return (
    <div className={STYLES.wrapper}>
      <div className={STYLES.container}>
        <h1 className={STYLES.title}>SAFEPAY TERMINAL</h1>
        <SummaryCards metrics={metrics} />
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
}

const STYLES = {
  wrapper: "min-h-screen bg-slate-950 p-8",
  container: "max-w-6xl mx-auto",
  title: "text-white text-2xl font-bold mb-6 uppercase tracking-tight",
};

export default App;
