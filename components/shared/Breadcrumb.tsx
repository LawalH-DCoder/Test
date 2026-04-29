import Link from 'next/link';

export type BreadcrumbItem =
  | {
      label: string;
      href: string;
    }
  | {
      label: string;
      href: null;
    };

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

const Breadcrumb = ({
  items,
  separator = <span className="material-symbols-outlined text-xs">chevron_right</span>,
  className = '',
}: BreadcrumbProps) => {
  return (
    <nav className={`flex items-center gap-2 text-slate-500 text-sm ${className}`}>
      {items.map((crumb, i) => (
        <span key={crumb.label} className="flex items-center gap-2">
          {i > 0 && separator}

          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-indigo-600 transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-slate-900 font-medium">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
