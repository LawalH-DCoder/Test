import { FEATURES } from '@/constants';

const LoginLeftPanel = () => {
  return (
    <div className="relative flex h-full flex-col justify-between bg-[#0F172A] px-12 py-10 w-full">
      {/* Decorative Grain/Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Top: Brand Identity */}
      <div className="relative z-10">
        <span className="text-sm uppercase tracking-[0.2em] font-extrabold text-white/90">
          ACADEMY
        </span>
      </div>
      {/* Middle: Marketing Content */}
      <div className="relative z-10 max-w-lg">
        <h1 className="text-[48px] leading-tight mb-12 font-extrabold text-white">
          Track attendance.
          <br />
          Stay accountable.
        </h1>
        <div className="space-y-6">
          {FEATURES.map((f) => (
            <div key={f.label} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/5">
                <span className="material-symbols-outlined text-[#6366F1]">{f.icon}</span>
              </div>
              <p className="text-base text-white/80">{f.label}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom: Muted Footer Text */}
      <div className="relative z-10">
        <p className="text-sm text-[#6366F1]/60 font-medium tracking-wide">
          Frontend Engineering · Cohort 3
        </p>
      </div>
    </div>
  );
};

export default LoginLeftPanel;
