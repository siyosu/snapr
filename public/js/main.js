const pasteClipboard = document.querySelector("#pasteClipboard");
const targetUrl = document.querySelector("#targetUrl");

pasteClipboard.addEventListener("click", async () => {
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
});
