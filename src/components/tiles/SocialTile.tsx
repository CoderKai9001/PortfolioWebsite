import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

interface SocialTileProps {
    delay?: number;
}

const SocialTile: React.FC<SocialTileProps> = ({ delay = 0 }) => {
    const socials = [
        {
            name: 'GitHub',
            icon: Github,
            url: 'https://github.com/CoderKai9001',
            color: 'text-white hover:text-depth-pink',
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: 'https://www.linkedin.com/in/aditya-chandramouli-vadali-180131289/',
            color: 'text-white hover:text-lidar-cyan',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass-card p-6 flex flex-col justify-between"
        >
            <div className="mono text-lidar-cyan/70 text-xs tracking-wider mb-4">
                {"// CONNECT"}
            </div>

            <div className="flex justify-center gap-6">
                {socials.map((social) => (
                    <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${social.color} icon-hover transition-all duration-300`}
                        aria-label={social.name}
                    >
                        <social.icon size={32} strokeWidth={1.5} />
                    </a>
                ))}
            </div>

            <div className="text-center mt-4">
                <span className="text-white/40 text-xs mono">@CoderKai9001</span>
            </div>
        </motion.div>
    );
};

export default SocialTile;
