import React, { createContext, useContext, useState } from 'react';
import { Text } from 'react-native';

// Create Assessment Context
const AssessmentContext = createContext();

// Provider for Assessment State
export const AssessmentProvider = ({ children }) => {
    const [isAssessed, setIsAssessed] = useState(false); // Default: Not Assessed

    return (
        <AssessmentContext.Provider value={{ isAssessed, setIsAssessed }}>
            {children}
        </AssessmentContext.Provider>
    );
};

// Hook to use Assessment Context
export const useAssessment = () => useContext(AssessmentContext);
