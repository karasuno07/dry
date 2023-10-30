import { Metadata } from 'next';
import { Viewport } from 'next/dist/lib/metadata/types/extra-types';
import React from 'react';

export const metadata: Metadata = {
  title: 'DRY Project',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return children;
}
