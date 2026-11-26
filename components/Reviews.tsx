import Image from 'next/image';
import {HeadingText} from './Heading';
import {RateService} from './RateService';
import {getPlaceReviews} from '@/lib/google-reviews';
import {dictionaries, type Lang} from '@/lib/i18n';
import {fullAddress, site} from '@/lib/site';

function Stars({value}: {value: number}) {
  const rounded = Math.round(value * 2) / 2;
  return (
    <span className="stars" role="img" aria-label={`${value.toFixed(1)} / 5`}>
      {[1, 2, 3, 4, 5].map(n => (
        <span key={n} className={n <= rounded ? 'on' : n - 0.5 === rounded ? 'half' : undefined} aria-hidden="true">★</span>
      ))}
    </span>
  );
}

/** Social proof from Google Business Profile. Server-rendered (crawlable) and refreshed by ISR. */
export async function Reviews({lang}: {lang: Lang}) {
  const t = dictionaries[lang].reviews;
  const data = await getPlaceReviews(`${site.name}, ${fullAddress}`, lang, site.googlePlaceId);
  const profileUrl = data?.mapsUrl ?? site.googleMapsCid;

  return (
    <section id="reviews" className="section wrap reviews" aria-labelledby="reviews-title">
      <div className="section-head">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id="reviews-title"><HeadingText value={t.title} /></h2>
        </div>
        {data?.rating ? (
          <div className="rating-summary">
            <strong>{data.rating.toFixed(1)}</strong>
            <div><Stars value={data.rating} /><p>{t.basedOn(data.total ?? data.reviews.length)}</p></div>
          </div>
        ) : (
          <p>{t.text}</p>
        )}
      </div>

      {data && data.reviews.length > 0 ? (
        <ul className="review-grid">
          {data.reviews.map((review, index) => (
            <li className="review-card" key={`${review.author}-${index}`}>
              <Stars value={review.rating} />
              <blockquote><p>{review.text}</p></blockquote>
              <footer>
                {review.photo && <Image src={review.photo} alt="" width={40} height={40} />}
                <span>
                  {review.authorUrl ? <a href={review.authorUrl} target="_blank" rel="noopener noreferrer nofollow">{review.author}</a> : review.author}
                  <small>{review.relativeTime} · {t.fromGoogle}</small>
                </span>
              </footer>
            </li>
          ))}
        </ul>
      ) : (
        <p className="reviews-empty">{t.fallback}</p>
      )}

      <div className="review-actions">
        <a className="button" href={site.googleWriteReview} target="_blank" rel="noopener noreferrer">{t.write}</a>
        <a className="text-link" href={profileUrl} target="_blank" rel="noopener noreferrer">{t.readAll}</a>
        <span className="google-attribution">Google</span>
      </div>

      <div className="rate-panel" id="rate">
        <div>
          <h3>{t.rateTitle}</h3>
          <p>{t.rateText}</p>
        </div>
        <RateService lang={lang} business={site.name} whatsapp={site.whatsapp} googleUrl={site.googleWriteReview} />
      </div>
    </section>
  );
}
