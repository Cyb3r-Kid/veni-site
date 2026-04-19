const FALLBACK_NAVBAR_HEIGHT = 88;
const ROOT_SCROLL_OFFSET_CSS_VAR = "--navbar-scroll-offset";

export function getNavbarScrollOffset() {
  const navbar = document.querySelector("header");
  const navbarHeight = navbar?.offsetHeight || FALLBACK_NAVBAR_HEIGHT;
  return Math.ceil(navbarHeight);
}

export function syncNavbarScrollOffsetVar() {
  const offset = getNavbarScrollOffset();
  document.documentElement.style.setProperty(ROOT_SCROLL_OFFSET_CSS_VAR, `${offset}px`);
  return offset;
}

export function scrollToSectionId(id, options = {}) {
  const el = document.getElementById(id);
  if (!el) return false;

  const { behavior = "smooth", updateHash = false } = options;
  const offset = syncNavbarScrollOffsetVar();
  const y = el.offsetTop - offset;

  window.scrollTo({
    top: Math.max(Math.round(y), 0),
    behavior,
  });

  if (updateHash) {
    window.history.replaceState(null, "", `#${id}`);
  }

  return true;
}
