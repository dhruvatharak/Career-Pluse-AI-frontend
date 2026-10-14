/**
 * CareerPulse AI - Profile Information Edit Form Component
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { User, Save } from 'lucide-react';
import Card from '../common/Card.jsx';
import Button from '../common/Button.jsx';
import { updateUserProfile } from '../../api/user.api.js';
import { RESERVATION_CATEGORIES, TN_DISTRICTS } from '../../shared/constants.js';

export const ProfileEditForm = ({ user, onUserUpdated }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      district: user?.district || 'Chennai',
      category: user?.category || 'OC',
      phone: user?.phone || ''
    }
  });

  const onSave = async (data) => {
    try {
      setLoading(true);
      const res = await updateUserProfile(data);
      toast.success('Profile updated successfully!', { icon: '✅' });
      if (onUserUpdated) onUserUpdated(res.data);
    } catch (err) {
      toast.error(err.message || 'Could not update profile');
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
        <User className="w-5 h-5 text-[#ffcd64]" />
        <h3 className="text-base font-extrabold text-[#2d2a32]">Student Profile Settings</h3>
      </div>

      <form onSubmit={handleSubmit(onSave)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#4f4a56] mb-1">Student Full Name</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={inputClass(errors.name)}
            />
            {errors.name && <p className="text-[11px] text-[#e02444] mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4f4a56] mb-1">Phone Number</label>
            <input
              type="text"
              placeholder="10-digit mobile number"
              {...register('phone')}
              className={inputClass(false)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4f4a56] mb-1">Home District</label>
            <select
              {...register('district', { required: 'District is required' })}
              className={inputClass(false)}
            >
              {TN_DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4f4a56] mb-1">Reservation Category</label>
            <select
              {...register('category', { required: 'Category is required' })}
              className={inputClass(false)}
            >
              {RESERVATION_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" size="sm" loading={loading} icon={Save}>
            Save Profile Changes / சேமிக்கவும்
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProfileEditForm;
