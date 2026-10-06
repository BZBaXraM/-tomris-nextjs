import Link from "next/link";
export default function NotFound() {
  return (
    <main style={{ maxWidth: 800, margin: "10vh auto", padding: 30 }}>
      <p>TOMRIS / 404</p>
      <h1>Page not found</h1>
      <Link href="/">AZ / Ana səhifə · RU / Главная · EN / Home</Link>
    </main>
  );
}
