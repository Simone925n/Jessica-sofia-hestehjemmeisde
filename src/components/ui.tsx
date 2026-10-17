import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { images, imageNote } from "../data/images";
export function Arrow() {
  return (
    <svg
      className="arrow-icon"
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <path d="M5 19 19 5M5 5h14v14" />
    </svg>
  );
}
export function ButtonLink({
  to,
  children,
  light = false,
  outline = false,
}: {
  to: string;
  children: ReactNode;
  light?: boolean;
  outline?: boolean;
}) {
  return (
    <Link
      className={`button ${light ? "light" : ""} ${outline ? "outline" : ""}`}
      to={to}
    >
      {children}
      <Arrow />
    </Link>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
export function Photo({
  className = "",
  position,
  priority = false,
  caption = false,
  src = images.hero,
  alt = "Illustreret stemning med islandske heste i et nordisk landskab",
}: {
  className?: string;
  position?: string;
  priority?: boolean;
  caption?: boolean;
  src?: string;
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className={`photo ${className} ${failed ? "image-fallback" : ""}`}>
      {failed ? (
        <div className="fallback-scene">
          <span>Et øjeblik i naturen</span>
        </div>
      ) : (
        <img
          src={
            src.startsWith("/")
              ? `${import.meta.env.BASE_URL}${src.slice(1)}`
              : src
          }
          alt={alt}
          style={{ objectPosition: position }}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          onError={() => setFailed(true)}
        />
      )}
      {caption && <figcaption>{imageNote}</figcaption>}
    </figure>
  );
}
export function PageIntro({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <header className="page-intro container">
      <Eyebrow>{label}</Eyebrow>
      <h1>{title}</h1>
      <p className="lead">{text}</p>
    </header>
  );
}
export function Closing() {
  return (
    <section className="closing">
      <div className="container closing-inner">
        <div>
          <Eyebrow>Der er mere at opdage</Eyebrow>
          <h2>
            Giv plads til
            <br />
            <em>en anden rytme.</em>
          </h2>
        </div>
        <div>
          <p>
            Find inspiration til dit næste møde med islandshesten. Helt tæt på
            naturen.
          </p>
          <ButtonLink to="/rideture" light>
            Udforsk rideture
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
export function DemoNote({ children }: { children?: ReactNode }) {
  return (
    <div className="demo-note">
      <span className="small-dot" />
      {children ||
        "Demonstration · Eksemplerne er ikke bekræftede tilbud eller virkelige hesteprofiler."}
    </div>
  );
}
