function addClarityAnalytics () {
  const ID = 'ms-clarity'

  if (document.getElementById(ID)) {
    return
  }

  const script = document.createElement('script')
  script.id = ID
  script.textContent = `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${window.clarityTrackingCode}");
          `
  document.head.appendChild(script)
}

export { addClarityAnalytics }
