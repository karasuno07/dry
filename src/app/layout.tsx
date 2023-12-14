import { Metadata, Viewport } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'RavenZ',
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
