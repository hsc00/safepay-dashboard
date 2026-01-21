import { MOCK_TRANSACTIONS } from "../mocks/transactions";
import { STATUS_STYLES, DEFAULT_STATUS_STYLE } from "../constants/statusStyles";
import { formatCurrency, formatDate } from "../utils/formatters";
import {
  getAmountColor,
  getRiskLevel,
  RISK_STYLES,
} from "../utils/riskAssessment";
import { THEME_COLORS } from "../constants/theme";
import {
  TransactionSchema,
  type Transaction,
} from "../schemas/transactionSchema";

export const TransactionTable = () => {
  const validatedTransactions: Transaction[] = MOCK_TRANSACTIONS.map(
    (rawTransaction) => {
      const validation = TransactionSchema.safeParse(rawTransaction);

      if (!validation.success) {
        console.error(
          "Data integrity failure in Zurich node:",
          validation.error,
        );
        return null;
      }

      return validation.data;
    },
  ).filter((transaction): transaction is Transaction => transaction !== null);

  return (
    <div className={STYLES.wrapper}>
      <div className={STYLES.header}>
        <h2 className={STYLES.headerTitle}>Activity Feed</h2>
        <div className={STYLES.nodeBadge}>
          <span className={STYLES.nodeDot}></span>
          <span className={STYLES.nodeText}>Live Node: Zurich</span>
        </div>
      </div>

      <table className={STYLES.table}>
        <thead className={STYLES.thead}>
          <tr>
            <th className={STYLES.th}>Counterparty</th>
            <th className={STYLES.th}>Status</th>
            <th className={`${STYLES.th} text-center`}>Risk Analysis</th>
            <th className={STYLES.th}>Date</th>
            <th className={`${STYLES.th} text-right`}>Amount</th>
          </tr>
        </thead>
        <tbody className={STYLES.tbody}>
          {validatedTransactions.map((transaction) => {
            const riskLevel = getRiskLevel(
              transaction.amount,
              transaction.status,
            );

            return (
              <tr key={transaction.id} className={STYLES.tr}>
                <td className={STYLES.td}>
                  <div className={STYLES.entityName}>
                    {transaction.counterparty}
                  </div>
                  <div className={STYLES.entityDesc}>
                    {transaction.description}
                  </div>
                </td>

                <td className={STYLES.td}>
                  <span
                    className={`${STYLES.badgeBase} ${STATUS_STYLES[transaction.status] || DEFAULT_STATUS_STYLE}`}
                  >
                    {transaction.status}
                  </span>
                </td>

                <td className={STYLES.td}>
                  <div className="flex justify-center">
                    <span
                      className={`${STYLES.badgeBase} ${RISK_STYLES[riskLevel]}`}
                    >
                      {riskLevel}
                    </span>
                  </div>
                </td>

                <td
                  className={`${STYLES.td} ${STYLES.monoText} text-slate-400`}
                >
                  {formatDate(transaction.timestamp)}
                </td>

                <td
                  className={`${STYLES.td} ${STYLES.monoText} text-right font-bold ${getAmountColor(transaction.amount)}`}
                >
                  {formatCurrency(transaction.amount, transaction.currency)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const STYLES = {
  wrapper: `overflow-hidden rounded-xl border ${THEME_COLORS.BORDER} ${THEME_COLORS.BG_CARD} shadow-2xl`,
  header: `px-6 py-4 border-b ${THEME_COLORS.BORDER} flex justify-between items-center bg-slate-950/40`,
  headerTitle: `text-xs font-semibold ${THEME_COLORS.NEUTRAL} uppercase tracking-wider`,
  nodeBadge:
    "flex items-center gap-2 px-2 py-1 bg-emerald-500/5 rounded-md border border-emerald-500/10",
  nodeDot:
    "flex h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]",
  nodeText:
    "text-[10px] text-emerald-500/80 font-medium uppercase tracking-tight",
  table: `w-full text-left text-sm ${THEME_COLORS.NEUTRAL} border-collapse`,
  thead: `bg-slate-950/80 backdrop-blur-md sticky top-0 z-10 uppercase text-[10px] font-bold tracking-widest ${THEME_COLORS.MUTED}`,
  th: `px-6 py-4 border-b ${THEME_COLORS.BORDER}`,
  tbody: "divide-y divide-slate-800",
  tr: "hover:bg-slate-800/40 transition-colors group",
  td: "px-6 py-4",
  entityName:
    "font-bold text-slate-100 group-hover:text-indigo-400 transition-colors",
  entityDesc: `text-xs ${THEME_COLORS.MUTED} font-medium`,
  badgeBase:
    "flex justify-center items-center w-20 py-1 rounded border text-[9px] font-bold uppercase tracking-tight",
  monoText: "text-xs font-mono",
};
