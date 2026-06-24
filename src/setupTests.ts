import '@testing-library/jest-dom';

globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

globalThis.IntersectionObserver = class IntersectionObserver {
  root: any = null
  rootMargin: string = ''
  thresholds: ReadonlyArray<number> = []
  takeRecords() { return [] }
  observe() {}
  unobserve() {}
  disconnect() {}
} as any;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
