import {
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  decodeCursor,
  encodeCursor,
  resolveLimit,
} from './pagination.dto';

describe('pagination helpers', () => {
  it('round-trips a cursor through encode/decode', () => {
    const payload = { createdAt: new Date().toISOString(), id: 'row-1' };
    const cursor = encodeCursor(payload);
    expect(decodeCursor(cursor)).toEqual(payload);
  });

  it('returns null for a malformed cursor rather than throwing', () => {
    expect(decodeCursor('not-a-valid-cursor!!')).toBeNull();
    expect(decodeCursor(Buffer.from('{}').toString('base64url'))).toBeNull();
  });

  it('defaults to DEFAULT_PAGE_SIZE when no limit is given', () => {
    expect(resolveLimit(undefined)).toBe(DEFAULT_PAGE_SIZE);
    expect(resolveLimit(0)).toBe(DEFAULT_PAGE_SIZE);
    expect(resolveLimit(-5)).toBe(DEFAULT_PAGE_SIZE);
  });

  it('caps limit at MAX_PAGE_SIZE', () => {
    expect(resolveLimit(10_000)).toBe(MAX_PAGE_SIZE);
  });

  it('passes through a valid limit unchanged', () => {
    expect(resolveLimit(15)).toBe(15);
  });
});
