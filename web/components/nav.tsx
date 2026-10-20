import Link from "next/link";

const links = [
  { href: "/scan", label: "Scanner" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/how", label: "How it works" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          <span>
            Spam<span className="text-accent">Shield</span>
          </span>
        </Link>
        <ul className="flex items-center gap-6 text-sm">
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