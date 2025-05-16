'use client';

import Link from 'next/link';
import React from 'react';

const Button = ({ href, children, style = 'solid', className = '', target }) => {
  const styles = {
    solid: 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
    outline:
      'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded',
    text: 'text-blue-600 hover:text-blue-800 font-semibold py-2 px-4',
  };

  const buttonStyle = styles[style] || styles.solid;

  if (href) {
    // Check if it's an external link
    const isExternal = href.startsWith('http') || href.startsWith('//');

    if (isExternal) {
      return (
        <a
          href={href}
          className={`inline-block ${buttonStyle} ${className}`}
          target={target || '_blank'}
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={`inline-block ${buttonStyle} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${buttonStyle} ${className}`} type="button">
      {children}
    </button>
  );
};

export default Button;
