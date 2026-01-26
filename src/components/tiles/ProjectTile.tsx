import React from 'react';
import { motion } from 'framer-motion';

interface ProjectTileProps {
    delay?: number;
}

const ProjectTile: React.FC<ProjectTileProps> = ({ delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass-card p-6 col-span-2 relative overflow-hidden group"
        >
            {/* Background gradient */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-lidar-cyan/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                {/* Header with status */}
                <div className="flex items-center justify-between mb-4">
                    <div className="mono text-lidar-cyan/70 text-sm tracking-wider">
                        {"// ACTIVE_PROJECT"}
                    </div>

                    {/* Pulsing LED status */}
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 led-pulse" style={{ color: '#4ade80' }} />
                        <span className="mono text-xs text-green-400/80">ACTIVE</span>
                    </div>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-semibold text-white mb-3 font-heading leading-tight">
                    Image-based End-to-End Topological Navigation for Indoor Scenes
                </h3>

                {/* Project Description */}
                <p className="text-white/60 text-sm mb-4">
                    Developing navigation systems that leverage visual perception and topological mapping
                    to enable autonomous robot navigation in complex indoor environments.
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    <span className="tag text-xs">Computer Vision</span>
                    <span className="tag text-xs">Navigation</span>
                    <span className="tag text-xs">Deep Learning</span>
                </div>
            </div>

            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-lidar-cyan/20 rounded-tr-xl" />
        </motion.div>
    );
};

export default ProjectTile;
