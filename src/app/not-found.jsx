'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      
      <div className="text-center max-w-lg">

        {/* 404 */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-slate-800">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-3xl font-bold text-slate-700">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-slate-500 leading-relaxed">
          Sorry, the page you're looking for doesn't exist or may have
          been moved.
        </p>

        {/* Button */}
        <Link href="/">
          <Button className="mt-8 bg-slate-900 text-white px-8">
            Back to Home
          </Button>
        </Link>

      </div>

    </div>
  );
};

export default NotFound;