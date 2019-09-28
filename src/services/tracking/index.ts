export function requestBetaWithEmail(email: string) {
  console.log({ email });
  window.gtag('event', 'beta access', {
    event_category: 'request',
    event_label: email,
  });
  // window.ga('send', 'event', 'Videos', 'play', 'Fall Campaign');
  // window.ga('send', {
  //   hitType: 'event',
  //   eventCategory: 'beta access',
  //   eventAction: 'request',
  //   eventLabel: 'contact form',
  //   hitCallback: function() {
  //     alert('Event received');
  //   },
  // });
  // window.ga('send', 'event', 'Beta Access', 'Request', 'With Email', email);
}
