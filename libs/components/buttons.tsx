import Link, {LinkProps} from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Primary colored button for navigating between pages.
 */
export function PrimaryNavButton({ children, className, ...rest } : NavLinkProps) {
  return (
    <Link
      {...rest}
      className={`px-3 py-2 rounded-full bg-primary hover:opacity-80 text-on_primary ${className}`}
    >
      {children}
    </Link>
  )
}

/**
 * Inverse colored button from primary button, for navigating between pages.
 */
export function SecondaryNavButton({ children, className, ...rest}: NavLinkProps) {
  return (
    <Link
      {...rest}
      className={`px-3 py-2 text-primary hover:opacity-80 rounded-full bg-on_primary border-2 border-primary/70 ${className}`}
    >
      {children}
    </Link>
  )
}

/**
 * Plain text link for navigating to different pages
 */
export function NavLink({ children, className, ...rest} : NavLinkProps) {
  return (
    <Link
      {...rest}
      className={`px-3 py-2 text-primary hover:opacity-80 ${className}`}
    >
      {children}
    </Link>
  )
}

/**
 * Primary colored button for non-navigation purposes.
 */
export function PrimaryButton({ children, className, ...rest } : ButtonProps) {
  return (
    <button
      {...rest}
      className={`px-3 py-2 rounded-full bg-primary hover:opacity-80 text-on_primary ${className}`}
    >
      {children}
    </button>
  )
}

/**
 * Inverse colored button from primary for non-navigation purposes.
 */
export function SecondaryButton({ children, className, ...rest } : ButtonProps) {
  return (
    <button
      {...rest}
      className={`px-3 py-2 rounded-full bg-on_primary text-primary ${className}`}
    >
      {children}
    </button>
  )
}
