import Image from 'next/image';
import React from 'react';

export default function Loading() {
  return (
    <div>
      <Image
        src="/images/logo.png"
        alt="logo"
        priority
        layout="fixed"
        width={100}
        height={33}
      />
    </div>
  );
}
