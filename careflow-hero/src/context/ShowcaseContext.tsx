import React, { createContext, useContext, useState } from 'react';

export type WorkspaceTab = 'patient' | 'doctor' | 'hospital';

interface ShowcaseContextType {
  activeTab: WorkspaceTab;
  setActiveTab: (tab: WorkspaceTab) => void;
}

const ShowcaseContext = createContext<ShowcaseContextType | undefined>(undefined);

export const ShowcaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('patient');

  return (
    <ShowcaseContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ShowcaseContext.Provider>
  );
};

export const useShowcase = (): ShowcaseContextType => {
  const context = useContext(ShowcaseContext);
  if (!context) {
    throw new Error('useShowcase must be used within a ShowcaseProvider');
  }
  return context;
};
