import html2canvas from "html2canvas";

export async function captureScreenshot(
  element: HTMLElement,
  filename: string = "pairing-preview.png"
): Promise<void> {
  if (typeof window === "undefined") {
    throw new Error("Screenshot capture is only available in the browser");
  }

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
      logging: false,
    });

    canvas.toBlob((blob) => {
      if (!blob) {
        console.error("Failed to create blob from canvas");
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, "image/png");
  } catch (error) {
    console.error("Error capturing screenshot:", error);
    throw error;
  }
}

export async function captureScreenshotAsDataURL(
  element: HTMLElement
): Promise<string> {
  if (typeof window === "undefined") {
    throw new Error("Screenshot capture is only available in the browser");
  }

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
      logging: false,
    });

    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Error capturing screenshot:", error);
    throw error;
  }
}

