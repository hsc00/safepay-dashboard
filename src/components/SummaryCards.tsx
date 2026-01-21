import { MOCK_TRANSACTIONS } from "../mocks/transactions";
import { formatCurrency } from "../utils/formatters";
import { THEME_COLORS } from "../constants/theme";

export const SummaryCards = () => {
  const totalBalance = MOCK_TRANSACTIONS.reduce(
    (acc, value) => acc + value.amount,
    0,
  );
  const totalBTC = 1.2456789; // Mocked BTC balance

  return (
    <div className={STYLES.grid}>
      <div className={STYLES.card}>
        <p className={STYLES.label}>Total Balance (CHF)</p>
        <h3 className={`${STYLES.value} ${THEME_COLORS.PROFIT}`}>
          {formatCurrency(totalBalance, "CHF")}
        </h3>
      </div>

      <div className={STYLES.card}>
        <p className={STYLES.label}>Crypto Assets (BTC)</p>
        <h3 className={`${STYLES.value} text-amber-400`}>
          {formatCurrency(totalBTC, "BTC")}
        </h3>
      </div>

      <div className={STYLES.card}>
        <p className={STYLES.label}>Active Transactions</p>
        <h3 className={`${STYLES.value} text-slate-100`}>
          {MOCK_TRANSACTIONS.length}
        </h3>
      </div>
    </div>
  );
};

const STYLES = {
  grid: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",
  card: `p-6 rounded-xl border ${THEME_COLORS.BORDER} ${THEME_COLORS.BG_CARD} shadow-xl border-l-4 border-l-indigo-500 transition-all hover:border-slate-700`,
  label: `text-xs font-bold ${THEME_COLORS.MUTED} uppercase tracking-widest`,
  value: "text-2xl font-mono font-bold mt-2",
};
