'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import InputField from '@/components/shared/InputField';
import CustomButton from '@/components/shared/CustomButton';
import { FormFieldType } from '@/types';
import { useAuth, authenticate } from '@/hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const {
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const user = await authenticate(data.email, data.password);
      if (!user) {
        form.setError('root', { message: 'Invalid email or password' });
        return;
      }
      login(user);
      const url = user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
      router.push(url);
    } catch (caught) {
      form.setError('root', {
        message:
          caught instanceof Error ? caught.message : 'Unable to authenticate. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="login-form">
      {/* Email Input */}
      <div className="space-y-2">
        <InputField
          control={form.control}
          name="email"
          label="Email address"
          fieldType={FormFieldType.EMAIL}
          placeholder="name@example.com"
          testId="login-email-input"
          inputClassName="w-full px-4 py-3 bg-[#eceef0] border-0 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:bg-white transition-all outline-none text-[#191c1e] placeholder:text-[#c6c6cd] text-base"
        />
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <InputField
          control={form.control}
          name="password"
          label="Password"
          fieldType={FormFieldType.PASSWORD}
          placeholder="••••••••"
          testId="login-password-input"
          inputClassName="w-full px-4 py-3 bg-[#eceef0] border-0 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:bg-white transition-all outline-none text-[#191c1e] placeholder:text-[#c6c6cd] text-base"
        />
      </div>

      {/* Root error */}
      {errors.root && (
        <div
          className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3"
          data-testid="login-error"
        >
          <span className="text-red-400">⚠</span>
          <p className="text-xs font-semibold text-red-600">{errors.root.message}</p>
        </div>
      )}

      {/* Sign In Button */}
      <CustomButton
        title={isSubmitting ? 'Signing in...' : 'Sign In'}
        type="submit"
        isLoading={isSubmitting}
        testId="login-submit-button"
        className="w-full py-4 bg-[#6366F1] text-white font-bold text-base rounded-xl hover:bg-[#4f46e5] active:scale-[0.99] transition-all shadow-md shadow-[#6366F1]/20 mt-2"
      />

      {/* Forgot Password Link */}
      <div className="mt-6 text-center">
        <a
          href="mailto:instructor@academy.com"
          className="text-sm text-[#45464d] hover:text-[#6366F1] transition-colors"
          data-testid="forgot-password-link"
        >
          Forgot your password?{' '}
          <span className="font-semibold text-[#6366F1]">Contact your instructor</span>
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
