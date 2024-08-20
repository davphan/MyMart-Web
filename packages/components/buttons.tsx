import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function PrimaryNavButton({
  children, href
} : {
  children: string,
  href: string
}) {
  return (
    <Link
      href={href}
      className='px-3 py-2 rounded-full bg-primary hover:opacity-80 text-on_primary'
    >
      {children}
    </Link>
  )
}

export function SecondaryNavButton({
  children, href
} : {
  children: string,
  href: string
}) {
  return (
    <Link
      href={href}
      className='px-3 py-2 rounded-full bg-on_primary text-primary'
    >
      {children}
    </Link>
  )
}

export function NavLink({
  children, href } : {
  children: string,
  href: string
}) {
  return (
    <Link
      href={href}
      className='px-3 py-2 text-primary hover:opacity-80'
    >
      {children}
    </Link>
  )
}

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

export function SecondaryButton({
  children, onClick
} : {
  children: string,
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className='px-3 py-2 rounded-full bg-on_primary text-primary'
    >
      {children}
    </button>
  )
}
