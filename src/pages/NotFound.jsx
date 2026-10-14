/**
 * CareerPulse AI - 404 Not Found Page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';

export const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4 text-center">
      <Card pastel="yellow" className="max-w-md w-full p-8 space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-[#ffcd64] flex items-center justify-center mx-auto text-[#2d2a32]">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#2d2a32]">Page Not Found</h1>
        <p className="text-xs sm:text-sm text-[#6b6475]">
          The pathway or educational page you are looking for does not exist.
        </p>
        <div className="pt-2">
          <Link to="/">
            <Button variant="primary" size="md" icon={Home}>
              Back to Home / முகப்பு
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;
