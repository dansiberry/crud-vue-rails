export function loadScript(src) {
  const position = window.document.getElementsByTagName("script")[0];
  const script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  if (position) {
    position.parentNode.insertBefore(script, position);
  }
}

