import React, { useState, useEffect } from 'react';
import { Monitor, MonitorOff } from 'lucide-react';

const CRTOverlay: React.FC = () => {
    const [isEnabled, setIsEnabled] = useState(true);

    // Load preference from local storage if available
    useEffect(() => {
        const saved = localStorage.getItem('crt-filter-enabled');
        if (saved !== null) {
            setIsEnabled(saved === 'true');
        }
    }, []);

    const toggleFilter = () => {
        const nextState = !isEnabled;
        setIsEnabled(nextState);
        localStorage.setItem('crt-filter-enabled', nextState.toString());
    };

    return (
        <>
            {/* The CRT Effect Layers */}
            <div
                className={`crt-container ${isEnabled ? '' : 'hidden'}`}
                aria-hidden="true"
            >
                <div className="crt-scanlines" />
                <div className="crt-flicker" />
                <div className="crt-grain" />
                <div className="crt-vignette" />
            </div>

            {/* Toggle Button */}
            <button
                onClick={toggleFilter}
                className="fixed top-6 right-6 z-[10000] p-2 glass-card flex items-center gap-2 hover:bg-depth-pink/20 transition-all group overflow-hidden"
                title={isEnabled ? "Disable CRT Filter" : "Enable CRT Filter"}
            >
                <div className="relative w-5 h-5">
                    {isEnabled ? (
                        <Monitor size={20} className="text-lidar-cyan group-hover:text-depth-pink transition-colors" />
                    ) : (
                        <MonitorOff size={20} className="text-white/40 group-hover:text-white transition-colors" />
                    )}
                </div>
                <span className="mono text-[10px] uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {isEnabled ? "CRT: ON" : "CRT: OFF"}
                </span>
            </button>

            {/* Global CSS variable for other components to potentially react */}
            <style is:global>{`
        :root {
          --crt-active: ${isEnabled ? 1 : 0};
        }
      `}</style>
        </>
    );
};

export default CRTOverlay;
