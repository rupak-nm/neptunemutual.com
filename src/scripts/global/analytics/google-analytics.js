function addGoogleAnalytics () {
  const ID = 'ga-script'

  if (document.getElementById(ID)) {
    return
  }

  // Global site tag (gtag.js) - Google Analytics
  const gtagSource = `https://www.googletagmanager.com/gtag/js?id=${window.googleAnalyticsId}`
  const globalScript = document.createElement('script')
  globalScript.async = true
  globalScript.setAttribute('src', gtagSource)
  document.head.appendChild(globalScript)

  const googleAnalyticsScriptText = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      
      gtag('config', '${window.googleAnalyticsId}');
      `
  const script = document.createElement('script')
  script.id = ID
  script.textContent = googleAnalyticsScriptText
  document.head.appendChild(script)
}

export { addGoogleAnalytics }
