/**
 * CareerPulse AI - Student Sign In Page
 * Form for authenticating students with email and password.
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Mail, Lock, LogIn, Sparkles, GraduationCap, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    const res = await login(data);
    if (res.success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        
        {/* Header Badge */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffcd64]/30 border border-[#ffcd64] text-xs font-bold text-[#4d3800]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tamil Nadu Student Pathway Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#2d2a32]">
            Welcome Back!
          </h1>
          <p className="text-sm font-medium text-[#6b6475]">
            Sign in to check your 10th groups, cutoffs, and AI career recommendations.
          </p>
        </div>

        {/* Card Form */}
        <Card pastel="white" className="p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#2d2a32] uppercase tracking-wider">
                Email Address / மின்னஞ்சல்
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#a49ca8]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  placeholder="student@example.com"
                  {...register('email', {
                    required: 'Email address is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#eee8e2] bg-[#faf7f5]/50 text-sm focus:outline-none focus:border-[#ffcd64] focus:bg-white transition-colors"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-[#78192a] font-semibold">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-[#2d2a32] uppercase tracking-wider">
                  Password / கடவுச்சொல்
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#a49ca8]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register('password', {
                    required: 'Password is required'
                  })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#eee8e2] bg-[#faf7f5]/50 text-sm focus:outline-none focus:border-[#ffcd64] focus:bg-white transition-colors"
                />
              </div>
              {errors.password && (
                <p className="text-xs text-[#78192a] font-semibold">{errors.password.message}</p>
              )}
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                className="w-full"
                icon={ArrowRight}
              >
                Sign In to Portal / உள்நுழைக
              </Button>
            </div>
          </form>

          {/* Quick Demo Credentials helper */}
          <div className="mt-6 pt-5 border-t border-[#eee8e2] text-xs text-[#6b6475] flex items-center justify-between">
            <span>New student?</span>
            <Link
              to="/register"
              className="font-bold text-[#2d2a32] underline hover:text-[#eab134]"
            >
              Create free account / பதிவு செய்க →
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
