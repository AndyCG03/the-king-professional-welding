import Image from 'next/image';
import {notFound} from 'next/navigation';
import {Gallery} from '@/components/Gallery';
import {Header} from '@/components/Header';
import {HeadingText} from '@/components/Heading';
import {Intro} from '@/components/Intro';
import {JsonLd} from '@/components/JsonLd';
import {MobileActions} from '@/components/MobileActions';
import {Motion} from '@/components/Motion';
import {QuoteForm, ServiceLink} from '@/components/QuoteForm';
import {Reviews} from '@/components/Reviews';
import {dictionaries, isLang} from '@/lib/i18n';
import {site} from '@/lib/site';

// Static HTML, re-generated in the background so Google reviews stay fresh (ISR).
export const revalidate = 43200;

const SYMBOLS = ['⌁', '▱', '≋', '▥', '⊞', '▰'];

export default async function Home({params}: {params: Promise<{lang: string}>}) {
  const {lang} = await params;
  if (!isLang(lang)) notFound();
  const d = dictionaries[lang];

  return (
    <>
      <JsonLd lang={lang} />
      <Motion selector=".section-head, .service, .craft-grid > *, .steps > article, .contact-grid > *, .faq-list details, .review-card" />
      <Intro lang={lang} />
      <a className="skip-link" href="#main">{d.nav.skip}</a>
      <div className="topbar"><span>KATY, TEXAS</span><span>{d.topbar}</span><span>{site.hours}</span></div>
      <Header lang={lang} />

      <main id="main">
        <section id="home" className="hero wrap">
          <div className="hero-copy">
            <h1>
              <span className="eyebrow h1-kicker"><span className="line" />{d.hero.kicker}</span>
              <span className="h1-display"><HeadingText value={d.hero.title} /></span>
            </h1>
            <p className="intro">{d.hero.intro}</p>
            <div className="hero-buttons">
              <a className="button" href="#trailers">{d.hero.cta}</a>
              <a className="phone-link" href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a>
            </div>
            <div className="hero-note"><span className="cross">✳</span><span>{d.hero.note}</span></div>
          </div>
          <figure className="hero-visual">
            <Image src="/images/work/trailer-welded-supports.jpg" alt={d.hero.imageAlt} width={2040} height={1530} priority fetchPriority="high" sizes="(max-width: 720px) 100vw, 50vw" />
            <div className="image-corner">{d.hero.corner[0]}<br /><strong>{d.hero.corner[1]}</strong></div>
            <figcaption>{d.hero.caption}</figcaption>
          </figure>
        </section>

        <div className="materials" aria-hidden="true">
          <div className="wrap">
            {d.materials.map((item, index) => (
              <span key={item}>{index > 0 && <b>✳</b>}<span>{item}</span></span>
            ))}
          </div>
        </div>

        <section id="trailers" className="trailer-focus" aria-labelledby="trailers-title">
          <div className="wrap">
            <div className="trailer-lead">
              <div>
                <p className="eyebrow">{d.trailers.eyebrow}</p>
                <h2 id="trailers-title"><HeadingText value={d.trailers.title} /></h2>
              </div>
              <div>
                <p>{d.trailers.text}</p>
                <a className="button trailer-inquiry" href="#contact">{d.trailers.cta}</a>
              </div>
            </div>
            <Gallery photos={d.trailers.photos} lang={lang} className="trailer-projects" sizes="(max-width: 720px) 100vw, (max-width: 900px) 50vw, 33vw" />
            <p className="project-note">{d.trailers.note}</p>
          </div>
        </section>

        <section id="services" className="section wrap" aria-labelledby="services-title">
          <div className="section-head">
            <div>
              <p className="eyebrow">{d.services.eyebrow}</p>
              <h2 id="services-title"><HeadingText value={d.services.title} /></h2>
            </div>
            <p>{d.services.text}</p>
          </div>
          <div className="service-grid">
            {d.services.items.map((item, index) => (
              <article className="service" key={item.title}>
                <span className="service-symbol" aria-hidden="true">{SYMBOLS[index]}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <ServiceLink index={index} label={d.services.cta} />
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section wrap project-section" aria-labelledby="projects-title">
          <div className="section-head">
            <div>
              <p className="eyebrow">{d.projects.eyebrow}</p>
              <h2 id="projects-title"><HeadingText value={d.projects.title} /></h2>
            </div>
            <p>{d.projects.text}</p>
          </div>
          <Gallery photos={d.projects.photos} lang={lang} className="metal-projects" sizes="(max-width: 720px) 100vw, 50vw" />
        </section>

        <section id="craft" className="craft" aria-labelledby="craft-title">
          <div className="wrap craft-grid">
            <figure>
              <Image src="/images/work/steel-stairs.jpg" width={2040} height={1530} alt={d.craft.imageAlt} sizes="(max-width: 720px) 100vw, 50vw" />
              <figcaption>{d.craft.caption}</figcaption>
            </figure>
            <div>
              <p className="eyebrow">{d.craft.eyebrow}</p>
              <h2 id="craft-title"><HeadingText value={d.craft.title} /></h2>
              <p>{d.craft.text}</p>
              <a className="text-link" href="#contact">{d.craft.cta}</a>
            </div>
          </div>
        </section>

        <Reviews lang={lang} />

        <section className="section wrap process" aria-labelledby="process-title">
          <p className="eyebrow">{d.process.eyebrow}</p>
          <h2 id="process-title"><HeadingText value={d.process.title} /></h2>
          <ol className="steps">
            {d.process.steps.map((step, index) => (
              <li key={step.title}><article><span className="step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></article></li>
            ))}
          </ol>
        </section>

        <section id="faq" className="section wrap faq" aria-labelledby="faq-title">
          <div className="section-head">
            <div>
              <p className="eyebrow">{d.faq.eyebrow}</p>
              <h2 id="faq-title"><HeadingText value={d.faq.title} /></h2>
            </div>
          </div>
          <div className="faq-list">
            {d.faq.items.map((item, index) => (
              <details key={item.q} open={index === 0}>
                <summary><h3>{item.q}</h3></summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <div className="wrap contact-grid">
            <div>
              <p className="eyebrow">{d.contact.eyebrow}</p>
              <h2 id="contact-title"><HeadingText value={d.contact.title} /></h2>
              <a className="contact-phone" href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a>
              <a className="contact-email" href={`mailto:${site.email}`}>{site.email}</a>
              <address className="contact-meta">
                <p><strong>{d.contact.findUs}</strong>{site.address.street}<br />{site.address.city}, {site.address.regionName} {site.address.postalCode}</p>
                <p><strong>{d.contact.hours}</strong>{site.hours}<br /><span>{d.contact.hoursNote}</span></p>
              </address>
              <a className="text-link" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">{d.contact.directions}</a>
            </div>
            <QuoteForm lang={lang} />
          </div>
        </section>

        <section className="social-section wrap" aria-labelledby="social-title">
          <div>
            <p className="eyebrow">{d.social.eyebrow}</p>
            <h2 id="social-title"><HeadingText value={d.social.title} /></h2>
          </div>
          <div className="social-links">
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer"><span className="social-badge" aria-hidden="true">f</span><span>Facebook<small>{site.name}</small></span><span className="social-arrow" aria-hidden="true">↗</span></a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer"><span className="social-badge" aria-hidden="true"><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg></span><span>Instagram<small>@kingweldingkaty</small></span><span className="social-arrow" aria-hidden="true">↗</span></a>
            <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer"><span className="social-badge" aria-hidden="true">♪</span><span>TikTok<small>@kingweldingkaty</small></span><span className="social-arrow" aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>

      <footer className="site-footer wrap">
        <a className="footer-brand" href="#home">THE KING OF<br /><strong>PROFESSIONAL WELDING</strong></a>
        <p>
          © {new Date().getFullYear()} {site.name}. {d.footer.rights}<br />
          {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode} · <a href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a>
        </p>
        <a href={`tel:${site.phoneE164}`}>{d.footer.cta}</a>
      </footer>
      <MobileActions lang={lang} />
    </>
  );
}
