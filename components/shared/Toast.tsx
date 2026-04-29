import { toastStyles } from '@/constants';
import { ToastType } from '@/types';

interface ToastProps {
  title: string;
  message?: string;
  type?: ToastType;
  onClose: () => void;
}

const Toast = ({ title, message, type = 'success', onClose }: ToastProps) => {
  const styles = toastStyles[type];

  return (
    <div
      className={`fixed top-20 right-8 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border ${styles.bg}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${styles.iconBg}`}
      >
        <span
          className="material-symbols-outlined text-lg"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {styles.icon}
        </span>
      </div>

      <div>
        <p className="font-bold text-sm">{title}</p>
        {message && <p className="text-xs opacity-90">{message}</p>}
      </div>

      <button onClick={onClose} className="ml-4 opacity-60 hover:opacity-100 transition">
        <span className="material-symbols-outlined text-lg">close</span>
      </button>
    </div>
  );
};

export default Toast;
