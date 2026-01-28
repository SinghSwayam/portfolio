import React from "react";
import useTheme from "../../hooks/useTheme";

export const GridBeamBackground = () => {
  const theme = useTheme();

  const verticalColor = theme === 'light'
    ? 'from-transparent via-purple-600 to-transparent'
    : 'from-transparent via-accent-purple to-transparent';

  const horizontalColor = theme === 'light'
    ? 'from-transparent via-blue-500 to-transparent'
    : 'from-transparent via-accent-blue to-transparent';

  const opacityClass = theme === 'light' ? 'opacity-40' : 'opacity-50';

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {/* Vertical Beams */}
      <div className="absolute inset-0">
        <div className={`absolute top-0 w-[1px] h-full bg-transparent left-[5%] sm:left-[10%] overflow-hidden ${opacityClass}`}>
          <div className={`absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b ${verticalColor} animate-beam-drop delay-0`} />
        </div>
        <div className={`absolute top-0 w-[1px] h-full bg-transparent left-[25%] sm:left-[30%] overflow-hidden ${opacityClass}`}>
          <div className={`absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b ${verticalColor} animate-beam-drop delay-2s`} />
        </div>
        <div className={`absolute top-0 w-[1px] h-full bg-transparent left-[50%] overflow-hidden ${opacityClass}`}>
          <div className={`absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b ${verticalColor} animate-beam-drop delay-1s`} />
        </div>
        <div className={`absolute top-0 w-[1px] h-full bg-transparent left-[75%] sm:left-[70%] overflow-hidden ${opacityClass}`}>
          <div className={`absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b ${verticalColor} animate-beam-drop delay-3s`} />
        </div>
        <div className={`absolute top-0 w-[1px] h-full bg-transparent left-[95%] sm:left-[90%] overflow-hidden ${opacityClass} hidden md:block`}>
          <div className={`absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b ${verticalColor} animate-beam-drop delay-5s`} />
        </div>
      </div>

      {/* Horizontal Beams */}
      <div className="absolute inset-0">
        <div className={`absolute left-0 h-[1px] w-full bg-transparent top-[15%] sm:top-[20%] overflow-hidden ${opacityClass}`}>
          <div className={`absolute top-0 left-0 h-full w-[40%] bg-gradient-to-r ${horizontalColor} animate-beam-slide delay-0`} />
        </div>
        <div className={`absolute left-0 h-[1px] w-full bg-transparent top-[35%] sm:top-[40%] overflow-hidden ${opacityClass}`}>
          <div className={`absolute top-0 left-0 h-full w-[40%] bg-gradient-to-r ${horizontalColor} animate-beam-slide delay-2s`} />
        </div>
        <div className={`absolute left-0 h-[1px] w-full bg-transparent top-[65%] sm:top-[60%] overflow-hidden ${opacityClass}`}>
          <div className={`absolute top-0 left-0 h-full w-[40%] bg-gradient-to-r ${horizontalColor} animate-beam-slide delay-1s`} />
        </div>
        <div className={`absolute left-0 h-[1px] w-full bg-transparent top-[85%] sm:top-[80%] overflow-hidden ${opacityClass}`}>
          <div className={`absolute top-0 left-0 h-full w-[40%] bg-gradient-to-r ${horizontalColor} animate-beam-slide delay-4s`} />
        </div>
      </div>
    </div>
  );
};

export const SpotlightBackground = () => {
  const theme = useTheme();

  const blobPurple = theme === 'light' ? 'bg-purple-500/30' : 'bg-accent-purple/25';
  const blobBlue = theme === 'light' ? 'bg-blue-500/30' : 'bg-accent-blue/15';

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      <div className={`absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[120px] animate-pulse-glow ${blobPurple}`} />
      <div className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[100px] animate-pulse-glow delay-1000 ${blobBlue}`} />
    </div>
  );
};

// --- NEW: DATA STREAM BACKGROUND (For GitHub) ---
export const DataStreamBackground = () => {
  const theme = useTheme();

  // High contrast colors for "Data Packets"
  const packetColor = theme === 'light'
    ? 'from-transparent via-blue-600 to-transparent'
    : 'from-transparent via-accent-blue to-transparent';

  const packetColorAlt = theme === 'light'
    ? 'from-transparent via-purple-600 to-transparent'
    : 'from-transparent via-accent-purple to-transparent';

  // Generate 15 random lines with different speeds/positions
  const lines = new Array(15).fill(0).map((_, i) => ({
    top: Math.random() * 100 + "%",
    width: Math.random() * 20 + 10 + "%", // Length of the packet (10-30%)
    delay: Math.random() * 5 + "s",
    duration: Math.random() * 3 + 3 + "s", // Speed (3-6s)
    color: i % 2 === 0 ? packetColor : packetColorAlt,
    opacity: Math.random() * 0.5 + 0.3 // Random opacity
  }));

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {lines.map((line, i) => (
        <div
          key={i}
          className="absolute left-0 h-[2px] bg-transparent overflow-hidden"
          style={{
            top: line.top,
            width: "100%", // Container is full width
            opacity: theme === 'light' ? line.opacity : line.opacity * 0.8, // Slightly dimmer in dark mode to avoid glare
          }}
        >
          <div
            className={`absolute top-0 left-0 h-full bg-gradient-to-r ${line.color} animate-beam-slide`}
            style={{
              width: line.width, // The moving packet length
              animationDelay: line.delay,
              animationDuration: line.duration,
            }}
          />
        </div>
      ))}
    </div>
  );
};