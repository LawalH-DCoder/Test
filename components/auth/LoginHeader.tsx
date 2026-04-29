'use client';

const LoginHeader = () => {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="w-12 h-12 bg-[#6366F1] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#6366F1]/20">
        <span
          className="material-symbols-outlined text-white"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          school
        </span>
      </div>
      <h2 className="text-2xl text-[#191c1e] text-center font-bold">Welcome back</h2>
      <p className="text-sm text-[#45464d] text-center mt-1">Sign in to your academy account</p>
    </div>
  );
};

export default LoginHeader;
