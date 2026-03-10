export default function forceScrollToTop() {
  const { body, documentElement } = document;
  const previousHtmlScrollBehavior = documentElement.style.scrollBehavior;
  const previousBodyScrollBehavior = body.style.scrollBehavior;

  const scrollToOrigin = () => {
    documentElement.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    documentElement.scrollTop = 0;
    body.scrollTop = 0;
  };

  scrollToOrigin();

  window.requestAnimationFrame(() => {
    scrollToOrigin();
    documentElement.style.scrollBehavior = previousHtmlScrollBehavior;
    body.style.scrollBehavior = previousBodyScrollBehavior;
  });
}
