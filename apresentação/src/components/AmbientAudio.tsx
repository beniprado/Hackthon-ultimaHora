import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const AmbientAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleAudio = () => {
    if (!isPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Ethereal drone oscillators
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(110, ctx.currentTime); // A2 fundamental

        const osc2 = ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(220, ctx.currentTime); // A3 harmonic

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 2.5);

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start();
        osc2.start();

        osc1Ref.current = osc1;
        osc2Ref.current = osc2;
        gainNodeRef.current = gainNode;

        setIsPlaying(true);
      } catch (err) {
        console.warn('Web Audio not supported or blocked', err);
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8);
        setTimeout(() => {
          try {
            osc1Ref.current?.stop();
            osc2Ref.current?.stop();
            audioCtxRef.current?.close();
          } catch (e) {
            // ignore
          }
        }, 800);
      }
      setIsPlaying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      onClick={toggleAudio}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full glass-panel border border-white/10 hover:border-cyan-500/40 transition-all duration-300 cursor-pointer group shadow-2xl backdrop-blur-xl"
    >
      <div className="relative w-4 h-4 flex items-center justify-center gap-[2px]">
        {[0.6, 0.4, 0.8].map((speed, idx) => (
          <motion.span
            key={idx}
            animate={
              isPlaying
                ? { height: ['4px', '14px', '4px'] }
                : { height: '4px' }
            }
            transition={{
              repeat: isPlaying ? Infinity : 0,
              duration: speed,
              ease: 'easeInOut',
              delay: idx * 0.15,
            }}
            className={`w-[2px] rounded-full transition-colors ${
              isPlaying ? 'bg-cyan-400' : 'bg-zinc-500 group-hover:bg-cyan-400'
            }`}
          />
        ))}
      </div>
      <span
        className={`text-xs font-mono tracking-wider uppercase transition-colors ${
          isPlaying ? 'text-cyan-400 font-bold' : 'text-zinc-400 group-hover:text-cyan-300'
        }`}
      >
        Audio Atmosfera: {isPlaying ? 'ON' : 'OFF'}
      </span>
    </motion.div>
  );
};
