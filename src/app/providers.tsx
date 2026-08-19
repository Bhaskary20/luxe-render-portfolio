import { createContext, useContext, type ReactNode } from "react";
import { useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { useLenisSetup } from "@/hooks/useLenis";

const ReducedMotionContext = createContext(false);

export function useReducedMotion() {
  return useContext(ReducedMotionContext);
}

function MotionGate({ children }: { children: ReactNode }) {
  const prefersReduced = useFramerReducedMotion() ?? false;
  useLenisSetup(!prefersReduced);

  return <ReducedMotionContext.Provider value={prefersReduced}>{children}</ReducedMotionContext.Provider>;
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <HelmetProvider>
      <MotionGate>{children}</MotionGate>
    </HelmetProvider>
  );
}
