// Inline SVG cartoon characters and scene elements

export const CartoonBoy = ({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 120 200"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Body */}
    <ellipse cx="60" cy="140" rx="30" ry="40" fill="#6B35D9" stroke="#1a1a2e" strokeWidth="3"/>
    {/* Legs */}
    <rect x="40" y="165" width="16" height="28" rx="8" fill="#2D5BE3" stroke="#1a1a2e" strokeWidth="2.5"/>
    <rect x="64" y="165" width="16" height="28" rx="8" fill="#2D5BE3" stroke="#1a1a2e" strokeWidth="2.5"/>
    {/* Shoes */}
    <ellipse cx="48" cy="192" rx="12" ry="7" fill="#1a1a2e"/>
    <ellipse cx="72" cy="192" rx="12" ry="7" fill="#1a1a2e"/>
    {/* Arms */}
    <rect x="15" y="110" width="14" height="40" rx="7" fill="#6B35D9" stroke="#1a1a2e" strokeWidth="2.5"/>
    <rect x="91" y="110" width="14" height="40" rx="7" fill="#6B35D9" stroke="#1a1a2e" strokeWidth="2.5"/>
    {/* Hands */}
    <circle cx="22" cy="152" r="9" fill="#F5C99A" stroke="#1a1a2e" strokeWidth="2"/>
    <circle cx="98" cy="152" r="9" fill="#F5C99A" stroke="#1a1a2e" strokeWidth="2"/>
    {/* Neck */}
    <rect x="52" y="90" width="16" height="18" fill="#F5C99A" stroke="#1a1a2e" strokeWidth="2"/>
    {/* Head */}
    <ellipse cx="60" cy="72" rx="32" ry="35" fill="#F5C99A" stroke="#1a1a2e" strokeWidth="3"/>
    {/* Hair */}
    <ellipse cx="60" cy="42" rx="33" ry="18" fill="#3D2000"/>
    <ellipse cx="35" cy="55" rx="12" ry="18" fill="#3D2000"/>
    <ellipse cx="85" cy="55" rx="12" ry="18" fill="#3D2000"/>
    {/* Cap */}
    <ellipse cx="60" cy="45" rx="36" ry="10" fill="#9B59F0" stroke="#1a1a2e" strokeWidth="2"/>
    <rect x="24" y="35" width="72" height="18" rx="9" fill="#9B59F0" stroke="#1a1a2e" strokeWidth="2"/>
    <circle cx="60" cy="35" r="6" fill="#FFD700" stroke="#1a1a2e" strokeWidth="1.5"/>
    {/* Eyes */}
    <ellipse cx="48" cy="72" rx="9" ry="10" fill="white" stroke="#1a1a2e" strokeWidth="2"/>
    <ellipse cx="72" cy="72" rx="9" ry="10" fill="white" stroke="#1a1a2e" strokeWidth="2"/>
    <circle cx="50" cy="73" r="5" fill="#1a1a2e"/>
    <circle cx="74" cy="73" r="5" fill="#1a1a2e"/>
    <circle cx="52" cy="71" r="2" fill="white"/>
    <circle cx="76" cy="71" r="2" fill="white"/>
    {/* Blush */}
    <ellipse cx="38" cy="82" rx="7" ry="5" fill="#FF9999" opacity="0.6"/>
    <ellipse cx="82" cy="82" rx="7" ry="5" fill="#FF9999" opacity="0.6"/>
    {/* Smile */}
    <path d="M 48 88 Q 60 98 72 88" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
)

export const CartoonCat = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Body */}
    <ellipse cx="50" cy="70" rx="28" ry="24" fill="#FFB347" stroke="#1a1a2e" strokeWidth="2.5"/>
    {/* Head */}
    <ellipse cx="50" cy="40" rx="26" ry="24" fill="#FFB347" stroke="#1a1a2e" strokeWidth="2.5"/>
    {/* Ears */}
    <polygon points="28,20 20,5 38,15" fill="#FFB347" stroke="#1a1a2e" strokeWidth="2"/>
    <polygon points="72,20 80,5 62,15" fill="#FFB347" stroke="#1a1a2e" strokeWidth="2"/>
    <polygon points="29,19 23,9 37,15" fill="#FF9999" stroke="none"/>
    <polygon points="71,19 77,9 63,15" fill="#FF9999" stroke="none"/>
    {/* Eyes */}
    <ellipse cx="40" cy="38" rx="7" ry="8" fill="white" stroke="#1a1a2e" strokeWidth="1.5"/>
    <ellipse cx="60" cy="38" rx="7" ry="8" fill="white" stroke="#1a1a2e" strokeWidth="1.5"/>
    <circle cx="41" cy="39" r="4" fill="#1a1a2e"/>
    <circle cx="61" cy="39" r="4" fill="#1a1a2e"/>
    <circle cx="42" cy="37" r="1.5" fill="white"/>
    <circle cx="62" cy="37" r="1.5" fill="white"/>
    {/* Nose & Mouth */}
    <ellipse cx="50" cy="47" rx="3" ry="2" fill="#FF6B9D"/>
    <path d="M 44 50 Q 50 56 56 50" fill="none" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Tail */}
    <path d="M 72 80 Q 95 70 90 55 Q 85 45 78 50" fill="none" stroke="#FFB347" strokeWidth="8" strokeLinecap="round"/>
    <path d="M 72 80 Q 95 70 90 55 Q 85 45 78 50" fill="none" stroke="#1a1a2e" strokeWidth="10" strokeLinecap="round" style={{zIndex: -1}}/>
    {/* Paws */}
    <ellipse cx="35" cy="88" rx="10" ry="7" fill="#FFB347" stroke="#1a1a2e" strokeWidth="2"/>
    <ellipse cx="65" cy="88" rx="10" ry="7" fill="#FFB347" stroke="#1a1a2e" strokeWidth="2"/>
    {/* Stripes */}
    <path d="M 38 60 Q 50 57 62 60" fill="none" stroke="#FF8C00" strokeWidth="2" opacity="0.5"/>
    <path d="M 35 68 Q 50 65 65 68" fill="none" stroke="#FF8C00" strokeWidth="2" opacity="0.5"/>
  </svg>
)

export const CartoonCloud = ({ className = '', color = 'white' }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="100" cy="75" rx="85" ry="30" fill={color} stroke="#1a1a2e" strokeWidth="3"/>
    <ellipse cx="70" cy="60" rx="45" ry="38" fill={color} stroke="#1a1a2e" strokeWidth="3"/>
    <ellipse cx="130" cy="55" rx="50" ry="42" fill={color} stroke="#1a1a2e" strokeWidth="3"/>
    <ellipse cx="100" cy="45" rx="40" ry="35" fill={color} stroke="#1a1a2e" strokeWidth="3"/>
    {/* Cover internal borders */}
    <ellipse cx="70" cy="65" rx="43" ry="30" fill={color} stroke="none"/>
    <ellipse cx="130" cy="60" rx="48" ry="30" fill={color} stroke="none"/>
    <ellipse cx="100" cy="55" rx="40" ry="25" fill={color} stroke="none"/>
    <ellipse cx="100" cy="78" rx="83" ry="24" fill={color} stroke="none"/>
  </svg>
)

export const CartoonHouse = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* House body */}
    <rect x="30" y="100" width="140" height="100" fill="#E8D5B7" stroke="#1a1a2e" strokeWidth="3" rx="4"/>
    {/* Roof */}
    <polygon points="20,100 100,30 180,100" fill="#C0392B" stroke="#1a1a2e" strokeWidth="3"/>
    <polygon points="155,70 170,80 180,100 190,100 170,65" fill="#A93226" stroke="#1a1a2e" strokeWidth="2"/>
    {/* Chimney */}
    <rect x="130" y="40" width="20" height="40" fill="#8B6A3E" stroke="#1a1a2e" strokeWidth="2.5"/>
    {/* Door */}
    <rect x="80" y="145" width="40" height="55" fill="#8B4513" stroke="#1a1a2e" strokeWidth="2.5" rx="20"/>
    <circle cx="115" cy="172" r="3" fill="#FFD700"/>
    {/* Windows */}
    <rect x="40" y="115" width="40" height="35" fill="#87CEEB" stroke="#1a1a2e" strokeWidth="2" rx="5"/>
    <line x1="60" y1="115" x2="60" y2="150" stroke="#1a1a2e" strokeWidth="1.5"/>
    <line x1="40" y1="132" x2="80" y2="132" stroke="#1a1a2e" strokeWidth="1.5"/>
    <rect x="120" y="115" width="40" height="35" fill="#87CEEB" stroke="#1a1a2e" strokeWidth="2" rx="5"/>
    <line x1="140" y1="115" x2="140" y2="150" stroke="#1a1a2e" strokeWidth="1.5"/>
    <line x1="120" y1="132" x2="160" y2="132" stroke="#1a1a2e" strokeWidth="1.5"/>
    {/* Window flowers */}
    <text x="42" y="160" fontSize="14">🌸</text>
    <text x="122" y="160" fontSize="14">🌸</text>
  </svg>
)

export const Star = ({ size = 24, color = '#FFD700' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <polygon
      points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
      fill={color}
      stroke="#1a1a2e"
      strokeWidth="1.5"
    />
  </svg>
)

export const CartoonRocket = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 80 140" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Body */}
    <ellipse cx="40" cy="65" rx="22" ry="45" fill="#E74C3C" stroke="#1a1a2e" strokeWidth="2.5"/>
    {/* Nose cone */}
    <path d="M 18 38 Q 40 5 62 38" fill="#C0392B" stroke="#1a1a2e" strokeWidth="2.5"/>
    {/* Window */}
    <circle cx="40" cy="65" r="13" fill="#87CEEB" stroke="#1a1a2e" strokeWidth="2.5"/>
    <circle cx="40" cy="65" r="9" fill="#B8E4F9" stroke="none"/>
    <circle cx="36" cy="61" r="3" fill="white" opacity="0.6"/>
    {/* Fins */}
    <path d="M 18 95 L 5 120 L 18 108" fill="#E74C3C" stroke="#1a1a2e" strokeWidth="2"/>
    <path d="M 62 95 L 75 120 L 62 108" fill="#E74C3C" stroke="#1a1a2e" strokeWidth="2"/>
    {/* Exhaust */}
    <ellipse cx="40" cy="112" rx="14" ry="6" fill="#FF8C00" stroke="#1a1a2e" strokeWidth="1.5"/>
    <ellipse cx="40" cy="120" rx="9" ry="10" fill="#FFD700" stroke="none" opacity="0.8"/>
    <ellipse cx="40" cy="126" rx="5" ry="8" fill="#FF4500" stroke="none" opacity="0.6"/>
    {/* Stars on body */}
    <circle cx="40" cy="45" r="3" fill="#FFD700" stroke="#1a1a2e" strokeWidth="1"/>
  </svg>
)
