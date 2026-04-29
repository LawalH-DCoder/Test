'use client';

interface RoleSwitcherProps {
  role: 'student' | 'admin';
  onChange: (role: 'student' | 'admin') => void;
}

const RoleButton = ({
  roleType,
  currentRole,
  onChange,
}: {
  roleType: 'student' | 'admin';
  currentRole: 'student' | 'admin';
  onChange: (role: 'student' | 'admin') => void;
}) => {
  const isActive = currentRole === roleType;

  return (
    <button
      type="button"
      onClick={() => onChange(roleType)}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
        isActive
          ? 'bg-[#6366F1]/10 border-[#6366F1]/20'
          : 'bg-[#0F172A]/10 border-[#0F172A]/20 hover:bg-[#0F172A]/20'
      }`}
    >
      <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#6366F1]' : 'bg-[#0F172A]'}`} />
      <span
        className={`text-xs font-bold tracking-wide uppercase ${
          isActive ? 'text-[#6366F1]' : 'text-[#0F172A]'
        }`}
      >
        {roleType === 'student' ? 'Student' : 'Admin'}
      </span>
    </button>
  );
};

const RoleSwitcher = ({ role, onChange }: RoleSwitcherProps) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <RoleButton roleType="student" currentRole={role} onChange={onChange} />
      <RoleButton roleType="admin" currentRole={role} onChange={onChange} />
    </div>
  );
};

export default RoleSwitcher;
