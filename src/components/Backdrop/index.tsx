'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const backdropDivElement = document.getElementById('#backdrop') as HTMLDivElement;

export default function Backdrop({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted ? createPortal(children, backdropDivElement) : null;
}
