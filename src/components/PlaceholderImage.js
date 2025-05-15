'use client';

import { useEffect, useState } from 'react';

// Server component version (no client side effects)
export function ServerPlaceholder({
  text = 'Placeholder Image',
  bgColor = '#1a1a1a',
  textColor = '#ffffff',
  className,
  ...props
}) {
  return (
    <div
      className={`flex items-center justify-center ${className || ''}`}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: bgColor,
        color: textColor,
        position: 'relative',
        overflow: 'hidden',
        ...props.style,
      }}
      {...props}
    >
      {/* Checkerboard pattern background */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-10">
        {Array(64)
          .fill()
          .map((_, i) => (
            <div
              key={i}
              className={`${
                (Math.floor(i / 8) + (i % 8)) % 2 === 0 ? 'bg-white' : 'bg-transparent'
              }`}
            />
          ))}
      </div>

      {/* Text content */}
      <div className="z-10 text-center p-4">
        <div className="text-lg font-bold">{text}</div>
      </div>
    </div>
  );
}

// Client component with responsive features
export default function PlaceholderImage({
  width = 800,
  height = 600,
  text = 'Placeholder Image',
  bgColor = '#1a1a1a',
  textColor = '#ffffff',
  className,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);

  // On client side, show we're loaded
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div
      className={`flex items-center justify-center ${className || ''}`}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: bgColor,
        color: textColor,
        position: 'relative',
        overflow: 'hidden',
        ...props.style,
      }}
      {...props}
    >
      {/* Checkerboard pattern background */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-10">
        {Array(64)
          .fill()
          .map((_, i) => (
            <div
              key={i}
              className={`${
                (Math.floor(i / 8) + (i % 8)) % 2 === 0 ? 'bg-white' : 'bg-transparent'
              }`}
            />
          ))}
      </div>

      {/* Text content */}
      <div className="z-10 text-center p-4">
        <div className="text-lg font-bold">{text}</div>
        {loaded && (
          <div className="text-sm opacity-70 mt-2">
            {width} × {height}
          </div>
        )}
      </div>
    </div>
  );
}
