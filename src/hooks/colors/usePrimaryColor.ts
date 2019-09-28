import { useViewportScroll, useTransform } from 'framer-motion';
import { getPageScrollHeight } from '~/services/dom/scroll';
import { colors } from '~/config';

export function usePrimaryColor() {
  const { scrollY } = useViewportScroll();

  const scrollYProgress = useTransform(scrollY, (value: number) => {
    return value / getPageScrollHeight();
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    [colors.primary, colors.secondary],
  );

  return backgroundColor;
}
