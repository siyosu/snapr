NProgress.start({ showSpinner: false });
window.addEventListener("DOMContentLoaded", () => NProgress.done());

const downloadBtns = document.querySelectorAll("button[data-download='1']");

/**
 * Create blob url for downloading the file
 */
async function handleDownload(e) {
  NProgress.start({ showSpinner: false });
  const originalText = e.target.innerText;
  e.target.disabled = true;
  e.target.innerText = "Loading...";

  const filename = e.target.parentElement.dataset.filename;
  const { type, source } = e.target.dataset;

  const res = await fetch(source);
  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = blobUrl;
  downloadLink.download = `${filename}.${type}`;
  downloadLink.target = "_blank";
  downloadLink.rel = "noopener noreferrer";
  downloadLink.click();

  URL.revokeObjectURL(blobUrl);
  NProgress.done();
  e.target.disabled = false;
  e.target.innerText = originalText;
}

downloadBtns.forEach((el) => {
  el.addEventListener("click", handleDownload);
});
