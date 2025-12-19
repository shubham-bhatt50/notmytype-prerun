"use client";

import { useState } from "react";
import { FontPairing } from "@/types/pairing";
import { Card } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import {
  generateCSS,
  generateGoogleFontsLink,
  copyToClipboard,
} from "@/lib/export/cssExporter";
import { generateFigmaJSON } from "@/lib/export/figmaExporter";
import { captureScreenshot } from "@/lib/export/screenshot";
import { savePairing } from "@/lib/storage/localStorage";

interface ExportPanelProps {
  pairing: FontPairing;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ pairing }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string, type: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const handleExportCSS = async () => {
    const css = generateCSS(pairing);
    await handleCopy(css, "css");
  };

  const handleExportFigma = async () => {
    const json = generateFigmaJSON(pairing);
    await handleCopy(json, "figma");
  };

  const handleExportGoogleFonts = async () => {
    const link = generateGoogleFontsLink(pairing);
    await handleCopy(link, "google");
  };

  const handleScreenshot = async () => {
    const element = document.getElementById("component-preview");
    if (element) {
      try {
        await captureScreenshot(
          element,
          `${pairing.primary.family}-${pairing.secondary.family}.png`
        );
      } catch (error) {
        console.error("Error capturing screenshot:", error);
        alert("Failed to capture screenshot. Please try again.");
      }
    }
  };

  const handleSave = () => {
    try {
      const id = savePairing(pairing);
      alert("Pairing saved successfully!");
    } catch (error) {
      console.error("Error saving pairing:", error);
      alert("Failed to save pairing. Please try again.");
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Export & save</h2>
      
      <div className="space-y-3">
        <Button
          variant="secondary"
          className="w-full"
          onClick={handleExportCSS}
        >
          {copied === "css" ? "✓ Copied!" : "Copy CSS"}
        </Button>
        
        <Button
          variant="secondary"
          className="w-full"
          onClick={handleExportFigma}
        >
          {copied === "figma" ? "✓ Copied!" : "Copy Figma JSON"}
        </Button>
        
        <Button
          variant="secondary"
          className="w-full"
          onClick={handleExportGoogleFonts}
        >
          {copied === "google" ? "✓ Copied!" : "Copy Google Fonts link"}
        </Button>
        
        <Button
          variant="secondary"
          className="w-full"
          onClick={handleScreenshot}
        >
          Download screenshot
        </Button>
        
        <Button
          className="w-full"
          onClick={handleSave}
        >
          Save pairing
        </Button>
      </div>
    </Card>
  );
};

