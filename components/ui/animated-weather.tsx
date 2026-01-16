"use client"

export function AnimatedWind() {
  return (
    <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes wind-blow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(8px); }
        }
        @keyframes wind-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        .wind-line {
          animation: wind-blow 2s ease-in-out infinite;
        }
        .wind-pulse {
          animation: wind-pulse 2s ease-in-out infinite;
        }
      `}</style>
      <g className="wind-line">
        <path d="M 20 30 Q 35 30 50 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
        <path d="M 15 50 Q 35 50 55 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        <path d="M 25 70 Q 40 70 60 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      </g>
      <circle cx="70" cy="35" r="6" fill="currentColor" className="wind-pulse" />
    </svg>
  )
}

export function AnimatedClouds() {
  return (
    <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes cloud-float {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
        .cloud {
          animation: cloud-float 3s ease-in-out infinite;
        }
      `}</style>
      <g className="cloud">
        <circle cx="30" cy="50" r="15" fill="currentColor" opacity="0.8" />
        <circle cx="45" cy="45" r="18" fill="currentColor" opacity="0.7" />
        <circle cx="60" cy="50" r="15" fill="currentColor" opacity="0.8" />
        <rect x="30" y="50" width="30" height="15" fill="currentColor" opacity="0.8" />
      </g>
    </svg>
  )
}

export function AnimatedSun() {
  return (
    <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes sun-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .sun-rays {
          animation: sun-rotate 20s linear infinite;
          transform-origin: 50px 50px;
        }
      `}</style>
      <circle cx="50" cy="50" r="20" fill="currentColor" opacity="0.9" />
      <g className="sun-rays" opacity="0.6">
        <rect x="48" y="8" width="4" height="12" fill="currentColor" rx="2" />
        <rect x="48" y="80" width="4" height="12" fill="currentColor" rx="2" />
        <rect x="8" y="48" width="12" height="4" fill="currentColor" rx="2" />
        <rect x="80" y="48" width="12" height="4" fill="currentColor" rx="2" />
      </g>
    </svg>
  )
}

export function AnimatedPollution() {
  return (
    <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes smoke-rise {
          0% { transform: translateY(0) scaleY(1); opacity: 1; }
          100% { transform: translateY(-20px) scaleY(0.8); opacity: 0; }
        }
        .smoke {
          animation: smoke-rise 2s ease-out infinite;
        }
      `}</style>
      <circle cx="30" cy="70" r="8" fill="currentColor" opacity="0.6" />
      <circle cx="50" cy="70" r="8" fill="currentColor" opacity="0.6" />
      <circle cx="70" cy="70" r="8" fill="currentColor" opacity="0.6" />
      <g className="smoke" style={{ transformOrigin: "30px 70px" }}>
        <circle cx="30" cy="50" r="10" fill="currentColor" opacity="0.4" />
      </g>
      <g className="smoke" style={{ transformOrigin: "50px 70px", animationDelay: "0.3s" }}>
        <circle cx="50" cy="45" r="10" fill="currentColor" opacity="0.4" />
      </g>
      <g className="smoke" style={{ transformOrigin: "70px 70px", animationDelay: "0.6s" }}>
        <circle cx="70" cy="50" r="10" fill="currentColor" opacity="0.4" />
      </g>
    </svg>
  )
}
