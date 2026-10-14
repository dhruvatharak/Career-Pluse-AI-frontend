/**
 * CareerPulse AI - Student Registration Page
 * Captures name, email, password, Tamil Nadu district, reservation category, and optional phone.
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { TN_DISTRICTS, RESERVATION_CATEGORIES } from '../shared/constants.js';
import { User, Mail, Lock, Phone, MapPin, Award, Sparkles, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';

export const Register = () => {
  const { register: registerAuth } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      district: 'Chennai',
      category: 'BC',
      phone: ''
    }
  });

  const onSubmit = async (data) => {
    const res = await registerAuth(data);
    if (res.success) {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dec7e0]/40 border border-[#dec7e0] text-xs font-bold text-[#361a3b]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Student Registration / மாணவர் பதிவு</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#2d2a32]">
            Create Your Profile
          </h1>
          <p className="text-sm font-medium text-[#6b6475]">
            Select your Tamil Nadu district and category to receive accurate cutoff calculations.
          </p>
        </div>

        {/* Card Form */}
        <Card pastel="white" className="p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Student Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#2d2a32] uppercase tracking-wider">
                Full Name / முழுப் பெயர் *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#a49ca8]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="e.g. Kavitha Raman"
                  {...register('name', {
                    required: 'Full name is required',
                    maxLength: { value: 100, message: 'Max 100 characters' }
                  })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#eee8e2] bg-[#faf7f5]/50 text-sm focus:outline-none focus:border-[#ffcd64] focus:bg-white transition-colors"
                />
              </div>
              {errors.name && (
                <p className="text-xs text-[#78192a] font-semibold">{errors.name.message}</p>
              )}
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#2d2a32] uppercase tracking-wider">
                  Email / மின்னஞ்சல் *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#a49ca8]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    placeholder="student@gmail.com"
                    {...register('email', {
                      required: 'Email address is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Enter a valid email'
                      }
                    })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#eee8e2] bg-[#faf7f5]/50 text-sm focus:outline-none focus:border-[#ffcd64] focus:bg-white transition-colors"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-[#78192a] font-semibold">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#2d2a32] uppercase tracking-wider">
                  Phone / தொலைபேசி எண் (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#a49ca8]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    {...register('phone', {
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: 'Enter a valid 10-digit number'
                      }
                    })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#eee8e2] bg-[#faf7f5]/50 text-sm focus:outline-none focus:border-[#ffcd64] focus:bg-white transition-colors"
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-[#78192a] font-semibold">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Tamil Nadu District & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#2d2a32] uppercase tracking-wider">
                  District / மாவட்டம் *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#a49ca8]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <select
                    {...register('district', { required: 'Please select district' })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#eee8e2] bg-[#faf7f5]/50 text-sm focus:outline-none focus:border-[#ffcd64] focus:bg-white transition-colors"
                  >
                    {TN_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.district && (
                  <p className="text-xs text-[#78192a] font-semibold">{errors.district.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#2d2a32] uppercase tracking-wider">
                  Category / இடஒதுக்கீட்டு பிரிவு *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#a49ca8]">
                    <Award className="w-4 h-4" />
                  </div>
                  <select
                    {...register('category', { required: 'Please select category' })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#eee8e2] bg-[#faf7f5]/50 text-sm focus:outline-none focus:border-[#ffcd64] focus:bg-white transition-colors"
                  >
                    {RESERVATION_CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.category && (
                  <p className="text-xs text-[#78192a] font-semibold">{errors.category.message}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#2d2a32] uppercase tracking-wider">
                Password / கடவுச்சொல் *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#a49ca8]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  placeholder="At least 6 characters"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long'
                    }
                  })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#eee8e2] bg-[#faf7f5]/50 text-sm focus:outline-none focus:border-[#ffcd64] focus:bg-white transition-colors"
                />
              </div>
              {errors.password && (
                <p className="text-xs text-[#78192a] font-semibold">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                className="w-full"
                icon={ArrowRight}
              >
                Complete Registration / கணக்கு தொடங்கவும்
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-[#eee8e2] text-xs text-[#6b6475] flex items-center justify-between">
            <span>Already have an account?</span>
            <Link
              to="/login"
              className="font-bold text-[#2d2a32] underline hover:text-[#eab134]"
            >
              Sign In here / உள்நுழைக →
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
