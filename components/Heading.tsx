import type {Heading as HeadingData} from '@/lib/i18n';

/** Renders a display heading: lines separated by <br>, highlight in <em> at the end. */
export function HeadingText({value}: {value: HeadingData}) {
  const last = value.lines.length - 1;
  return (
    <>
      {value.lines.map((line, index) => (
        <span key={index}>
          {line}
          {index < last && <br />}
        </span>
      ))}
      <em>{value.em}</em>
    </>
  );
}
