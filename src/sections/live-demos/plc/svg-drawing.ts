const POWERED_COLOR = '#1f9d6b';
const UNPOWERED_COLOR = '#9aa7b2';
const CONTACT_BAR_OFFSET = 9;
const CONTACT_BAR_HALF_HEIGHT = 14;
const NORMALLY_CLOSED_SLASH_OFFSET = 12;
const COIL_RADIUS = 14;

export const CONTACT_HALF_WIDTH = 40;

const colorFor = (isPowered: boolean): string => (isPowered ? POWERED_COLOR : UNPOWERED_COLOR);

export function drawWire(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  isPowered: boolean,
): string {
  return `<path d="M${fromX} ${fromY}L${toX} ${toY}" stroke="${colorFor(isPowered)}" stroke-width="3" fill="none"/>`;
}

interface TextOptions {
  anchor?: 'start' | 'middle' | 'end';
  opacity?: number;
}

export function drawText(
  x: number,
  y: number,
  text: string,
  { anchor = 'middle', opacity = 1 }: TextOptions = {},
): string {
  return `<text x="${x}" y="${y}" fill="currentColor" fill-opacity="${opacity}" font-size="11" text-anchor="${anchor}" font-family="IBM Plex Mono,monospace">${text}</text>`;
}

export interface ContactSpec {
  x: number;
  y: number;
  address: string;
  tag: string;
  isNormallyClosed: boolean;
  isInputActive: boolean;
  isPoweredIn: boolean;
}

export function drawContact(spec: ContactSpec): { svg: string; isPoweredOut: boolean } {
  const { x, y, address, tag, isNormallyClosed, isInputActive, isPoweredIn } = spec;
  const isClosed = isNormallyClosed ? !isInputActive : isInputActive;
  const isPoweredOut = isPoweredIn && isClosed;
  const slash = isNormallyClosed
    ? `M${x - NORMALLY_CLOSED_SLASH_OFFSET} ${y + NORMALLY_CLOSED_SLASH_OFFSET}L${x + NORMALLY_CLOSED_SLASH_OFFSET} ${y - NORMALLY_CLOSED_SLASH_OFFSET}`
    : '';
  const bars = `M${x - CONTACT_BAR_OFFSET} ${y - CONTACT_BAR_HALF_HEIGHT}V${y + CONTACT_BAR_HALF_HEIGHT}M${x + CONTACT_BAR_OFFSET} ${y - CONTACT_BAR_HALF_HEIGHT}V${y + CONTACT_BAR_HALF_HEIGHT}${slash}`;
  const svg =
    drawWire(x - CONTACT_HALF_WIDTH, y, x - CONTACT_BAR_OFFSET, y, isPoweredIn) +
    drawWire(x + CONTACT_BAR_OFFSET, y, x + CONTACT_HALF_WIDTH, y, isPoweredOut) +
    `<path d="${bars}" stroke="${colorFor(isPoweredOut)}" stroke-width="3.5" fill="none"/>` +
    drawText(x, y - 22, address) +
    drawText(x, y + 32, tag, { opacity: 0.6 });
  return { svg, isPoweredOut };
}

export interface CoilSpec {
  x: number;
  y: number;
  address: string;
  tag: string;
  isEnergized: boolean;
}

export function drawCoil({ x, y, address, tag, isEnergized }: CoilSpec): string {
  return (
    drawWire(x - CONTACT_HALF_WIDTH, y, x - COIL_RADIUS, y, isEnergized) +
    `<circle cx="${x}" cy="${y}" r="${COIL_RADIUS}" fill="${isEnergized ? '#1f9d6b44' : 'none'}" stroke="${colorFor(isEnergized)}" stroke-width="3.5"/>` +
    drawWire(x + COIL_RADIUS, y, x + CONTACT_HALF_WIDTH, y, isEnergized) +
    drawText(x, y - 22, address) +
    drawText(x, y + 32, tag, { opacity: 0.6 })
  );
}
