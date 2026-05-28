export function IconFolder({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M1.5 3.5C1.5 2.948 1.948 2.5 2.5 2.5H5.793a1 1 0 0 1 .707.293L7.207 3.5H13.5c.552 0 1 .448 1 1V12.5c0 .552-.448 1-1 1h-11c-.552 0-1-.448-1-1V3.5z" fill="currentColor" fillOpacity=".15" stroke="currentColor" strokeWidth="1"/>
      <path d="M1.5 5.5h13" stroke="currentColor" strokeWidth=".75" opacity=".5"/>
    </svg>
  );
}

export function IconFolderOpen({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M1.5 4.5C1.5 3.948 1.948 3.5 2.5 3.5H5.793a1 1 0 0 1 .707.293L7.207 4.5H13.5c.552 0 1 .448 1 1v1H1.5V4.5z" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth="1"/>
      <path d="M1.5 6.5h13l-1.5 7h-10L1.5 6.5z" fill="currentColor" fillOpacity=".12" stroke="currentColor" strokeWidth="1"/>
    </svg>
  );
}

export function IconFile({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M3.5 1.5h6l3 3V14.5h-9v-13z" fill="currentColor" fillOpacity=".08" stroke="currentColor" strokeWidth="1"/>
      <path d="M9.5 1.5v3h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <line x1="5.5" y1="7" x2="10.5" y2="7" stroke="currentColor" strokeWidth=".75" strokeLinecap="round" opacity=".6"/>
      <line x1="5.5" y1="9" x2="10.5" y2="9" stroke="currentColor" strokeWidth=".75" strokeLinecap="round" opacity=".6"/>
      <line x1="5.5" y1="11" x2="8.5" y2="11" stroke="currentColor" strokeWidth=".75" strokeLinecap="round" opacity=".6"/>
    </svg>
  );
}

export function IconPdf({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M3.5 1.5h6l3 3V14.5h-9v-13z" fill="currentColor" fillOpacity=".1" stroke="currentColor" strokeWidth="1"/>
      <path d="M9.5 1.5v3h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <rect x="3" y="6.5" width="10" height="4" rx=".5" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth=".75"/>
      <text x="5.5" y="9.8" fontSize="3.5" fill="currentColor" fontFamily="monospace" fontWeight="bold">PDF</text>
    </svg>
  );
}

export function IconDocx({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M3.5 1.5h6l3 3V14.5h-9v-13z" fill="currentColor" fillOpacity=".1" stroke="currentColor" strokeWidth="1"/>
      <path d="M9.5 1.5v3h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <text x="4.5" y="10.5" fontSize="3.5" fill="currentColor" fontFamily="monospace" fontWeight="bold">DOC</text>
    </svg>
  );
}

export function IconXlsx({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M3.5 1.5h6l3 3V14.5h-9v-13z" fill="currentColor" fillOpacity=".1" stroke="currentColor" strokeWidth="1"/>
      <path d="M9.5 1.5v3h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <text x="4.5" y="10.5" fontSize="3.5" fill="currentColor" fontFamily="monospace" fontWeight="bold">XLS</text>
    </svg>
  );
}

export function IconImg({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="2" y="3" width="12" height="10" rx="1" fill="currentColor" fillOpacity=".08" stroke="currentColor" strokeWidth="1"/>
      <circle cx="5.5" cy="6.5" r="1.5" fill="currentColor" fillOpacity=".5"/>
      <path d="M2 10.5l3.5-3 3 2.5 2-1.5 3 2.5" stroke="currentColor" strokeWidth=".9" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconTxt({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M3.5 1.5h6l3 3V14.5h-9v-13z" fill="currentColor" fillOpacity=".08" stroke="currentColor" strokeWidth="1"/>
      <path d="M9.5 1.5v3h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <line x1="5.5" y1="7" x2="10.5" y2="7" stroke="currentColor" strokeWidth=".75" opacity=".7"/>
      <line x1="5.5" y1="9" x2="10.5" y2="9" stroke="currentColor" strokeWidth=".75" opacity=".7"/>
      <line x1="5.5" y1="11" x2="8.5" y2="11" stroke="currentColor" strokeWidth=".75" opacity=".7"/>
    </svg>
  );
}

export function IconConfig({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M3.5 1.5h6l3 3V14.5h-9v-13z" fill="currentColor" fillOpacity=".08" stroke="currentColor" strokeWidth="1"/>
      <path d="M9.5 1.5v3h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="8" cy="9.5" r="2" stroke="currentColor" strokeWidth=".9"/>
      <circle cx="8" cy="9.5" r=".7" fill="currentColor"/>
    </svg>
  );
}

export function IconFont({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M3.5 1.5h6l3 3V14.5h-9v-13z" fill="currentColor" fillOpacity=".08" stroke="currentColor" strokeWidth="1"/>
      <path d="M9.5 1.5v3h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <text x="5" y="11.5" fontSize="5" fill="currentColor" fontFamily="serif" fontWeight="bold">Aa</text>
    </svg>
  );
}

export function IconChevron({ size = 12, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" className={className}>
      <path d="M4 2.5L7.5 6 4 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconSearch({ size = 14, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.25"/>
      <line x1="9.5" y1="9.5" x2="13" y2="13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    </svg>
  );
}

export function IconX({ size = 10, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" className={className}>
      <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function IconShield({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4z" fill="currentColor" fillOpacity=".1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconLock({ size = 32, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <rect x="6" y="14" width="20" height="15" rx="2" fill="currentColor" fillOpacity=".08" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 14v-4a6 6 0 0 1 12 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="16" cy="21" r="2" fill="currentColor" fillOpacity=".6"/>
      <line x1="16" y1="23" x2="16" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
