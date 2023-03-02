function addGoogleAnalytics () {
  // Global site tag (gtag.js) - Google Analytics
  const gtagSource = `https://www.googletagmanager.com/gtag/js?id=${window.googleAnalyticsId}`
  const globalScript = document.createElement('script')
  globalScript.async = true
  globalScript.setAttribute('src', gtagSource)
  document.head.appendChild(globalScript)

  window.dataLayer = window.dataLayer || []
  window.gtag = function () {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', window.googleAnalyticsId)
}

export { addGoogleAnalytics }
