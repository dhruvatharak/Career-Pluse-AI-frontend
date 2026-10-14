/**
 * CareerPulse AI - Profile Settings Tab Component
 */

import React from 'react';
import ProfileEditForm from './ProfileEditForm.jsx';
import ProfilePasswordForm from './ProfilePasswordForm.jsx';

export const ProfileSettingsTab = ({ user, onUserUpdated }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <ProfileEditForm user={user} onUserUpdated={onUserUpdated} />
      <ProfilePasswordForm />
    </div>
  );
};

export default ProfileSettingsTab;
