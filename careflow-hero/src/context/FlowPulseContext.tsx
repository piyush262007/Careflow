import React, { createContext, useContext, useEffect, useState } from 'react';

export type PulseStep = 'idle' | 'logo' | 'doctor' | 'ai' | 'medicine' | 'toast';

interface FlowPulseContextType {
  activeStep: PulseStep;
  triggerPulse: () => void;
  isPulseActive: boolean;
}

const FlowPulseContext = createContext<FlowPulseContextType | undefined>(undefined);

export const FlowPulseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeStep, setActiveStep] = useState<PulseStep>('idle');

  const triggerPulse = () => {
    if (activeStep !== 'idle') return;

    // Sequence timing
    setActiveStep('logo');

    setTimeout(() => setActiveStep('doctor'), 1000);
    setTimeout(() => setActiveStep('ai'), 2000);
    setTimeout(() => setActiveStep('medicine'), 3000);
    setTimeout(() => setActiveStep('toast'), 4000);
    setTimeout(() => setActiveStep('idle'), 5200);
  };

  useEffect(() => {
    // Automatically trigger CareFlow Flow Pulse every 20 seconds
    const interval = setInterval(() => {
      triggerPulse();
    }, 20000);

    // Initial pulse on load after 2.5s
    const initialTimer = setTimeout(() => {
      triggerPulse();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
    };
  }, []);

  return (
    <FlowPulseContext.Provider value={{ activeStep, triggerPulse, isPulseActive: activeStep !== 'idle' }}>
      {children}
    </FlowPulseContext.Provider>
  );
};

export const useFlowPulse = (): FlowPulseContextType => {
  const context = useContext(FlowPulseContext);
  if (!context) {
    throw new Error('useFlowPulse must be used within a FlowPulseProvider');
  }
  return context;
};
