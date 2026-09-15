import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'card' | 'text' | 'avatar' | 'button';
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  count = 1,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'avatar':
        return 'w-12 h-12 rounded-full';
      case 'card':
        return 'w-full h-48 rounded-2xl';
      case 'button':
        return 'w-28 h-10 rounded-xl';
      case 'text':
      default:
        return 'w-full h-4 rounded-md';
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse bg-emerald-900/20 border border-emerald-500/10 ${getVariantStyles()} ${className}`}
        />
      ))}
    </>
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="w-full rounded-2xl border border-emerald-500/15 bg-emerald-950/20 p-6 backdrop-blur-xl animate-pulse space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-6 w-1/3 bg-emerald-800/30 rounded-lg" />
        <div className="h-8 w-20 bg-emerald-800/30 rounded-xl" />
      </div>
      <div className="h-4 w-2/3 bg-emerald-800/20 rounded" />
      <div className="h-20 w-full bg-emerald-900/20 rounded-xl" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-4 w-1/4 bg-emerald-800/20 rounded" />
        <div className="h-10 w-28 bg-emerald-600/30 rounded-xl" />
      </div>
    </div>
  );
};
