window.dataLayer = window.dataLayer || [];
window.gtag =
  window.gtag ||
  function gtag() {
    window.dataLayer.push(arguments);
  };

window.gtag_report_conversion = function gtag_report_conversion(url, userData) {
  var callback = function () {
    if (typeof url !== 'undefined') {
      window.location = url;
    }
  };

  if (userData && typeof userData === 'object') {
    window.gtag('set', 'user_data', userData);
  }

  window.gtag('event', 'conversion', {
    send_to: 'AW-11278008764/T9HmCN6H0MkYELyD44Eq',
    event_callback: callback,
  });

  return false;
  };

function getStoredConsent() {
  try {
    var raw = window.localStorage.getItem('lecyberassureur-cookie-consent');
    if (!raw) return null;
    var parsed = JSON.parse(raw);
    return parsed && parsed.preferences ? parsed.preferences : null;
  } catch (_error) {
    return null;
  }
}

function isTrackingAllowed() {
  var consent = getStoredConsent();
  if (!consent) return false;
  return Boolean(consent.analytics || consent.marketing);
}

function loadGoogleTagScript() {
  if (document.getElementById('google-tag-js')) {
    return;
  }
  var script = document.createElement('script');
  script.id = 'google-tag-js';
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=GT-WBTNPQ2P';
  document.head.appendChild(script);
}

window.gtag('js', new Date());
window.gtag('config', 'GT-WBTNPQ2P', { send_page_view: false });
window.gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
});

if (isTrackingAllowed()) {
  window.gtag('consent', 'update', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
  });
  loadGoogleTagScript();
}

window.addEventListener('lecyberassureur:cookie-consent-updated', function (event) {
  var detail = event && event.detail ? event.detail : null;
  var preferences = detail && detail.preferences ? detail.preferences : null;
  var granted = Boolean(preferences && (preferences.analytics || preferences.marketing));
  window.gtag('consent', 'update', {
    ad_storage: granted ? 'granted' : 'denied',
    ad_user_data: granted ? 'granted' : 'denied',
    ad_personalization: granted ? 'granted' : 'denied',
    analytics_storage: granted ? 'granted' : 'denied',
  });
  if (granted) {
    loadGoogleTagScript();
  }
});
