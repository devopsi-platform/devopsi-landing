import { useEffect, RefObject } from 'react';
import { createDocumentEvent } from '~/services/dom/events';

function isMouseEvent(event: Event): event is MouseEvent {
  return event.type.startsWith('mouse');
}

/**
 * Callback on every tap that was not scrolling touchmove
 */
function onTap(callback: (clickEvent: TouchEvent) => void) {
  // flag indicating if scroll happened between any touch start and end
  let isTouchScrolling = false;

  // watch for touch start
  return createDocumentEvent('touchstart', () => {
    isTouchScrolling = false;

    // AFTER touch start - start watching for scroll, if so, set scroll flag
    const cancelWatchScroll = createDocumentEvent('scroll', () => {
      isTouchScrolling = true;
    });

    // also, watch for touch end
    const cancelTouchEnd = createDocumentEvent(
      'touchend',
      (event) => {
        // touch has ended - first, clear those temp events created only for this touch
        cancelWatchScroll();
        cancelTouchEnd();

        // if scroll happened during this scroll, it wasnt tap
        if (isTouchScrolling) {
          return;
        }

        // let know it's tap
        callback(event);
      },
      // just to be sure touchend callback is called only once per touchstart
      { once: true },
    );
  });
}

export function isClickEventInsideElement(
  clickEvent: MouseEvent | TouchEvent,
  watchedElement: HTMLElement,
) {
  const eventTarget = clickEvent.target;

  /**
   * Event is inside element if
   * - given element IS EQUAL to event target element
   * - event target element is inside given element
   */
  const watchedElementIsTarget = watchedElement === eventTarget;
  const watchedElementContainsTarget = watchedElement.contains(
    eventTarget as Node,
  );

  const isClickedInside =
    watchedElementIsTarget || watchedElementContainsTarget;

  return isClickedInside;
}

export function useClickOutside(
  elementRef: RefObject<HTMLElement>,
  onClickedOutsideCallback?: (event: MouseEvent | TouchEvent) => void,
) {
  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      // if element ref is empty - dont proceed
      if (!elementRef.current) {
        return;
      }

      const isClickedInside = isClickEventInsideElement(
        event,
        elementRef.current,
      );

      // if clicked inside - dont continue - we're interested in outside events
      if (isClickedInside) {
        return;
      }

      // if we have callback function - execute it
      onClickedOutsideCallback && onClickedOutsideCallback(event);
    };

    const cancelTap = onTap(handleClick);

    document.addEventListener('mouseup', handleClick);

    return () => {
      document.removeEventListener('mouseup', handleClick);

      cancelTap();
    };
  }, [elementRef, onClickedOutsideCallback]);
}
