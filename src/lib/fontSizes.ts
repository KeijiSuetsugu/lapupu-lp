import type { SiteSettings } from './types';

const heroSizeMap = {
  sm: 'text-3xl md:text-5xl',
  md: 'text-4xl md:text-6xl lg:text-7xl',
  lg: 'text-5xl md:text-7xl lg:text-8xl',
};

const headingSizeMap = {
  sm: 'text-2xl md:text-3xl',
  md: 'text-3xl md:text-4xl',
  lg: 'text-4xl md:text-5xl',
};

const bodySizeMap = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export function getHeroSize(settings?: SiteSettings) {
  return heroSizeMap[settings?.heroSize ?? 'md'];
}

export function getHeadingSize(settings?: SiteSettings) {
  return headingSizeMap[settings?.headingSize ?? 'md'];
}

export function getBodySize(settings?: SiteSettings) {
  return bodySizeMap[settings?.bodySize ?? 'md'];
}
