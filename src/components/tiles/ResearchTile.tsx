import React from 'react';
import { motion } from 'framer-motion';

interface ResearchTileProps {
    delay?: number;
}

const ResearchTile: React.FC<ResearchTileProps> = ({ delay = 0 }) => {
    const interests = [
        { name: 'Perception', color: 'from-depth-pink to-depth-pink/50' },
        { name: 'Robotic Vision', color: 'from-lidar-cyan to-lidar-cyan/50' },
        { name: 'Multi-Agent Systems', color: 'from-purple-400 to-purple-400/50' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass-card p-6"
        >
            <div className="mono text-lidar-cyan/70 text-xs tracking-wider mb-4">
                {"// RESEARCH.focus()"}
            </div>

            <div className="space-y-2">
                {interests.map((interest, index) => (
                    <motion.div
                        key={interest.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: delay + 0.1 * index }}
                        className="flex items-center gap-2"
                    >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${interest.color}`} />
                        <span className="text-sm text-white/80">{interest.name}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default ResearchTile;
