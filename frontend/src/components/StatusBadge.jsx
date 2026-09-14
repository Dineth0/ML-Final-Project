/**
 * StatusBadge — displays backend connectivity status.
 * @param {'checking'|'online'|'offline'} status
 */
export default function StatusBadge({ status }) {
  const configs = {
    checking: {
      dot: 'bg-amber-400',
      text: 'text-amber-300',
      label: 'Checking connection…',
      bg: 'bg-amber-400/10 border-amber-400/20',
    },
    online: {
      dot: 'bg-emerald-400',
      text: 'text-emerald-300',
      label: 'Backend Online',
      bg: 'bg-emerald-400/10 border-emerald-400/20',
    },
    offline: {
      dot: 'bg-red-400',
      text: 'text-red-300',
      label: 'Backend Offline',
      bg: 'bg-red-400/10 border-red-400/20',
    },
  }

  const cfg = configs[status] ?? configs.checking

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${cfg.bg} ${cfg.text}`}
      aria-live="polite"
      aria-label={`Backend status: ${cfg.label}`}
    >
      <span
        className={`w-2 h-2 rounded-full ${cfg.dot} pulse-dot`}
        aria-hidden="true"
      />
      {cfg.label}
    </div>
  )
}
