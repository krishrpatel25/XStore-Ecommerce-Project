import React from 'react'
import { Skeleton } from './skeleton';

const SkeletonCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10 mt-10 px-4 sm:px-12 lg:px-14">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i}>
          {/* Image */}
          <div className="w-full h-64 bg-white rounded-2xl overflow-hidden">
            <Skeleton className="w-full h-full rounded-2xl" />
          </div>

          {/* Title + Price */}
          <div className="mt-3 flex justify-between items-center">
            <Skeleton className="h-4 w-[65%]" />
            <Skeleton className="h-4 w-[40px]" />
          </div>

          {/* Rating */}
          <div className="flex gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-3 w-3 rounded-sm" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonCard