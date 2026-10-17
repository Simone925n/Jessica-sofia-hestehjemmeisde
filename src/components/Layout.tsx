import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Arrow } from "./ui";
import { business, navigation } from "../data/business";
export default function Layout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuButton = useRef<HTMLButtonElement>(null);
  const main = useRef<HTMLElement>(null);
  const previousPath = useRef(location.pathname);
  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
    if (previousPath.current !== location.pathname) {
      main.current?.focus({ preventScroll: true });
      previousPath.current = location.pathname;
    }
  }, [location.pathname]);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    if (!open) return;
    const fn = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#indhold">
        Gå til indhold
      </a>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner">
          <Link
            to="/"
            className="brand"
            aria-label={`${business.name} – forside`}
          >
            <span>
              {business.name}
              <i>✦</i>
            </span>
            <small>{business.descriptor}</small>
          </Link>
          <nav className="desktop-nav" aria-label="Hovednavigation">
            {navigation
              .filter(([p]) => !["/", "/rideture"].includes(p))
              .map(([p, l]) => (
                <NavLink key={p} to={p}>
                  {l}
                </NavLink>
              ))}
          </nav>
          <Link className="header-book" to="/rideture">
            Book en ridetur <Arrow />
          </Link>
          <button
            ref={menuButton}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Luk menu" : "Åbn menu"}
          >
            <span>{open ? "Luk" : "Menu"}</span>
            <span aria-hidden="true">{open ? "×" : "☰"}</span>
          </button>
        </div>
        {open && (
          <nav
            id="mobile-menu"
            className="mobile-nav"
            aria-label="Mobilnavigation"
          >
            {navigation.map(([p, l]) => (
              <NavLink key={p} to={p}>
                {l}
                <Arrow />
              </NavLink>
            ))}
          </nav>
        )}
      </header>
      <main id="indhold" ref={main} tabIndex={-1}>
        <Outlet />
      </main>
      <footer>
        <div className="container footer-top">
          <div>
            <Link to="/" className="brand footer-brand">
              <span>
                {business.name}
                <i>✦</i>
              </span>
              <small>{business.descriptor}</small>
            </Link>
            <p>
              Et lille univers med plads til
              <br />
              store hesteglæder.
            </p>
          </div>
          <div>
            <h2>Gå på opdagelse</h2>
            {navigation.slice(1, 5).map(([p, l]) => (
              <Link key={p} to={p}>
                {l}
              </Link>
            ))}
          </div>
          <div>
            <h2>Lad os mødes</h2>
            <Link to="/om">Om Jessica-Sofia</Link>
            <Link to="/kontakt">Kontakt</Link>
            <p className="muted">
              Kontaktoplysninger tilføjes
              <br />
              før lancering.
            </p>
          </div>
          <div className="footer-quote">
            “Det begynder
            <br />
            med <em>nærvær.</em>”
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} {business.name} · {business.descriptor}
          </span>
          <span>
            Demonstrationswebsite ·{" "}
            <Link to="/privatliv">Privatliv & billedbrug</Link>
          </span>
        </div>
      </footer>
    </>
  );
}
