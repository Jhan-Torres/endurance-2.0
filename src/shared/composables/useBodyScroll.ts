import { ref } from "vue";

// Global state to track all scroll-blocking components
const scrollBlockers = ref(new Set<string>());

// Store the original body scroll position
let originalScrollPosition = 0;

// Function to get the current scrollbar width
const getScrollbarWidth = (): number => {
  if (typeof window === "undefined") return 0;

  const scrollDiv = document.createElement("div");
  scrollDiv.style.cssText =
    "width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px;";
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

// Function to manage body scroll based on active blockers
const updateBodyScroll = () => {
  if (typeof document !== "undefined") {
    if (scrollBlockers.value.size > 0) {
      // Store current scroll position
      originalScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;

      // Get scrollbar width to prevent layout shift
      const scrollbarWidth = getScrollbarWidth();

      // Apply scroll prevention styles
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${originalScrollPosition}px`;
      document.body.style.width = "100%";

      // Prevent layout shift by adding padding for scrollbar width
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      // Restore scroll and remove styles
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";

      // Restore scroll position
      if (originalScrollPosition > 0) {
        window.scrollTo(0, originalScrollPosition);
        originalScrollPosition = 0;
      }
    }
  }
};

export function useBodyScroll() {
  const addScrollBlocker = (blockerId: string) => {
    scrollBlockers.value.add(blockerId);
    updateBodyScroll();
  };

  const removeScrollBlocker = (blockerId: string) => {
    scrollBlockers.value.delete(blockerId);
    updateBodyScroll();
  };

  const hasActiveBlockers = () => {
    return scrollBlockers.value.size > 0;
  };

  return {
    addScrollBlocker,
    removeScrollBlocker,
    hasActiveBlockers,
  };
}
