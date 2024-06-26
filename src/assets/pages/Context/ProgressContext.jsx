import React, { createContext, useContext, useState } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  return useContext(ProgressContext);
};

export const ProgressProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0); // Assuming 0 is the first step
  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(0, prevStep - 1));
  };
  return (
    <div>
      {' '}
      <ProgressContext.Provider
        value={{ currentStep, handleNextStep, handlePrevStep }}
      >
        {children}
      </ProgressContext.Provider>
    </div>
  );
};
