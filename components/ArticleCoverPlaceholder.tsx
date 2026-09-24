import React from 'react';

interface Props {
  type: string;
  id: string;
  category: string;
}

export const ArticleCoverPlaceholder: React.FC<Props> = ({ type, id, category }) => {
  return (
    <div className="relative w-full aspect-[16/10] bg-[#F4F4F0] border-b border-black overflow-hidden select-none flex flex-col justify-between p-3 font-mono text-[10px] tracking-wider text-black">
      {/* Top technical notation bar */}
      <div className="flex items-center justify-between z-10 uppercase border-b border-black/30 pb-1">
        <span className="font-bold">{'//'} REF: {id.toUpperCase()}</span>
        <span>{'//'} {category.toUpperCase()}</span>
        <span className="hidden sm:inline">1:100 MT</span>
      </div>

      {/* Center architectural graphic */}
      <div className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none">
        {renderGraphic(type)}
      </div>

      {/* Bottom technical coordinates bar */}
      <div className="flex items-center justify-between z-10 text-[9px] text-black/70 pt-1 border-t border-black/30">
        <span>GRID: A-04 {'//'} ELEV. +12.4M</span>
        <span className="font-mono">ARCH/SYS_INDEX</span>
      </div>
    </div>
  );
};

function renderGraphic(type: string) {
  switch (type) {
    case 'grid-facade':
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full max-h-[110px]" stroke="#000" fill="none" strokeWidth="1">
          <rect x="20" y="10" width="200" height="100" strokeWidth="1.5" />
          <line x1="20" y1="35" x2="220" y2="35" />
          <line x1="20" y1="60" x2="220" y2="60" />
          <line x1="20" y1="85" x2="220" y2="85" />
          <line x1="70" y1="10" x2="70" y2="110" />
          <line x1="120" y1="10" x2="120" y2="110" />
          <line x1="170" y1="10" x2="170" y2="110" />
          <rect x="30" y="42" width="30" height="12" fill="#000" />
          <rect x="80" y="67" width="30" height="12" fill="#000" />
          <rect x="130" y="42" width="30" height="12" fill="#000" />
          <rect x="180" y="92" width="30" height="12" fill="#000" />
          <line x1="10" y1="10" x2="10" y2="110" strokeDasharray="2 2" />
          <line x1="20" y1="116" x2="220" y2="116" strokeDasharray="2 2" />
        </svg>
      );

    case 'isometric-block':
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full max-h-[110px]" stroke="#000" fill="none" strokeWidth="1">
          <path d="M70,70 L120,40 L170,70 L120,100 Z" fill="#FFF" strokeWidth="1.5" />
          <path d="M70,70 L70,105 L120,135 L120,100 Z" fill="#000" />
          <path d="M170,70 L170,105 L120,135 L120,100 Z" fill="#F4F4F0" />
          <path d="M120,20 L160,-5 L200,20 L160,45 Z" fill="#FFF" strokeDasharray="3 3" />
          <path d="M120,20 L120,50 L160,75 L160,45 Z" />
          <path d="M200,20 L200,50 L160,75 L160,45 Z" />
          <line x1="30" y1="90" x2="60" y2="90" />
          <line x1="30" y1="90" x2="15" y2="105" />
          <line x1="30" y1="90" x2="30" y2="60" />
        </svg>
      );

    case 'axonometric-timber':
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full max-h-[110px]" stroke="#000" fill="none" strokeWidth="1">
          <line x1="40" y1="15" x2="40" y2="105" strokeWidth="2" />
          <line x1="120" y1="15" x2="120" y2="105" strokeWidth="2" />
          <line x1="200" y1="15" x2="200" y2="105" strokeWidth="2" />
          <line x1="30" y1="35" x2="210" y2="35" strokeWidth="1.5" />
          <line x1="30" y1="75" x2="210" y2="75" strokeWidth="1.5" />
          <line x1="40" y1="35" x2="120" y2="75" strokeDasharray="4 2" />
          <line x1="120" y1="35" x2="200" y2="75" strokeDasharray="4 2" />
          <circle cx="120" cy="35" r="4" fill="#000" />
          <circle cx="120" cy="75" r="4" fill="#000" />
        </svg>
      );

    case 'section-cut':
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full max-h-[110px]" stroke="#000" fill="none" strokeWidth="1">
          <line x1="10" y1="95" x2="230" y2="95" strokeWidth="2.5" />
          <line x1="20" y1="95" x2="35" y2="115" />
          <line x1="50" y1="95" x2="65" y2="115" />
          <line x1="80" y1="95" x2="95" y2="115" />
          <line x1="110" y1="95" x2="125" y2="115" />
          <line x1="140" y1="95" x2="155" y2="115" />
          <line x1="170" y1="95" x2="185" y2="115" />
          <line x1="200" y1="95" x2="215" y2="115" />
          <polyline points="40,95 40,25 150,25 150,55 200,55 200,95" strokeWidth="2" fill="#FFF" />
          <line x1="40" y1="60" x2="150" y2="60" strokeWidth="2" />
          <polygon points="80,25 95,12 110,25" fill="#000" />
          <polyline points="15,60 25,60 20,53 15,60" fill="#000" />
        </svg>
      );

    case 'blueprint-facade':
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full max-h-[110px]" stroke="#000" fill="none" strokeWidth="1">
          <rect x="30" y="20" width="180" height="85" strokeWidth="1.5" />
          <line x1="120" y1="10" x2="120" y2="115" strokeDasharray="3 3" />
          <line x1="55" y1="20" x2="55" y2="105" />
          <line x1="80" y1="20" x2="80" y2="105" />
          <line x1="105" y1="20" x2="105" y2="105" />
          <line x1="135" y1="20" x2="135" y2="105" />
          <line x1="160" y1="20" x2="160" y2="105" />
          <line x1="185" y1="20" x2="185" y2="105" />
          <rect x="105" y="65" width="30" height="40" fill="#000" />
        </svg>
      );

    case 'topography-contour':
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full max-h-[110px]" stroke="#000" fill="none" strokeWidth="1">
          <path d="M10,20 Q60,40 120,25 T230,15" />
          <path d="M10,40 Q80,70 140,45 T230,40" strokeWidth="1.5" />
          <path d="M10,65 Q70,95 150,70 T230,65" />
          <path d="M10,90 Q90,115 160,95 T230,90" strokeWidth="1.5" />
          <polygon points="205,30 210,15 215,30 210,25" fill="#000" stroke="none" />
          <text x="207" y="12" fill="#000" fontSize="8" fontFamily="monospace" fontWeight="bold">N</text>
        </svg>
      );

    case 'spiral-golden':
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full max-h-[110px]" stroke="#000" fill="none" strokeWidth="1">
          <rect x="40" y="15" width="160" height="98.88" strokeWidth="1.5" />
          <line x1="138.88" y1="15" x2="138.88" y2="113.88" />
          <line x1="138.88" y1="76.12" x2="200" y2="76.12" />
          <line x1="176.62" y1="76.12" x2="176.62" y2="113.88" />
          <path d="M40,113.88 A98.88,98.88 0 0,1 138.88,15 A61.12,61.12 0 0,1 200,76.12 A37.76,37.76 0 0,1 176.62,113.88" strokeWidth="1.5" />
          <circle cx="165" cy="98" r="2" fill="#000" />
        </svg>
      );

    case 'perspective-grid':
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full max-h-[110px]" stroke="#000" fill="none" strokeWidth="1">
          <line x1="120" y1="55" x2="20" y2="15" />
          <line x1="120" y1="55" x2="220" y2="15" />
          <line x1="120" y1="55" x2="20" y2="110" />
          <line x1="120" y1="55" x2="220" y2="110" />
          <line x1="120" y1="55" x2="70" y2="110" />
          <line x1="120" y1="55" x2="170" y2="110" />
          <rect x="80" y="38" width="80" height="34" />
          <rect x="55" y="28" width="130" height="54" />
          <rect x="30" y="18" width="180" height="74" />
          <circle cx="120" cy="55" r="3" fill="#000" />
        </svg>
      );

    case 'site-plan':
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full max-h-[110px]" stroke="#000" fill="none" strokeWidth="1">
          <rect x="25" y="20" width="55" height="35" fill="#000" />
          <rect x="90" y="20" width="80" height="25" fill="#FFF" strokeWidth="1.5" />
          <rect x="180" y="20" width="35" height="75" fill="#000" />
          <rect x="25" y="65" width="100" height="40" fill="#FFF" strokeWidth="1.5" />
          <rect x="135" y="55" width="35" height="50" strokeDasharray="3 3" />
          <line x1="10" y1="12" x2="230" y2="12" strokeWidth="1" strokeDasharray="6 3" />
        </svg>
      );

    case 'technical-detail':
    default:
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full max-h-[110px]" stroke="#000" fill="none" strokeWidth="1">
          <path d="M30,95 Q120,20 210,95" strokeWidth="2.5" />
          <path d="M45,95 Q120,35 195,95" strokeWidth="1.5" />
          <line x1="50" y1="90" x2="56" y2="80" />
          <line x1="75" y1="70" x2="84" y2="60" />
          <line x1="105" y1="50" x2="108" y2="38" />
          <line x1="120" y1="46" x2="120" y2="34" strokeWidth="2" />
          <line x1="135" y1="50" x2="132" y2="38" />
          <line x1="165" y1="70" x2="156" y2="60" />
          <line x1="190" y1="90" x2="184" y2="80" />
          <line x1="120" y1="12" x2="120" y2="28" strokeWidth="1.5" />
          <polygon points="120,32 116,25 124,25" fill="#000" />
        </svg>
      );
  }
}
