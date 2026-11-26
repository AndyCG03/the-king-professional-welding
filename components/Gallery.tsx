'use client';

import Image from 'next/image';
import {useCallback, useEffect, useRef, useState} from 'react';
import {dictionaries, type Lang} from '@/lib/i18n';

type Photo = {file: string; caption: string};

/** Photo grid with an accessible native <dialog> lightbox (keyboard arrows, Esc, focus return). */
export function Gallery({photos, lang, className, sizes}: {photos: Photo[]; lang: Lang; className: string; sizes: string}) {
  const t = dictionaries[lang].viewer;
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState(0);

  const show = (i: number, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!dialog.current?.showModal) return; // fall back to opening the image URL
    event.preventDefault();
    opener.current = event.currentTarget;
    setIndex(i);
    dialog.current.showModal();
  };
  const step = useCallback((delta: number) => setIndex(i => (i + delta + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    const onClose = () => opener.current?.focus();
    const onClick = (event: MouseEvent) => event.target === element && element.close();
    element.addEventListener('keydown', onKey);
    element.addEventListener('close', onClose);
    element.addEventListener('click', onClick);
    return () => {
      element.removeEventListener('keydown', onKey);
      element.removeEventListener('close', onClose);
      element.removeEventListener('click', onClick);
    };
  }, [step]);

  const current = photos[index];
  return (
    <>
      <div className={className}>
        {photos.map((photo, i) => (
          <figure className="project-card" key={photo.file}>
            <a className="project-photo" href={`/images/work/${photo.file}.jpg`} onClick={event => show(i, event)} aria-label={`${t.open}: ${photo.caption}`}>
              <Image src={`/images/work/${photo.file}.jpg`} alt={photo.caption} width={2040} height={1530} sizes={sizes} />
              <span className="photo-open" aria-hidden="true">↗</span>
            </a>
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
      <dialog ref={dialog} className="project-viewer" aria-label={current.caption}>
        <button type="button" className="photo-close" aria-label={t.close} onClick={() => dialog.current?.close()}>×</button>
        <Image src={`/images/work/${current.file}.jpg`} alt={current.caption} width={2040} height={1530} sizes="94vw" />
        <p>{current.caption}</p>
        <div className="photo-controls">
          <button type="button" aria-label={t.prev} onClick={() => step(-1)}>←</button>
          <span>{index + 1} / {photos.length}</span>
          <button type="button" aria-label={t.next} onClick={() => step(1)}>→</button>
        </div>
      </dialog>
    </>
  );
}
