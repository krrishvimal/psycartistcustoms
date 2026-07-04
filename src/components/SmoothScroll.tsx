'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode, useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
