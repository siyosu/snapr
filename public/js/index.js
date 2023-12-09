const searchForm = document.querySelector("#searchForm");
const targetUrl = document.querySelector("#targetUrl");
const pasteClipboard = document.querySelector("#pasteClipboard");
const searchBtn = document.querySelector("#searchBtn");

const pattern = {
  url: /^(https?:\/\/)?(www\.)?tiktok\.com\/@([\w.]+)\/video\/(\d+)/,
  short: /^(https?:\/\/)?(vt|vm)\.tiktok\.com\/[\w-]+\/?$/,
};

function isValidTargetURL() {
  const parent = targetUrl.parentElement;
  if (
    !pattern.url.test(targetUrl.value) &&
    !pattern.short.test(targetUrl.value)
  ) {
    parent.classList.add("invalid");
    return false;
  } else {
    parent.classList.remove("invalid");
    return true;
  }
}

/**
 * Validate target URL before submitting the form
 */
async function handleSearchForm(e) {
  e.preventDefault();

  searchBtn.disabled = true;
  searchBtn.innerText = "Loading...";
  NProgress.start({ showSpinner: false });

  if (!isValidTargetURL()) {
    NProgress.done();
    searchBtn.innerText = "Submit";
    searchBtn.disabled = false;
    return console.warn("Target URL must be a valid TikTok video URL");
  }

  searchForm.submit();
}

/**
 * Show alert if clipboard read permission is denied
 */
async function handlePasteClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    targetUrl.value = text;
  } catch (error) {
    if (error.name === "NotAllowedError") {
      console.warn(
        "Failed to paste clipboard to the target URL. Allow read permission for the clipboard to enable pasting URLs directly from your clipboard.",
      );
      alert(
        "Allow read permission for the clipboard to enable pasting URLs directly from your clipboard.",
      );
    }
  }
}

pasteClipboard.addEventListener("click", handlePasteClipboard);
searchForm.addEventListener("submit", handleSearchForm);
