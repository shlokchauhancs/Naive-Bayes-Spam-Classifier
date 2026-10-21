import Link from "next/link";

const links = [
  { href: "/scan", label: "Scanner" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/how", label: "How it works" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-baseline gap-1.5">
          <span className="font-display text-2xl leading-none">SpamShield</span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent transition group-hover:scale-150" />
        </Link>
        <ul className="flex items-center gap-8 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-muted transition hover:text-fg"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}