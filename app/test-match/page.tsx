"use client";

import { useEffect, useState } from "react";

const PHOTOS = [
  { src: "/memories/IMG_20220107_083025.jpg" },
  { src: "/memories/IMG_20220212_130205.jpg" },
  { src: "/memories/IMG_20220213_173142.jpg" },
  { src: "/memories/IMG_20220322_102020.jpg" },
  { src: "/memories/IMG_20220507_183401.jpg" },
  { src: "/memories/IMG-20220508-WA0004.jpg" },
  { src: "/memories/IMG_20220522_161405.jpg" },
  { src: "/memories/IMG_20220621_071552.jpg" },
  { src: "/memories/IMG_20220910_110720.jpg" },
  { src: "/memories/IMG_20220910_125535.jpg" },
  { src: "/memories/IMG_20230101_193956.jpg" },
  { src: "/memories/IMG_20230101_220840.jpg" },
  { src: "/memories/IMG_20230101_221142.jpg" },
  { src: "/memories/IMG-20230111-WA0000.jpg" },
  { src: "/memories/IMG-20230111-WA0002.jpg" },
  { src: "/memories/IMG_20230112_021922.jpg" },
  { src: "/memories/1673677401224.jpg" },
  { src: "/memories/IMG20230206190623.jpg" },
  { src: "/memories/IMG_20230528_212301.jpg" },
  { src: "/memories/20240420_102500.jpg" },
  { src: "/memories/IMG-20240607-WA0001.jpg" },
  { src: "/memories/IMG-20240621-WA0000.jpg" },
  { src: "/memories/IMG-20250618-WA0062.jpg" },
  { src: "/memories/IMG-20250618-WA0066.jpg" },
  { src: "/memories/IMG-20250621-WA0013.jpg" },
  { src: "/memories/20250622_133033.jpg" },
  { src: "/memories/20250622_133136.jpg" },
  { src: "/memories/IMG-20250627-WA0007.jpg" },
  { src: "/memories/20260130_180954.jpg" },
  { src: "/memories/20260130_181128.jpg" },
  { src: "/memories/20260130_183626.jpg" },
  { src: "/memories/IMG-20260617-WA0028.jpg" },
  { src: "/memories/IMG-20260617-WA0038.jpg" },
  { src: "/memories/IMG-20260617-WA0040.jpg" },
  { src: "/memories/IMG-20260617-WA0041.jpg" },
  { src: "/memories/IMG-20260617-WA0042.jpg" },
  { src: "/memories/IMG-20260617-WA0045.jpg" },
  { src: "/memories/IMG-20260617-WA0047.jpg" },
  { src: "/memories/IMG-20260617-WA0048.jpg" },
  { src: "/memories/IMG-20260617-WA0053.jpg" },
  { src: "/memories/IMG-20260617-WA0058.jpg" },
  { src: "/memories/IMG-20260617-WA0059.jpg" },
  { src: "/memories/IMG-20260617-WA0079.jpg" },
  { src: "/memories/IMG-20260617-WA0080.jpg" },
  { src: "/memories/IMG-20260617-WA0091.jpg" },
  { src: "/memories/IMG-20260617-WA0110.jpg" },
  { src: "/memories/IMG-20260617-WA0083.jpg" },
  { src: "/memories/IMG-20260617-WA0117.jpg" },
  { src: "/memories/IMG-20260617-WA0118.jpg" },
  { src: "/memories/IMG-20260617-WA0119.jpg" },
  { src: "/memories/IMG-20260617-WA0123.jpg" },
  { src: "/memories/IMG-20260617-WA0124.jpg" },
  { src: "/memories/IMG-20260617-WA0126.jpg" },
  { src: "/memories/IMG-20260617-WA0128.jpg" },
  { src: "/memories/IMG-20260617-WA0129.jpg" },
  { src: "/memories/IMG-20260617-WA0132.jpg" },
  { src: "/memories/IMG-20260617-WA0133.jpg" },
  { src: "/memories/IMG-20260617-WA0134.jpg" },
  { src: "/memories/IMG-20260617-WA0137.jpg" },
  { src: "/memories/IMG-20260617-WA0140.jpg" },
  { src: "/memories/Snapchat-455078384.jpg" },
  { src: "/memories/Snapchat-975440327.jpg" },
  { src: "/memories/Snapchat-1097432148.jpg" },
  { src: "/memories/Snapchat-1122041948.jpg" },
  { src: "/memories/Snapchat-1188155373.jpg" },
  { src: "/memories/Snapchat-1247490697.jpg" },
  { src: "/memories/Snapchat-1283170225.jpg" },
  { src: "/memories/Snapchat-1347954760.jpg" },
  { src: "/memories/Snapchat-1409590062.jpg" },
  { src: "/memories/Snapchat-1446793115.jpg" },
  { src: "/memories/Snapchat-1574996607.jpg" },
  { src: "/memories/Snapchat-1631693345.jpg" },
  { src: "/memories/Snapchat-1869237872.jpg" },
  { src: "/memories/Snapchat-2053590504.jpg" },
  { src: "/memories/Snapchat-449493768.jpg" },
  { src: "/memories/Snapchat-1055063894.jpg" },
  { src: "/memories/Snapchat-1236337143.jpg" },
  { src: "/memories/Snapchat-1789162401.jpg" },
  { src: "/memories/Snapchat-2063799788.jpg" },
  { src: "/memories/Snapchat-449176994.jpg" },
  { src: "/memories/Snapchat-949043994.jpg" },
  { src: "/memories/Snapchat-1057999748.jpg" },
  { src: "/memories/Snapchat-1090017155.jpg" },
  { src: "/memories/Snapchat-155971222.jpg" },
  { src: "/memories/Snapchat-1660830563.jpg" },
  { src: "/memories/Snapchat-28277139.jpg" },
  { src: "/memories/Snapchat-334073779.jpg" },
  { src: "/memories/Snapchat-40044068.jpg" },
  { src: "/memories/Snapchat-435576377.jpg" },
  { src: "/memories/Snapchat-635920717.jpg" },
  { src: "/memories/Snapchat-760031593.jpg" },
  { src: "/memories/IMG_1241.JPG" },
  { src: "/memories/thalu.jpg" },
  { src: "/memories/Snapchat-52340674.jpg" },
  { src: "/memories/Snapchat-146783548.jpg" },
];

export default function TestMatch() {
  const [result, setResult] = useState<string>("Running comparison...");

  useEffect(() => {
    async function run() {
      // 1. Load screenshot
      const screenshotImg = new Image();
      screenshotImg.src = "/media__1781895574082.png";
      await new Promise((resolve) => {
        screenshotImg.onload = resolve;
      });

      // Get screenshot pixels
      const canvas1 = document.createElement("canvas");
      canvas1.width = 32;
      canvas1.height = 32;
      const ctx1 = canvas1.getContext("2d");
      if (!ctx1) return;
      // We crop slightly to ignore screenshot black or white bars if any, but since it's just the photo, we map full
      ctx1.drawImage(screenshotImg, 0, 0, 32, 32);
      const screenshotData = ctx1.getImageData(0, 0, 32, 32).data;

      let bestFile = "";
      let minDiff = Infinity;

      const resultsList: { src: string; diff: number }[] = [];

      for (const photo of PHOTOS) {
        try {
          const img = new Image();
          img.src = photo.src;
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });

          const canvas2 = document.createElement("canvas");
          canvas2.width = 32;
          canvas2.height = 32;
          const ctx2 = canvas2.getContext("2d");
          if (!ctx2) continue;
          ctx2.drawImage(img, 0, 0, 32, 32);
          const imgData = ctx2.getImageData(0, 0, 32, 32).data;

          // Compute MSE of RGB values
          let diff = 0;
          for (let i = 0; i < imgData.length; i += 4) {
            diff += Math.pow(screenshotData[i] - imgData[i], 2);
            diff += Math.pow(screenshotData[i + 1] - imgData[i + 1], 2);
            diff += Math.pow(screenshotData[i + 2] - imgData[i + 2], 2);
          }

          resultsList.push({ src: photo.src, diff });

          if (diff < minDiff) {
            minDiff = diff;
            bestFile = photo.src;
          }
        } catch (e) {
          // Ignore missing files or load errors
        }
      }

      resultsList.sort((a, b) => a.diff - b.diff);
      setResult(`Best match: ${bestFile} with diff ${minDiff}. Top 3: ` + resultsList.slice(0, 5).map(r => `${r.src} (${Math.round(r.diff)})`).join(", "));
    }

    run();
  }, []);

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif", background: "#fff", color: "#000" }}>
      <h1>Visual Similarity Matcher</h1>
      <p id="match-result" style={{ fontSize: 24, fontWeight: "bold" }}>{result}</p>
    </div>
  );
}
