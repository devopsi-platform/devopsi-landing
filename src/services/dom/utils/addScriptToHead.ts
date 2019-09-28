export function addScriptToHead(src: string) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = src;
  document.getElementsByTagName('head')[0].appendChild(script);
}
