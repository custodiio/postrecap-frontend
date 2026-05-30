import React from 'react';

export default function LogoIcon({ size = 28 }) {
  const id = `logo-grad-${Math.random().toString(36).substr(2, 5)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00f2fe" />
          <stop offset="100%" stopColor="#ff0050" />
        </linearGradient>
      </defs>
      <rect x="2" y="4" width="28" height="20" rx="3" stroke={`url(#${id})`} strokeWidth="2" fill="none" />
      <polygon points="13,9 13,19 22,14" fill={`url(#${id})`} />
      <line x1="12" y1="28" x2="20" y2="28" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="24" x2="16" y2="28" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
