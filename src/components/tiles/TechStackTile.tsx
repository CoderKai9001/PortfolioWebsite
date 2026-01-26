import React from 'react';
import { motion } from 'framer-motion';

interface TechStackTileProps {
    delay?: number;
}

const TechStackTile: React.FC<TechStackTileProps> = ({ delay = 0 }) => {
    const technologies = [
        { name: 'Python', color: '#3776AB' },
        { name: 'C++', color: '#00599C' },
        { name: 'ROS2', color: '#22314E' },
        { name: 'PyTorch', color: '#EE4C2C' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass-card p-6"
        >
            <div className="mono text-lidar-cyan/70 text-xs tracking-wider mb-4">
                {"// TECH_STACK"}
            </div>

            <div className="grid grid-cols-2 gap-3">
                {technologies.map((tech, index) => (
                    <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: delay + 0.1 * index }}
                        className="tech-icon flex-col gap-1 py-3"
                        style={{ '--tech-color': tech.color } as React.CSSProperties}
                    >
                        <span className="text-xs font-medium text-white/90">{tech.name}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default TechStackTile;
