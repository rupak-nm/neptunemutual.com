function addClarityAnalytics () {
  window.clarity =
    window.clarity ||
    function () {
      (window.clarity.q = window.clarity.q || []).push(arguments)
    }

  const element = document.createElement('script')
  element.async = 1
  element.src = 'https://www.clarity.ms/tag/' + window.clarityTrackingCode

  const firstScript = document.getElementsByTagName('script')[0]
  firstScript.parentNode.insertBefore(element, firstScript)
}

export { addClarityAnalytics }
