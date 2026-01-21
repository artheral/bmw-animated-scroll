'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const frameCount = 147; // Frames 0 to 146
const repoName = 'bmw-animated-scroll'; // Must match next.config.ts
const isProd = process.env.NODE_ENV === 'production';
const getFramePath = (i: number) => `${isProd ? `/${repoName}` : ''}/bmw-scatter-webp/3c3f9a6d-a794-417c-b5c7-082ad19705cd-${i}.webp`;

function ScrollExperience({ images }: { images: HTMLImageElement[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, 146]);

    // Text Opacity Transforms
    // 0% - Intact
    const opacity1 = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    // 25% - Separation Begins
    const opacity2 = useTransform(scrollYProgress, [0.15, 0.25, 0.35], [0, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.15, 0.25, 0.35], [40, 0, -40]);

    // 50% - Pure Performance (Right aligned)
    const opacity3 = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [40, 0, -40]);

    // 75% - Every Part Has Purpose (Centered)
    const opacity4 = useTransform(scrollYProgress, [0.65, 0.75, 0.85], [0, 1, 0]);
    const scale4 = useTransform(scrollYProgress, [0.65, 0.75, 0.85], [0.95, 1, 1.05]);

    // 95% - Hold Frame (CTA)
    const opacity5 = useTransform(scrollYProgress, [0.9, 0.95], [0, 1]);

    useEffect(() => {
        if (!images.length || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const render = () => {
            const idx = currentIndex.get();
            const i = Math.round(idx);
            const safeIndex = Math.max(0, Math.min(frameCount - 1, i));
            const img = images[safeIndex];

            // High DPI Handling
            const dpr = window.devicePixelRatio || 1;

            // Only resize if dimensions differ (prevents clearing on every frame if stable)
            // Note: We check against the literal width attribute, not style
            if (canvas.width !== window.innerWidth * dpr || canvas.height !== window.innerHeight * dpr) {
                canvas.width = window.innerWidth * dpr;
                canvas.height = window.innerHeight * dpr;
                // We don't scale context here because we want to manage drawing coordinates manually for best control
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (img && img.complete) {
                // Calculate contain ratio based on physical pixels
                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.max(hRatio, vRatio); // Cover

                const centerShift_x = (canvas.width - img.width * ratio) / 2;
                const centerShift_y = (canvas.height - img.height * ratio) / 2;

                ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
            }
        };

        const unsubscribe = currentIndex.on("change", () => {
            requestAnimationFrame(render);
        });

        // Initial Render
        render();

        const handleResize = () => {
            requestAnimationFrame(render);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            unsubscribe();
            window.removeEventListener('resize', handleResize);
        }
    }, [images, currentIndex]);

    return (
        <div ref={containerRef} className="h-[400vh] bg-[#030303] relative">

            {/* Ambient Glow Background - Fixed behind canvas */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-blue-900/10 rounded-full blur-[120px] opacity-40 mix-blend-screen" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-purple-900/5 rounded-full blur-[100px] opacity-30 mix-blend-screen" />
            </div>

            <div className="sticky top-0 h-screen w-full overflow-hidden z-10">
                <canvas ref={canvasRef} className="block w-full h-full object-contain" />

                {/* Text 0% - Hero */}
                <motion.div
                    style={{ opacity: opacity1 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                >
                    <div className="text-center px-4">
                        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white text-glow mb-2">BMW M4</h1>
                        <p className="text-xl md:text-3xl font-medium text-white/70 tracking-[0.2em] uppercase">Competition</p>
                    </div>
                </motion.div>

                {/* Text 25% - Left Aligned */}
                <motion.div
                    style={{ opacity: opacity2, y: y2 }}
                    className="absolute inset-0 flex items-center px-8 md:px-32 justify-start pointer-events-none z-20"
                >
                    <div className="max-w-xl">
                        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white text-glow mb-6 leading-none">Defying<br />Gravity.</h2>
                        <div className="h-1 w-20 bg-white/50 mb-6 rounded-full" />
                        <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">Structural integrity unbinds.<br />Mass becomes memory.</p>
                    </div>
                </motion.div>

                {/* Text 50% - Right Aligned */}
                <motion.div
                    style={{ opacity: opacity3, y: y3 }}
                    className="absolute inset-0 flex items-center px-8 md:px-32 justify-end pointer-events-none z-20"
                >
                    <div className="max-w-xl text-right flex flex-col items-end">
                        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white text-glow mb-6 leading-none">Pure<br />Unbound.</h2>
                        <div className="h-1 w-20 bg-white/50 mb-6 rounded-full" />
                        <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">The machine exposes its soul.<br />Every bolt accounted for.</p>
                    </div>
                </motion.div>

                {/* Text 75% - Centered */}
                <motion.div
                    style={{ opacity: opacity4, scale: scale4 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                >
                    <div className="text-center">
                        <h2 className="text-5xl md:text-9xl font-bold tracking-tighter text-white text-glow leading-none mb-4">Every Part<br /><span className="text-white/50">Has Purpose.</span></h2>
                    </div>
                </motion.div>

                {/* Text 95% - Final CTA */}
                <motion.div
                    style={{ opacity: opacity5 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
                >
                    <div className="text-center flex flex-col items-center">
                        <h2 className="text-5xl md:text-9xl font-bold tracking-tighter text-white text-glow mb-12 leading-none">M.<br />Engineered to Move.</h2>

                        <button className="group pointer-events-auto relative px-12 py-5 bg-white text-black font-bold tracking-[0.15em] uppercase text-sm md:text-base overflow-hidden btn-glow">
                            <span className="relative z-10">Configure Yours</span>
                            <div className="absolute inset-0 bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default function BmwScroll() {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let loadedCount = 0;
        const imgs: HTMLImageElement[] = [];

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = getFramePath(i);
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    setIsLoaded(true);
                }
            };
            imgs.push(img);
        }
        setImages(imgs);
    }, []);

    if (!isLoaded) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-[#050505] text-white/60">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span className="text-sm tracking-widest uppercase">Initializing M4 Systems...</span>
                </div>
            </div>
        );
    }

    return <ScrollExperience images={images} />;
}
