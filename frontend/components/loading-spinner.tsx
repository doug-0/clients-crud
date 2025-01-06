import { LoaderIcon } from 'lucide-react';
import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoaderIcon className="animate-spin text-gray-600" size={48} />
    </div>
  );
}
