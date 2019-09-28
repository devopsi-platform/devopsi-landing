import { executeOnce, addScriptToHead } from '~/services/dom/utils';

const GA_TAG = 'UA-119814466-4';
declare global {
  interface Window {
    dataLayer: any;
    ga: any;
    gtag: any;
  }
}

executeOnce(() => {
  addScriptToHead(`https://www.googletagmanager.com/gtag/js?id=${GA_TAG}`);
  window.dataLayer = window.dataLayer || [];
  function gtag(..._: any[]) {
    window.dataLayer.push(arguments);
  }

  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_TAG);
});
