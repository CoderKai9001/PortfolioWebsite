import React, { useState, useEffect } from 'react';

const CoordinatesTracker: React.FC = () => {
    const [coords, setCoords] = useState({ x: 0, y: 0, z: 0 });

    useEffect(() => {
        let noiseOffset = 0;
        let animationId: number;

        const handleMouseMove = (e: MouseEvent) => {
            // Generate pseudo-random Z value based on position and time
            noiseOffset += 0.01;
            const z = Math.sin(e.clientX * 0.01 + noiseOffset) * Math.cos(e.clientY * 0.01) * 100;

            setCoords({
                x: e.clientX,
                y: e.clientY,
                z: Math.round(z * 100) / 100
            });
        };

        // Animate Z value even when mouse isn't moving
        const animateZ = () => {
            noiseOffset += 0.02;
            setCoords(prev => ({
                ...prev,
                z: Math.round(Math.sin(noiseOffset) * 50 * 100) / 100
            }));
            animationId = requestAnimationFrame(animateZ);
        };

        window.addEventListener('mousemove', handleMouseMove);
        animationId = requestAnimationFrame(animateZ);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="fixed bottom-4 left-4 z-50 coord-display">
            <div className="glass-card px-4 py-3 space-y-1">
                <div className="flex items-center gap-2">
                    <span className="text-depth-pink">X:</span>
                    <span className="text-white/80">{coords.x.toString().padStart(4, '0')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-depth-pink">Y:</span>
                    <span className="text-white/80">{coords.y.toString().padStart(4, '0')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-lidar-cyan">Z:</span>
                    <span className="text-white/80">{coords.z.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default CoordinatesTracker;
