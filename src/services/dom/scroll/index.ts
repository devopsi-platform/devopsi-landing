export function getViewportSize() {
  return {
    width: Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0,
    ),
    height: Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0,
    ),
  };
}

export function getMaxScrollYPosition() {
  return Math.max(0, document.body.offsetHeight - window.innerHeight);
}

export function getScrollDistanceToBottom() {
  return getMaxScrollYPosition() - getCurrentScrollYPosition();
}

export function getCurrentScrollYPosition() {
  const documentScrollY = document.documentElement.scrollTop;

  return documentScrollY;
}

export function scrollToYWithoutAnimation(y: number) {
  window.scrollTo({ top: y });
}

export function persistScrollPosition() {
  window.scrollTo({ top: getCurrentScrollYPosition() - 1 });
  window.scrollTo({ top: getCurrentScrollYPosition() + 1 });
}

function isCurrentScrollPositionEqualTo(requestedPosition: number) {
  return (
    Math.floor(getCurrentScrollYPosition()) === Math.floor(requestedPosition)
  );
}

export function isCurrentScrollPositionMaxPosition() {
  return isCurrentScrollPositionEqualTo(getMaxScrollYPosition());
}

export function getElementYPosition(element: HTMLElement) {
  return element.getBoundingClientRect().top + getCurrentScrollYPosition();
}

export function getElementCentralYPosition(element: HTMLElement) {
  return (
    getElementYPosition(element) -
    getViewportSize().height / 2 +
    element.getBoundingClientRect().height / 2
  );
}

export function getPageScrollHeight() {
  const body = document.body;
  const html = document.documentElement;

  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight,
  );

  return height;
}
