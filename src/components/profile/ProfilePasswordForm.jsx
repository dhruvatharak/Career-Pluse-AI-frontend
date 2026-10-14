/**
 * CareerPulse AI - Profile Password Change Form Component
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Lock, ShieldCheck } from 'lucide-react';
import Card from '../common/Card.jsx';
import Button from '../common/Button.jsx';
import { updateUserPassword } from '../../api/user.api.js';

export const ProfilePasswordForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSavePassword = async (data) => {
    try {
      setLoading(true);
      await updateUserPassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      });
      toast.success('Password changed successfully!', { icon: '🔒' });
      reset();
    } catch (err) {
      toast.error(err.message || 'Could not change password');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (err) =>
    `w-full px-3.5 py-2.5 rounded-2xl border text-xs sm:text-sm font-bold bg-white transition-colors focus:outline-none ${
      err ? 'border-[#e02444]' : 'border-[#eee8e2] focus:border-[#ffcd64]'
    }`;

  return (
    <Card pastel="white" className="p-6 sm:p-8 space-y-4 border border-[#eee8e2]">
      <div className="flex items-center gap-2 border-b border-[#eee8e2] pb-3">
        <Lock className="w-5 h-5 text-[#dec7e0]" />
        <h3 className="text-base font-extrabold text-[#2d2a32]">Change Account Password</h3>
      </div>

      <form onSubmit={handleSubmit(onSavePassword)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#4f4a56] mb-1">Current Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('currentPassword', { required: 'Current password is required' })}
              className={inputClass(errors.currentPassword)}
            />
            {errors.currentPassword && <p className="text-[11px] text-[#e02444] mt-1">{errors.currentPassword.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4f4a56] mb-1">New Password (Min 8 Characters)</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('newPassword', {
                required: 'New password is required',
                minLength: { value: 8, message: 'Minimum 8 characters required' }
              })}
              className={inputClass(errors.newPassword)}
            />
            {errors.newPassword && <p className="text-[11px] text-[#e02444] mt-1">{errors.newPassword.message}</p>}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="outline" size="sm" loading={loading} icon={ShieldCheck}>
            Update Password / கடவுச்சொல்லை மாற்று
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProfilePasswordForm;
