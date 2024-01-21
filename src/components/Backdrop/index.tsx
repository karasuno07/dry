'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function generateBackDropDivElement() {
  const element = document.createElement('div');
  element.id = 'backdrop';
  document.body.appendChild(element);
  return element;
}

export default function Backdrop({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);
  const root = document.getElementById('backdrop') || generateBackDropDivElement();

  useEffect(() => setMounted(true), []);

  return mounted ? createPortal(children, root) : null;
}
