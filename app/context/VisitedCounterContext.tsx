'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type VisitedCounterContextType = {
    visitedCounter: number;
    incrementCounter: () => void;
    decrementCounter: () => void;//
};

const VisitedCounterContext = createContext<VisitedCounterContextType | undefined>(undefined);

export function VisitedCounterProvider({ children }: { children: ReactNode }) {
    const [visitedCounter, setVisitedCounter] = useState(0);

    const incrementCounter = () => {
        setVisitedCounter((prev) => prev + 1);
    };

    const decrementCounter = () => {
        setVisitedCounter((prev) => Math.max(prev - 1, 0));
    };

    return (
        <VisitedCounterContext.Provider value={{ visitedCounter, incrementCounter, decrementCounter }}>
            {children}
        </VisitedCounterContext.Provider>
    );
}

export function useVisitedCounter() {
    const context = useContext(VisitedCounterContext);
    if (!context) {
        throw new Error('useVisitedCounter must be used within a VisitedCounterProvider');
    }
    return context;
}
