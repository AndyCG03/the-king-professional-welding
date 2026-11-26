import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="not-found wrap">
      <p className="eyebrow">404</p>
      <h1>PAGE NOT FOUND<br /><em>PÁGINA NO ENCONTRADA</em></h1>
      <p><Link className="button" href="/">THE KING OF PROFESSIONAL WELDING</Link></p>
    </main>
  );
}
