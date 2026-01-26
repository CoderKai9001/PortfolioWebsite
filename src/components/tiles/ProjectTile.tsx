import React from 'react';
import { motion } from 'framer-motion';
import type { GithubProject } from '../../lib/github';
import { Star, Clock } from 'lucide-react';

interface ProjectTileProps {
    project: GithubProject;
    delay?: number;
}

const ProjectTile: React.FC<ProjectTileProps> = ({ project, delay = 0 }) => {
    const langColor = project.primaryLanguage?.color || '#08CB00';
    const lastUpdated = new Date(project.updatedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass-card p-6 relative overflow-hidden group h-full"
            style={{
                boxShadow: `0 0 20px ${langColor}11`,
                borderColor: `${langColor}33`
            }}
        >
            {/* Background gradient based on language color */}
            <div
                className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: `${langColor}1a` }}
            />

            <div className="relative z-10 flex flex-col h-full">
                {/* Header with status/stats */}
                <div className="flex items-center justify-between mb-4">
                    <div className="mono text-lidar-cyan/70 text-sm tracking-wider">
                        {`// ${project.primaryLanguage?.name?.toUpperCase() || 'PROJECT'}`}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-white/40 text-xs mono">
                            <Star size={12} />
                            <span>{project.stargazerCount}</span>
                        </div>
                    </div>
                </div>

                {/* Project Title */}
                <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline decoration-depth-pink/50 underline-offset-4"
                >
                    <h3 className="text-xl font-semibold text-white mb-3 font-heading leading-tight group-hover:text-depth-pink transition-colors">
                        {project.name}
                    </h3>
                </a>

                {/* Project Description */}
                <p className="text-white/60 text-sm mb-6 flex-grow">
                    {project.description}
                </p>

                {/* Footer: Metadata */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-white/30 text-[10px] mono">
                        <Clock size={10} />
                        <span>LAST_SCAN: {lastUpdated.toUpperCase()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: langColor, boxShadow: `0 0 8px ${langColor}` }}
                        />
                        <span className="mono text-[10px] text-white/50">{project.primaryLanguage?.name}</span>
                    </div>
                </div>
            </div>

            {/* Decorative element */}
            <div
                className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 rounded-tr-xl opacity-30"
                style={{ borderColor: langColor }}
            />
        </motion.div>
    );
};

export default ProjectTile;
