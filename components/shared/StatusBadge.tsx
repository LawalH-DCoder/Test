import { STATUS_STYLES } from '@/constants';

const StatusBadge = ({ status }: { status: string }) => {
  const cls = STATUS_STYLES[status] ?? 'bg-slate-100 text-slate-600 ring-1 ring-slate-200';
  return (
    <span
      className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-semibold capitalize ${cls}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
