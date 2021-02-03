/**
 * Helper to format a human readable duration date.
 * @param duration The duration as date.
 */
export const formatDuration = (duration: Date): string => {
  let ms = duration.getTime();

  const h = Math.floor(ms / 1000 / 60 / 60);
  ms = ms - h * 1000 * 60 * 60;
  const m = Math.floor(ms / 1000 / 60);
  ms = ms - m * 1000 * 60;
  const s = Math.floor(ms / 1000);

  const hh = h.toString().padStart(2, '0');
  const mm = m.toString().padStart(2, '0');
  const ss = s.toString().padStart(2, '0');

  return `${hh}:${mm}:${ss}`;
};
