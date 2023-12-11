NProgress.start({ showSpinner: false });
window.addEventListener("DOMContentLoaded", () => NProgress.done());

const downloadBtns = document.querySelectorAll("button[data-download='1']");
const contentType = document.body.dataset.type;

async function getZipBlob(filename) {
  const zip = new JSZip();
  const fetchImages = Array.from(
    document.querySelectorAll("#slideshowWrapper img"),
  ).map(async (el, i) => {
    try {
      const res = await fetch(el.src);
      if (!res.ok) {
        throw new Error(`Failed to fetch image ${i}: ${res.statusText}`);
      }
      const blob = await res.blob();
      zip.file(`${filename}_${i + 1}.webp`, blob);
    } catch (error) {
      console.error(error.message);
    }
  });

  await Promise.allSettled(fetchImages);
  const blob = await zip.generateAsync({ type: "blob" });
  return blob;
}

/**
 * Create blob url for downloading the file
 */
async function handleDownload(e) {
  NProgress.start({ showSpinner: false });
  const originalText = e.target.innerText;
  e.target.disabled = true;
  e.target.setAttribute("aria-disabled", true);
  e.target.innerText = "Loading...";

  const filename = e.target.parentElement.dataset.filename;
  const { type, source } = e.target.dataset;

  let blobUrl;

  if (type === "zip") {
    const blob = await getZipBlob(filename);
    blobUrl = URL.createObjectURL(blob);
  } else {
    const res = await fetch(source);
    const blob = await res.blob();
    blobUrl = URL.createObjectURL(blob);
  }

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

if (contentType === "slideshow") {
  const nextImage = document.querySelector('[data-slideshow-nav="next"]');
  const prevImage = document.querySelector('[data-slideshow-nav="prev"]');

  const slideshowWrapper = document.querySelector("#slideshowWrapper");
  const slideshowImages = Array.from(slideshowWrapper.children);
  const width = slideshowWrapper.clientWidth;

  const currentImage = () => parseInt(slideshowWrapper.dataset.image);
  const currentTranslate = () =>
    parseInt(slideshowWrapper.style.translate.replace("px", "")) || 0;
  const checkCurrentImage = () => {
    if (currentImage() >= slideshowImages.length) {
      nextImage.style.display = "none";
    } else if (currentImage() === 1) {
      prevImage.style.display = "none";
    } else {
      nextImage.style.display = "inline";
      prevImage.style.display = "inline";
    }
  };

  checkCurrentImage();

  nextImage.addEventListener("click", () => {
    slideshowWrapper.style.translate = currentTranslate() - width + "px";
    slideshowWrapper.dataset.image = currentImage() + 1;
    checkCurrentImage();
  });
  prevImage.addEventListener("click", () => {
    slideshowWrapper.style.translate = currentTranslate() + width + "px";
    slideshowWrapper.dataset.image = currentImage() - 1;
    checkCurrentImage();
  });
}
