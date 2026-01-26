import React from 'react';
import { motion } from 'framer-motion';

interface HeroTileProps {
    delay?: number;
}

const HeroTile: React.FC<HeroTileProps> = ({ delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass-card p-8 col-span-2 row-span-2 flex flex-col justify-between relative overflow-hidden group"
        >
            {/* Gradient orb background */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-depth-pink/20 to-lidar-cyan/10 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="mono text-lidar-cyan/70 text-sm mb-2 tracking-wider">
                    {"// IDENTITY.scan()"}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-2 font-heading">
                    <span className="gradient-text">Aditya Vadali</span>
                </h1>

                <h2 className="text-xl md:text-2xl text-depth-pink font-medium mb-6">
                    Perception & Robotic Vision
                </h2>

                <p className="text-white/70 text-lg leading-relaxed max-w-md">
                    Mapping the world through the lens of Robotics. Focused on the intersection
                    of <span className="text-lidar-cyan">Perception</span> and{' '}
                    <span className="text-depth-pink">Robotic Vision</span>.
                </p>
            </div>

            <div className="relative z-10 mt-6">
                <p className="text-white/50 text-sm mono">
                    Currently engineering systems that allow robots to navigate complex
                    indoor environments using topological mapping and end-to-end learning.
                </p>
            </div>

            {/* Corner accent */}
            <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-depth-pink/30 rounded-br-xl" />
        </motion.div>
    );
};

export default HeroTile;
