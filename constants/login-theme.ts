// Theme constants for the login components
export const LOGIN_THEME = {
  colors: {
    primary: '#6366F1',
    primaryHover: '#4f46e5',
    primaryShadow: '#6366F1',
    secondary: '#0F172A',
    background: '#f7f9fb',
    surface: '#eceef0',
    surfaceFocus: '#ffffff',
    text: '#191c1e',
    textSecondary: '#45464d',
    outline: '#c6c6cd',
    error: '#dc2626',
  },
  spacing: {
    cardPadding: '3rem', // p-12
    marginBottom: '1.5rem', // mb-6
    gap: '1rem', // gap-4
  },
  shadows: {
    primary: 'shadow-[#6366F1]/20',
    card: 'shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)]',
  },
} as const;
