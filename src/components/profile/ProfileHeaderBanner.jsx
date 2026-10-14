/**
 * CareerPulse AI - Profile Header Banner Component
 */

import React from 'react';
import { LogOut } from 'lucide-react';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import Button from '../common/Button.jsx';

export const ProfileHeaderBanner = ({ user, onLogout }) => {
  return (
    <Card pastel="white" className="p-6 sm:p-8 border border-[#eee8e2]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-[#ffcd64] flex items-center justify-center font-black text-2xl text-[#2d2a32] shadow-xs border border-[#ebb23e]">
            {user?.name?.charAt(0).toUpperCase() || 'S'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-[#2d2a32]">{user?.name}</h1>
              <Badge variant="green" size="xs">Verified Student</Badge>
            </div>
            <p className="text-xs text-[#6b6475] mt-1 font-semibold">
              {user?.category || 'General'} • {user?.district || 'Tamil Nadu'} District • {user?.email}
            </p>
          </div>
        </div>

        <Button variant="danger" size="sm" onClick={onLogout} icon={LogOut}>
          Sign Out / வெளியேறுக
        </Button>
      </div>
    </Card>
  );
};

export default ProfileHeaderBanner;
