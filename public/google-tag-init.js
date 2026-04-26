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

window.gtag('js', new Date());
window.gtag('config', 'GT-WBTNPQ2P', { send_page_view: false });
