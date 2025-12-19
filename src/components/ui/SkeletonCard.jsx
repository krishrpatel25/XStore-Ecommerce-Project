import React from 'react'
import { Skeleton } from './skeleton';

const SkeletonCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-10 border-t border-l border-foreground/10">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col p-6 border-b border-r border-foreground/10 h-full"
        >
          {/* ───────── TOP META SKELETON ───────── */}
          <div className="flex justify-between items-center mb-8">
            <Skeleton className="h-2 w-16 bg-foreground/5 rounded-none" />
            <Skeleton className="h-2 w-8 bg-foreground/5 rounded-none" />
          </div>

          {/* ───────── IMAGE SKELETON ───────── */}
          <div className="relative aspect-[4/5] w-full mb-8 flex items-center justify-center">
            <Skeleton className="h-[80%] w-[85%] bg-foreground/5 rounded-none" />
          </div>

          {/* ───────── TEXT CONTENT SKELETON ───────── */}
          <div className="mt-auto space-y-4">
            {/* Title Lines */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-full bg-foreground/10 rounded-none" />
              <Skeleton className="h-3 w-[60%] bg-foreground/10 rounded-none" />
            </div>

            {/* Rating Stars */}
            <div className="flex gap-1 pt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-2.5 w-2.5 bg-foreground/5 rounded-none"
                />
              ))}
            </div>

            {/* Price + Arrow Reveal */}
            <div className="flex items-end justify-between pt-2">
              <div className="space-y-2">
                <Skeleton className="h-2 w-10 bg-foreground/5 rounded-none" />
                <Skeleton className="h-5 w-16 bg-foreground/10 rounded-none" />
              </div>

              {/* Arrow Circle Skeleton */}
              <Skeleton className="w-8 h-8 rounded-full bg-foreground/5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonCard