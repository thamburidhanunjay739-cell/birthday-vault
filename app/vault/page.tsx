"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

/* ─── DATA ──────────────────────────────────────────────────────────────── */
const FRIEND_NAME = "Thalu";
const BIRTHDAY    = "JUN 21, 2001";  // Thalu's date of birth
// Exact birth moment: June 21 2001, 11:00 AM IST (IST = UTC+5:30)
const BIRTH_MS    = new Date("2001-06-21T05:30:00Z").getTime();
// Birth time components in UTC (used to compute future birthdays)
const BIRTH_UTC   = new Date(BIRTH_MS);

const BG   = "#FFFBEB";  // cream
const INK  = "#0a0a0a";  // deep black
const GOLD = "#c9a84c";  // warm gold accent

const PHOTOS = [
  { src: "/memories/20240420_102500.jpg", caption: "Lab Chronicles", date: "Apr 2024", tag: "2024", width: 4000, height: 2252 },
  { src: "/memories/IMG_20220107_083025.jpg", caption: "Shared Memories", date: "Jan 2022", tag: "2022", width: 4608, height: 3456 },
  { src: "/memories/IMG_20230101_221142.jpg", caption: "One for the Vault", date: "Jan 2023", tag: "2023", width: 4608, height: 3456 },
  { src: "/memories/IMG_20220322_102020.jpg", caption: "Lab Chronicles", date: "Mar 2022", tag: "2022", width: 4000, height: 1800 },
  { src: "/memories/Snapchat-2063799788.jpg", caption: "Simply Us", date: "Jun 2026", tag: "2026", width: 640, height: 1344 },
  { src: "/memories/IMG_20220212_130205.jpg", caption: "A Frame in Time", date: "Feb 2022", tag: "2022", width: 1914, height: 2258 },
  { src: "/memories/IMG_20220507_183401.jpg", caption: "Sleepless and Smiling", date: "May 2022", tag: "2022", width: 4608, height: 3456 },
  { src: "/memories/IMG-20220508-WA0004.jpg", caption: "Sleepless and Smiling", date: "May 2022", tag: "2022", width: 418, height: 528 },
  { src: "/memories/IMG_20220522_161405.jpg", caption: "Finding Our Rhythm", date: "May 2022", tag: "2022", width: 1080, height: 1440 },
  { src: "/memories/IMG_20220910_110720.jpg", caption: "Still Going Strong", date: "Sep 2022", tag: "2022", width: 4608, height: 3456 },
  { src: "/memories/IMG_20220910_125535.jpg", caption: "Golden Hour Vibes", date: "Sep 2022", tag: "2022", width: 4608, height: 3456 },
  { src: "/memories/IMG_20230101_193956.jpg", caption: "Summer Vibrations", date: "Jan 2023", tag: "2023", width: 4608, height: 3456 },
  { src: "/memories/IMG_20230101_220840.jpg", caption: "Sleepless and Smiling", date: "Jan 2023", tag: "2023", width: 3000, height: 3000 },
  { src: "/memories/IMG-20230111-WA0002.jpg", caption: "The Candid Ones", date: "Jan 2023", tag: "2023", width: 1164, height: 876 },
  { src: "/memories/IMG_20230112_021922.jpg", caption: "Special Chapter", date: "Jan 2023", tag: "2023", width: 4618, height: 3464 },
  { src: "/memories/1673677401224.jpg", caption: "Unforgettable Days", date: "Jan 2023", tag: "2023", width: 531, height: 1194 },
  { src: "/memories/IMG20230206190623.jpg", caption: "Another Beautiful Day", date: "Feb 2023", tag: "2023", width: 1840, height: 4096 },
  { src: "/memories/IMG_20230528_212301.jpg", caption: "Simply Us", date: "May 2023", tag: "2023", width: 4608, height: 3456 },
  { src: "/memories/IMG-20240607-WA0001.jpg", caption: "Us Against the World", date: "Jun 2024", tag: "2024", width: 3000, height: 4000 },
  { src: "/memories/IMG-20240621-WA0000.jpg", caption: "Golden Hour Vibes", date: "Jun 2024", tag: "2024", width: 640, height: 1344 },
  { src: "/memories/IMG-20250618-WA0062.jpg", caption: "Summer Vibrations", date: "Jun 2025", tag: "2025", width: 701, height: 1247 },
    { src: "/memories/IMG_20220213_173142.jpg", caption: "Another Beautiful Day", date: "Feb 2022", tag: "2022", width: 4608, height: 3456 },
  { src: "/memories/IMG-20250618-WA0066.jpg", caption: "The Candid Ones", date: "Jun 2025", tag: "2025", width: 720, height: 1280 },
  { src: "/memories/IMG-20250621-WA0013.jpg", caption: "Chasing Dreams", date: "Jun 2025", tag: "2025", width: 2121, height: 3029 },
  { src: "/memories/20250622_133033.jpg", caption: "Summer Vibrations", date: "Jun 2025", tag: "2025", width: 4000, height: 2252 },
  { src: "/memories/20250622_133136.jpg", caption: "The Candid Ones", date: "Jun 2025", tag: "2025", width: 4000, height: 2252 },
  { src: "/memories/IMG-20250627-WA0007.jpg", caption: "Captured Moment", date: "Jun 2025", tag: "2025", width: 4000, height: 2252 },
  { src: "/memories/20260130_180954.jpg", caption: "Laughter and Stories", date: "Jan 2026", tag: "2026", width: 4000, height: 2252 },
  { src: "/memories/20260130_181128.jpg", caption: "Unforgettable Days", date: "Jan 2026", tag: "2026", width: 4000, height: 2252 },
  { src: "/memories/20260130_183626.jpg", caption: "A Frame in Time", date: "Jan 2026", tag: "2026", width: 3192, height: 1838 },
  { src: "/memories/IMG-20260617-WA0028.jpg", caption: "Side by Side", date: "Jun 2026", tag: "2026", width: 685, height: 640 },
  { src: "/memories/IMG-20260617-WA0038.jpg", caption: "One for the Vault", date: "Jun 2026", tag: "2026", width: 640, height: 1344 },
  { src: "/memories/IMG-20260617-WA0040.jpg", caption: "The Candid Ones", date: "Jun 2026", tag: "2026", width: 640, height: 1344 },
  { src: "/memories/IMG-20260617-WA0041.jpg", caption: "Special Chapter", date: "Jun 2026", tag: "2026", width: 899, height: 1599 },
  { src: "/memories/IMG-20260617-WA0042.jpg", caption: "Chasing Dreams", date: "Jun 2026", tag: "2026", width: 640, height: 1344 },
  { src: "/memories/IMG-20260617-WA0045.jpg", caption: "Unforgettable Days", date: "Jun 2026", tag: "2026", width: 640, height: 1344 },
  { src: "/memories/IMG-20260617-WA0119.jpg", caption: "One for the Vault", date: "Jun 2026", tag: "2026", width: 1200, height: 1599 },
  { src: "/memories/IMG-20260617-WA0047.jpg", caption: "Simply Us", date: "Jun 2026", tag: "2026", width: 652, height: 1369 },
  { src: "/memories/IMG-20260617-WA0048.jpg", caption: "Shared Memories", date: "Jun 2026", tag: "2026", width: 510, height: 907 },
  { src: "/memories/IMG-20260617-WA0053.jpg", caption: "Another Beautiful Day", date: "Jun 2026", tag: "2026", width: 720, height: 1280 },
  { src: "/memories/IMG-20260617-WA0058.jpg", caption: "Still Going Strong", date: "Jun 2026", tag: "2026", width: 720, height: 1280 },
  { src: "/memories/IMG-20260617-WA0059.jpg", caption: "The Candid Ones", date: "Jun 2026", tag: "2026", width: 720, height: 1280 },
  { src: "/memories/IMG-20260617-WA0123.jpg", caption: "Chasing Dreams", date: "Jun 2026", tag: "2026", width: 1200, height: 1600 },
  { src: "/memories/IMG-20260617-WA0110.jpg", caption: "Shared Memories", date: "Jun 2026", tag: "2026", width: 1200, height: 1599 },
  { src: "/memories/IMG-20260617-WA0118.jpg", caption: "Summer Vibrations", date: "Jun 2026", tag: "2026", width: 720, height: 1280 },
  { src: "/memories/IMG-20260617-WA0133.jpg", caption: "Captured Moment", date: "Jun 2026", tag: "2026", width: 413, height: 904 },
  { src: "/memories/IMG-20260617-WA0079.jpg", caption: "Chasing Dreams", date: "Jun 2026", tag: "2026", width: 1350, height: 1986 },
  { src: "/memories/IMG-20260617-WA0080.jpg", caption: "Lab Chronicles", date: "Jun 2026", tag: "2026", width: 1840, height: 4096 },
  { src: "/memories/IMG-20260617-WA0091.jpg", caption: "Summer Vibrations", date: "Jun 2026", tag: "2026", width: 4160, height: 3119 },
  { src: "/memories/IMG-20260617-WA0124.jpg", caption: "Sleepless and Smiling", date: "Jun 2026", tag: "2026", width: 1200, height: 1600 },
  { src: "/memories/IMG-20260617-WA0126.jpg", caption: "Unforgettable Days", date: "Jun 2026", tag: "2026", width: 1200, height: 1600 },
  { src: "/memories/IMG-20260617-WA0128.jpg", caption: "Simply Us", date: "Jun 2026", tag: "2026", width: 652, height: 1369 },
  { src: "/memories/IMG-20260617-WA0129.jpg", caption: "Shared Memories", date: "Jun 2026", tag: "2026", width: 1200, height: 1600 },
  { src: "/memories/IMG-20260617-WA0132.jpg", caption: "Finding Our Rhythm", date: "Jun 2026", tag: "2026", width: 720, height: 1280 },
  { src: "/memories/IMG-20260617-WA0134.jpg", caption: "Another Beautiful Day", date: "Jun 2026", tag: "2026", width: 722, height: 1599 },
  { src: "/memories/IMG-20260617-WA0137.jpg", caption: "One for the Vault", date: "Jun 2026", tag: "2026", width: 1200, height: 1600 },
  { src: "/memories/IMG-20260617-WA0140.jpg", caption: "Special Chapter", date: "Jun 2026", tag: "2026", width: 900, height: 1600 },
  { src: "/memories/Snapchat-455078384.jpg", caption: "Summer Vibrations", date: "Jun 2026", tag: "2026", width: 640, height: 1344 },
  { src: "/memories/Snapchat-975440327.jpg", caption: "Captured Moment", date: "Jun 2026", tag: "2026", width: 652, height: 1369 },
  { src: "/memories/Snapchat-1097432148.jpg", caption: "Sleepless and Smiling", date: "Jun 2026", tag: "2026", width: 640, height: 1344 },
  { src: "/memories/Snapchat-1122041948.jpg", caption: "Chasing Dreams", date: "Jun 2026", tag: "2026", width: 652, height: 1369 },
  { src: "/memories/Snapchat-1188155373.jpg", caption: "Another Beautiful Day", date: "Jun 2026", tag: "2026", width: 652, height: 1369 },
  { src: "/memories/Snapchat-1247490697.jpg", caption: "Captured Moment", date: "Jun 2026", tag: "2026", width: 652, height: 1369 },
  { src: "/memories/Snapchat-1283170225.jpg", caption: "Still Going Strong", date: "Jun 2026", tag: "2026", width: 640, height: 1344 },
  { src: "/memories/Snapchat-1347954760.jpg", caption: "Side by Side", date: "Jun 2026", tag: "2026", width: 652, height: 1369 },
  { src: "/memories/Snapchat-1409590062.jpg", caption: "Shared Memories", date: "Jun 2026", tag: "2026", width: 652, height: 1369 },
  { src: "/memories/Snapchat-1446793115.jpg", caption: "Captured Moment", date: "Jun 2026", tag: "2026", width: 640, height: 1344 },
  { src: "/memories/Snapchat-1574996607.jpg", caption: "Lab Chronicles", date: "Jun 2026", tag: "2026", width: 640, height: 1344 },
  { src: "/memories/Snapchat-1631693345.jpg", caption: "Sleepless and Smiling", date: "Jun 2026", tag: "2026", width: 652, height: 1369 },
  { src: "/memories/Snapchat-1869237872.jpg", caption: "Simply Us", date: "Jun 2026", tag: "2026", width: 640, height: 1344 },
  { src: "/memories/Snapchat-2053590504.jpg", caption: "Captured Moment", date: "Jun 2026", tag: "2026", width: 640, height: 1344 },
  { src: "/memories/Snapchat-449493768.jpg", caption: "Lab Chronicles", date: "Jun 2026", tag: "2026", width: 640, height: 1344 },
  { src: "/memories/Snapchat-1055063894.jpg", caption: "Golden Hour Vibes", date: "Jun 2026", tag: "2026", width: 720, height: 1280 },
  { src: "/memories/Snapchat-1236337143.jpg", caption: "Captured Moment", date: "Jun 2026", tag: "2026", width: 720, height: 1280 },
  { src: "/memories/Snapchat-1789162401.jpg", caption: "Still Going Strong", date: "Jun 2026", tag: "2026", width: 640, height: 1344 },
  { src: "/memories/Snapchat-449176994.jpg", caption: "Frozen in Time", date: "Jun 2026", tag: "2026", width: 640, height: 1344 },
  { src: "/memories/Snapchat-949043994.jpg", caption: "Special Chapter", date: "Jun 2026", tag: "2026", width: 652, height: 1369 },
  { src: "/memories/Snapchat-1057999748.jpg", caption: "Still Going Strong", date: "Jun 2026", tag: "2026", width: 720, height: 1280 },
  { src: "/memories/Snapchat-1090017155.jpg", caption: "Golden Hour Vibes", date: "Jun 2026", tag: "2026", width: 720, height: 1280 },
  { src: "/memories/Snapchat-155971222.jpg", caption: "Chasing Dreams", date: "Jun 2026", tag: "2026", width: 720, height: 1280 },
  { src: "/memories/Snapchat-1660830563.jpg", caption: "The Candid Ones", date: "Jun 2026", tag: "2026", width: 720, height: 1280 },
  { src: "/memories/Snapchat-28277139.jpg", caption: "Simply Us", date: "Jun 2026", tag: "2026", width: 720, height: 1280 },
  { src: "/memories/Snapchat-334073779.jpg", caption: "Still Going Strong", date: "Jun 2026", tag: "2026", width: 720, height: 1280 },
  { src: "/memories/Snapchat-40044068.jpg", caption: "Us Against the World", date: "Jun 2026", tag: "2026", width: 720, height: 1280 },
  { src: "/memories/Snapchat-435576377.jpg", caption: "Sleepless and Smiling", date: "Jun 2026", tag: "2026", width: 720, height: 1280 },
  { src: "/memories/Snapchat-635920717.jpg", caption: "Chasing Dreams", date: "Jun 2026", tag: "2026", width: 720, height: 1280 },
  { src: "/memories/Snapchat-760031593.jpg", caption: "The Candid Ones", date: "Jun 2026", tag: "2026", width: 720, height: 1280 },
  { src: "/memories/IMG_1241.JPG", caption: "Side by Side", date: "Jun 2026", tag: "2026", width: 1920, height: 1280 },
  { src: "/memories/thalu.jpg", caption: "Laughter and Stories", date: "Jun 2026", tag: "2026", width: 1920, height: 1280 },
  { src: "/memories/Snapchat-52340674.jpg", caption: "Special Chapter", date: "Jun 2026", tag: "2026", width: 571, height: 1028 },
  { src: "/memories/Snapchat-146783548.jpg", caption: "A Frame in Time", date: "Jun 2026", tag: "2026", width: 1512, height: 2688 },
];

const CHAPTERS = [
  { year: "2021", label: "Chapter I",   title: "The Day We Met",      body: "December 30, 2021 — The day we met in our college induction program, as strangers. Neither of us had any idea we were looking at our future best friend." },
  { year: "2022", label: "Chapter II",  title: "Hostel Life Begins", body: "Our 1st year of PharmD began, where a new relationship grew fast and strong. It was the year our hostel life started — and still, I laugh at the way you made your entry into the hostel!" },
  { year: "2023", label: "Chapter III", title: "New Beginnings",       body: "In January 2023, we went to watch our first movie together, Avatar. On March 11, 2023, a special person entered into his life." },
  { year: "2024", label: "Chapter IV",  title: "End of an Era",        body: "The hostel life came to an end — and with it, the daily moments we took for granted. Distance grew between us, yet somehow the connection only deepened. Some goodbyes make you realise how much a chapter truly meant." },
  { year: "2025", label: "Chapter V",   title: "5th Year — Complete",  body: "We did it. Five full years of PharmD, done. This chapter closed quietly — but it carried everything. Every sleepless night finally meant something." },
  { year: "2026", label: "Chapter VI",  title: "Internship — Now",     body: "The 6th year internship begins. The real world, the real work — and still, the same person by my side. This chapter is just getting started." },
];

const LETTER = [
  { text: `Happy Birthday, ${FRIEND_NAME} ❤️`,                                                                                                                                                                       style: "opener"    },
  { text: "I don't think words are enough to tell you how much you mean to me, but I'll still try.",                                                                                                                  style: "normal"    },
  { text: "You have one of the best souls I have ever known, and I always feel lucky to have you in my life.",                                                                                                        style: "normal"    },
  { text: "Your presence gives me strength, and I always try to give my best when you are around. You carry such a positive aura that even the hardest days feel simpler and easier.",                               style: "highlight" },
  { text: "You have helped me in many ways, and I will always be grateful for that support. More than a friend, you have been someone who helps me become the best version of myself.",                              style: "normal"    },
  { text: "I am truly lucky to have you.",                                                                                                                                                                           style: "normal"    },
  { text: "Our 5 years of Pharm.D journey have been nothing less than a rollercoaster, and our hostel life has become one of the most memorable parts of it — filled with joy, fun, lows, highs, and unforgettable moments.", style: "normal" },
  { text: "These memories will always stay close to my heart.",                                                                                                                                                      style: "highlight" },
  { text: "I don't know what the future has planned for us, but I hope that years from now we'll still be talking, laughing about old memories, making new ones, and being there for each other just like we are today.", style: "normal" },
  { text: "Wishing you nothing but happiness, success, peace, and everything beautiful in life. You deserve the very best, today and always.",                                                                        style: "normal"    },
  { text: "— With everything I have 🤝",                                                                                                                                                                             style: "closer"    },
];

const WISHES = [
  { name: "Farnaaz Fathima", message: "Happy birthday, talha❤️ 🥳 May god bless you with lots of happiness and a beautiful life ahead!! Every moment with you is a blessing, and I'm so grateful to share this journey with you! \"You are my safe place, my best friend, and my greatest love!!\" I hope your day is as incredible as you are. ✨💖" },
  { name: "Anunaya", message: "Many more happy returns of the Bhaiya ji! ❤️🥳🥳 Wishing you a very happy and blessed year ahead. You always deserve the best!! Thank you for being much more than just a senior or an elder brother. You have always been a mentor, a guide, and a friend whom I can look up to!!! Your support, advice, and encouragement have meant a lot to me!! 😇❤️ I sincerely wish that all your hard work, dedication, and kindness are rewarded with happiness, success, and good health. May you achieve everything you dream of!!! 😇 Thank you for always being there, Bhaiya Ji! ❤️ Have a wonderful birthday and an amazing year ahead. 🎂✨" },
  { name: "Saleha", message: "Happy Birthday to the brother life gifted me through friendship. From being complete strangers in college to becoming family, our journey has been truly special. I never imagined that one day I would call you my brother, but here we are. Thank you for always being there for me through every phase of my life, guiding me when I was confused, supporting me when I was down, and encouraging me to keep moving forward." },
  { name: "Nabeela", message: "Happy Birthday thalha bhai! 🎉 Allah kare apki zindagi khushiyon, kamyabi aur sehat se bhari rahe. Har naya saal apke liye naye mauke aur achhi yaadein lekar aaye. Ap hamesha isi tarah positive aur mehnati raho, aur jo bhi goals tumne apne liye set kiye hain, woh sab poore hon. Enjoy your day and have a great year ahead. May every challenge turn into an opportunity. Thank you for being such a kind and genuine person 🫂 Happy Birthday once again! 🎂✨" },
  { name: "Manoj (Baby)", message: "అందరినీ కరుణ హృదయంతో అర్థం చేసుకొని క్షమించే గుణం, హాస్య భరితమైన ముఖవర్చస్సు, ఎంత టెన్షన్ లో ఉన్న ఆ ముఖంలో కనిపించే అమాయకత్వం, కోపం చాలా తక్కువ సార్లు చూసి ఉంటా నీ ముఖంలో — ఒక క్లోజస్ట్ పర్సన్ వెల్విషర్ మై ఫ్రెండ్ తలా బేబీ హ్యాపీ బర్త్డే ❤️" },
  { name: "Pavani (Panda)", message: "Happy Birthday to my bestie! 🎉❤️ Thank you for always being there through every laugh, every tear, and every crazy adventure. Life is so much better with a friend like you by my side. Wishing you endless happiness, success, good health, and all the love you deserve. May this year bring you everything you've been dreaming of. Enjoy your special day to the fullest! 🥳🎂" },
  { name: "Hoor Fatima", message: "Happy Birthday Thalha 💫🔥 From sharing classes, assignments and exams to creating unforgettable memories together 🤗 these years of friendship have been truly amazing 🤩 May your birthday be filled with happiness, laughter, and everything you wish for 😇 Wishing you success, good health, and endless joy in life 🥰 Enjoy your day to the fullest and keep shining ✨💫 Happy Birthday once again! ❤️✨" },
  { name: "Syama (Minnie)", message: "Happiest Birthday THALHAAA ❤️ I will miss u moreee from now 🥺 But still u will always have a special place in my heart 🫶 I wish and hope u achieve all ur dreams u dreamt of and reach greatest heights in ur life 🤗 Nannu marchipokuu! Apudu apudu msg chestu undu 😒 nenu kuda msg chesta... and finally u know I always had a special place for u 🫣 I like the way u call me and my name 🫠 With lots and lots of love — ur Minnieee 😚" },
];

const PASSWORD_HASH = "74c167586bc51b1d22145ca6132533f586a7f1f134df27ab48013ac1b8bb0a71";

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

/* ─── CONFETTI ENGINE ──────────────────────────────────────────────────── */

const HEART_PTS: [number, number][] = (() => {
  const pts: [number, number][] = [];
  for (let i = 0; i <= 60; i++) {
    const t = (i / 60) * Math.PI * 2;
    pts.push([
      (16 * Math.pow(Math.sin(t), 3)) / 16,
      -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) / 13,
    ]);
  }
  return pts;
})();

const CONF_COLORS = [
  "#FF0044","#EE0033","#CC0022","#AA0011",
  "#FF2255","#FF4477","#FF6699","#FF88AA",
  "#FF99BB","#FFBBCC","#FFD6E6","#FFFFFF",
  "#FF0066","#DD1155","#BB0044","#FF3388",
  `${GOLD}`,"#F5C518","#FFE066",
];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; color: string;
  spin: number; spinV: number;
  alpha: number; age: number;
  type: "heart" | "rect" | "diamond";
  rw: number; rh: number;
}

const rndC = (a: number, b: number) => a + Math.random() * (b - a);

function makeParticle(ox: number, oy: number, speedMax: number, forceType?: "heart" | "rect" | "diamond"): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = rndC(2, speedMax);
  const roll  = Math.random();
  const type: "heart" | "rect" | "diamond" = forceType || (roll < 0.55 ? "heart" : roll < 0.80 ? "rect" : "diamond");
  const size  = rndC(4, 9);
  return {
    x: ox + rndC(-12, 12), y: oy + rndC(-12, 12),
    vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
    size, color: CONF_COLORS[Math.floor(Math.random() * CONF_COLORS.length)],
    spin: Math.random() * Math.PI * 2, spinV: rndC(-0.12, 0.12),
    alpha: rndC(0.88, 1), age: 0, type,
    rw: size * rndC(1.0, 1.8), rh: size * rndC(0.3, 0.6),
  };
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save();
  ctx.globalAlpha = p.alpha;
  ctx.translate(p.x, p.y);
  ctx.rotate(p.spin);
  ctx.fillStyle = p.color;
  if (p.type === "heart") {
    const s = p.size;
    ctx.beginPath();
    ctx.moveTo(HEART_PTS[0][0] * s, HEART_PTS[0][1] * s);
    for (let i = 1; i < HEART_PTS.length; i++)
      ctx.lineTo(HEART_PTS[i][0] * s, HEART_PTS[i][1] * s);
    ctx.closePath();
    ctx.fill();
  } else if (p.type === "rect") {
    ctx.fillRect(-p.rw / 2, -p.rh / 2, p.rw, p.rh);
  } else {
    const s = p.size * 0.65;
    ctx.beginPath();
    ctx.moveTo(0, -s); ctx.lineTo(s * 0.55, 0);
    ctx.lineTo(0, s);  ctx.lineTo(-s * 0.55, 0);
    ctx.closePath(); ctx.fill();
  }
  ctx.restore();
}

function useConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const partsRef  = useRef<Particle[]>([]);
  const rafRef    = useRef<number>(0);
  const liveRef   = useRef(false);

  const fire = useCallback((opts?: { type?: "default" | "hearts"; x?: number; y?: number }) => {
    const cv = canvasRef.current;
    if (!cv) return;
    // If already running, cancel the previous animation cleanly before restarting
    if (liveRef.current) {
      liveRef.current = false;
      cancelAnimationFrame(rafRef.current);
      partsRef.current = [];
    }
    liveRef.current = true;
    partsRef.current = [];

    const W = cv.width, H = cv.height;
    let frame = 0;

    const isMobile  = W < 640;
    const speedMax  = isMobile ? 12 : 28;
    const countPer  = isMobile ? 90 : 240;
    const gravity   = isMobile ? 0.05 : 0.14;
    const fadeStart = isMobile ? 150 : 80;
    const fadeRate  = isMobile ? 0.009 : 0.018;

    const blasts = (opts?.x !== undefined && opts?.y !== undefined) ? [
      { x: opts.x, y: opts.y, frame: 0, count: isMobile ? 120 : 250 }
    ] : [
      { x: W * 0.12, y: H * 0.09, frame: 0,  count: countPer },
      { x: W * 0.50, y: H * 0.04, frame: 0,  count: countPer },
      { x: W * 0.88, y: H * 0.07, frame: 0,  count: countPer },
      { x: W * 0.30, y: H * 0.15, frame: 8,  count: Math.floor(countPer * 0.6) },
      { x: W * 0.70, y: H * 0.13, frame: 8,  count: Math.floor(countPer * 0.6) },
    ];
    const lastBlastFrame = Math.max(...blasts.map(b => b.frame));

    const tick = () => {
      if (!liveRef.current) return;
      const ctx = cv.getContext("2d")!;
      ctx.clearRect(0, 0, W, H);

      blasts.forEach(b => {
        if (frame === b.frame) {
          for (let i = 0; i < b.count; i++)
            partsRef.current.push(makeParticle(b.x, b.y, speedMax, opts?.type === "hearts" ? "heart" : undefined));
        }
      });

      partsRef.current = partsRef.current.filter(p => {
        p.age++;
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += gravity;
        p.vx *= 0.993;
        p.spin += p.spinV;
        if (p.age > fadeStart) p.alpha -= fadeRate;
        if (p.y > H * 0.93)   p.alpha -= 0.05;
        if (p.alpha > 0.01) drawParticle(ctx, p);
        return p.alpha > 0.01 && p.y < H + 50;
      });

      frame++;
      if (frame <= lastBlastFrame || partsRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, W, H);
        liveRef.current = false;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const cleanup = useCallback(() => {
    liveRef.current = false;
    cancelAnimationFrame(rafRef.current);
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && canvasRef.current)
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    partsRef.current = [];
  }, []);

  return { canvasRef, fire, cleanup };
}

function ConfettiCanvas({ r }: { r: React.RefObject<HTMLCanvasElement | null> }) {
  useEffect(() => {
    const fit = () => {
      if (r.current) {
        r.current.width  = window.innerWidth;
        r.current.height = window.innerHeight;
      }
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [r]);
  return (
    <canvas
      ref={r}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}
    />
  );
}

/* ─── TICKER TAPE ─────────────────────────────────────────────────────────── */

function Ticker() {
  const items = ["Happy Birthday Thalu ✦", "Tillu ✦", "PharmD 2021–2027 ✦", "5 Years · Countless Memories ✦", "Best of Friends ✦", "June 21 ✦"];
  const text = items.join("   ");
  return (
    <div style={{
      background: INK, overflow: "hidden",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      padding: "10px 0", whiteSpace: "nowrap", position: "relative", zIndex: 5,
    }}>
      <div style={{
        display: "inline-block",
        animation: "slide-left 30s linear infinite",
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700, fontSize: "13px",
        letterSpacing: "0.12em", textTransform: "uppercase",
        color: BG,
      }}>
        {text}{"   "}{text}{"   "}{text}{"   "}{text}
      </div>
    </div>
  );
}

function Padlock({ isCorrect, isUnlocking }: { isCorrect: boolean; isUnlocking: boolean }) {
  const isOpen = isCorrect || isUnlocking;
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      marginBottom: "2rem",
      perspective: "1000px"
    }}>
      <svg
        width="80"
        height="80"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: isUnlocking ? "scale(1.1) rotate(15deg)" : isCorrect ? "scale(1.05)" : "none",
        }}
      >
        {/* Shackle */}
        <path
          d="M20 28V20C20 13.3726 25.3726 8 32 8C38.6274 8 44 13.3726 44 20V28"
          stroke={GOLD}
          strokeWidth="5"
          strokeLinecap="round"
          style={{
            transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transformOrigin: "44px 28px",
            transform: isOpen ? "translateY(-12px) rotate(-18deg)" : "none",
          }}
        />
        {/* Lock Body */}
        <rect
          x="12"
          y="26"
          width="40"
          height="30"
          rx="6"
          fill={INK}
          stroke={GOLD}
          strokeWidth="3.5"
        />
        {/* Keyhole */}
        <circle cx="32" cy="39" r="4.5" fill={BG} />
        <path
          d="M29.5 41L27 50H37L34.5 41"
          fill={BG}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/* ─── GATE SCREEN ─────────────────────────────────────────────────────────── */
function GateScreen({ onUnlock, dateStr, timeStr }: { onUnlock: () => void; dateStr: string; timeStr: string }) {
  const [pass, setPass]       = useState("");
  const [shake, setShake]     = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  const tryUnlock = useCallback(async () => {
    const hash = await sha256(pass.toLowerCase().trim());
    if (hash === PASSWORD_HASH) {
      setUnlocking(true);
      setTimeout(onUnlock, 900);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  }, [pass, onUnlock]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Enter") tryUnlock(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [tryUnlock]);

  return (
    <div 
      style={{
        minHeight: "100vh",
        background: BG,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden"
      }}
    >

      {/* Top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 24px", borderBottom: `1px solid rgba(0,0,0,0.08)`,
        position: "relative", zIndex: 10,
      }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "8px",
          background: "#0a0a0a",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "18px",
            color: "#ffffff",
            letterSpacing: "0.02em",
            lineHeight: 1,
          }}>AT</span>
        </div>
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
          fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
          color: "rgba(0,0,0,0.35)",
        }}>A Private Archive · For You Alone</span>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1.5rem", position: "relative", zIndex: 5 }}>
        <div style={{ textAlign: "center", animation: unlocking ? "gate-dissolve 0.9s ease forwards" : "gate-rise 0.7s ease both", width: "100%", maxWidth: "600px" }}>
          <div style={{ transform: "scale(0.85)", transformOrigin: "center", marginBottom: "0.5rem" }}>
            <Padlock isCorrect={unlocking} isUnlocking={unlocking} />
          </div>
          
          {/* Giant heading */}
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800,
            fontSize: "clamp(3rem, 10vw, 7.5rem)", lineHeight: 0.88,
            color: INK, letterSpacing: "-0.02em", textTransform: "uppercase",
            userSelect: "none",
            marginBottom: "1.5rem",
          }}>
            <GlitchWord word="BIRTHDAY" visible={true} delay={0.05} />
            <GlitchWord word="VAULT" visible={true} delay={0.15} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 400,
              fontSize: "15px", color: "rgba(0,0,0,0.7)",
              maxWidth: "320px", lineHeight: 1.6, textAlign: "center",
              marginBottom: "0.5rem",
            }}>
              Sealed with love. Enter the secret key to open this archive built just for {FRIEND_NAME}.
            </p>

            {/* Input */}
            <div className={shake ? "gate-shake" : ""} style={{ display: "flex", gap: "8px", width: "100%", maxWidth: "340px" }}>
              <input
                type="text"
                autoComplete="one-time-code"
                placeholder="Enter secret key…"
                value={pass}
                onChange={e => setPass(e.target.value)}
                autoFocus
                style={{
                  flex: 1, background: INK, border: `2px solid ${INK}`,
                  borderRadius: "8px", padding: "12px 16px",
                  color: BG, fontSize: "14px", outline: "none",
                  fontFamily: "'Inter', sans-serif", letterSpacing: "0.05em",
                  WebkitTextSecurity: "disc",
                } as React.CSSProperties}
              />
              <button
                onClick={tryUnlock}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                style={{
                  background: btnHover ? "#1a1a1a" : INK,
                  border: btnHover ? `2px solid ${GOLD}` : `2px solid ${INK}`,
                  borderRadius: "8px",
                  padding: "12px 20px",
                  color: btnHover ? GOLD : BG,
                  cursor: "pointer",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  letterSpacing: "0.1em",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: btnHover ? `0 0 16px rgba(201, 168, 76, 0.4)` : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>OPEN</span>
                <span style={{
                  transform: btnHover ? "translateX(4px)" : "translateX(0)",
                  transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  display: "inline-block",
                }}>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 24px", borderTop: `1px solid rgba(0,0,0,0.08)`,
        fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
        fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase",
        color: "rgba(0,0,0,0.3)",
        position: "relative", zIndex: 10,
      }}>
        <span>PHARMD · 2021–2027</span>
        <span>{BIRTHDAY}</span>
        <span>11:00 AM</span>
      </div>
      <style>{`.gate-shake { animation: shake 0.55s ease !important; }`}</style>
    </div>
  );
}

function Header({ scrolled, visible, muted, onToggleMute }: { scrolled: boolean; visible: boolean; muted: boolean; onToggleMute: () => void }) {
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", height: "64px",
      background: scrolled ? "rgba(255,251,235,0.94)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent",
      transform: visible ? "translateY(0)" : "translateY(-100%)",
      transition: "transform 0.3s ease, background 0.35s ease, backdrop-filter 0.35s ease, border-bottom 0.35s ease",
    }}>
      <div style={{
        width: "40px", height: "40px", borderRadius: "8px",
        background: "#0a0a0a",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontSize: "22px",
          color: "#ffffff",
          letterSpacing: "0.02em",
          lineHeight: 1,
        }}>AT</span>
      </div>

      <nav className="nav-links">
        {[{ label: "Our Story", href: "#story" }, { label: "Memories", href: "#gallery" }, { label: "A Letter", href: "#letter" }].map(link => (
          <a key={link.label} href={link.href} style={{
            fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(0,0,0,0.42)", textDecoration: "none",
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
            transition: "color 0.2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = INK; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.42)"; }}
          >{link.label}</a>
        ))}

        {/* Music toggle button */}
        <button
          onClick={onToggleMute}
          title={muted ? "Unmute music" : "Mute music"}
          style={{
            background: "none", border: `1px solid rgba(0,0,0,0.15)`,
            borderRadius: "6px", padding: "7px 10px",
            cursor: "pointer",
            display: "flex", alignItems: "center", gap: "5px",
            color: "rgba(0,0,0,0.45)",
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
            fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = INK; (e.currentTarget as HTMLElement).style.color = INK; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.15)"; (e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.45)"; }}
        >
          <span style={{ fontSize: "14px" }}>{muted ? "🔇" : "🎵"}</span>
          {muted ? "Muted" : "Music"}
        </button>

        <a href="#letter" style={{
          background: INK, color: BG, padding: "9px 18px", borderRadius: "6px",
          textDecoration: "none", fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700, fontSize: "12px", letterSpacing: "0.15em",
          textTransform: "uppercase", transition: "all 0.2s",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1a1a1a"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = INK; }}
        >Open Letter</a>
      </nav>
    </header>
  );
}

/* ─── HEART ICON ─ outline (matches THALU) → red fill on hover ───────────── */
function HeartIcon({ visible, onFire }: { visible: boolean; onFire?: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [revealDone, setRevealDone] = useState(false);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setRevealDone(true), 1500);
      return () => clearTimeout(t);
    }
  }, [visible]);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onFire?.()}
      style={{
        display: "inline-block",
        overflow: revealDone ? "visible" : "hidden",
        verticalAlign: "middle",
        cursor: "pointer",
        width: "0.78em",
        height: "0.78em",
        userSelect: "none",
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      <span style={{
        display: "inline-block",
        width: "100%",
        height: "100%",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
      }}>
        <span style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          transform: hovered ? "scale(1.35) translateY(-5px)" : "scale(1) translateY(0)",
          transition: "transform 0.22s cubic-bezier(0.16,1,0.3,1), filter 0.2s ease",
          filter: hovered ? "drop-shadow(0 0 12px rgba(230,57,70,0.6))" : "none",
        }}>
          <svg
            viewBox="0 0 100 90"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "90%", height: "90%", overflow: "visible" }}
          >
            <path
              d="M50 85 C50 85 5 55 5 28 C5 13 17 3 30 3 C38 3 46 8 50 15 C54 8 62 3 70 3 C83 3 95 13 95 28 C95 55 50 85 50 85 Z"
              fill={hovered ? "#e63946" : "transparent"}
              stroke={hovered ? "#e63946" : INK}
              strokeWidth="1.1"
              style={{ transition: "fill 0.2s ease, stroke 0.2s ease" }}
            />
          </svg>
        </span>
      </span>
    </span>
  );
}

/* ─── INTERACTIVE TEXT ─ per-letter hover effect ────────────────────────── */
function InteractiveText({
  text,
  baseColor = INK,
  hoverColor = GOLD,
  isActive = false,
  activeColor = BG,
}: {
  text: string;
  baseColor?: string;
  hoverColor?: string;
  isActive?: boolean;
  activeColor?: string;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  const words = text.split(" ");
  let globalCharIdx = 0;

  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap", rowGap: "0.2em" }}>
      {words.map((word, wordIdx) => {
        const wordChars = word.split("");
        const startIdx = globalCharIdx;
        globalCharIdx += wordChars.length + 1; // +1 for the space

        return (
          <span key={wordIdx} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {wordChars.map((char, charIdx) => {
              const currentGlobalIdx = startIdx + charIdx;
              return (
                <span
                  key={charIdx}
                  onMouseEnter={() => setHoveredIdx(currentGlobalIdx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    display: "inline-block",
                    cursor: "default",
                    transition: "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), color 0.18s ease",
                    transform: hoveredIdx === currentGlobalIdx ? "translateY(-4px) scale(1.08)" : "translateY(0) scale(1)",
                    color: hoveredIdx === currentGlobalIdx ? hoverColor : (isActive ? activeColor : baseColor),
                  }}
                >
                  {char}
                </span>
              );
            })}
            {wordIdx < words.length - 1 && (
              <span style={{ display: "inline-block" }}>&nbsp;</span>
            )}
          </span>
        );
      })}
    </span>
  );
}

/* ─── GLITCH WORD ─ per-letter hover effect ──────────────────────────────── */
function GlitchWord({
  word, outline = false, delay = 0, visible,
}: { word: string; outline?: boolean; delay?: number; visible: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <span style={{ display: "block", overflow: "hidden" }}>
      <span style={{
        display: "block",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: `transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}>
        {word.split("").map((char, i) => (
          <span
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "inline-block",
              cursor: "default",
              transition: "transform 0.18s cubic-bezier(0.16,1,0.3,1), color 0.18s ease, opacity 0.18s ease",
              transform: hovered === i ? "translateY(-8px) scale(1.08)" : "translateY(0) scale(1)",
              ...(outline
                ? {
                    WebkitTextStroke: hovered === i ? `2px ${GOLD}` : `2px ${INK}`,
                    color: hovered === i ? GOLD : "transparent",
                  }
                : {
                    color: hovered === i ? GOLD : INK,
                  }),
            }}
          >
            {char === " " ? "\u00a0" : char}
          </span>
        ))}
      </span>
    </span>
  );
}

/* ─── HERO ──────────────────────────────────────────────────────────────────── */
function HeroSection({ dateStr, timeStr, onFire }: { dateStr: string; timeStr: string; onFire: () => void }) {
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    // Reduced from 120ms → 50ms so text animations begin almost instantly
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero-section">
      <div style={{ height: "64px" }} />

      {/* Text content */}
      <div className="hero-grid">
        <div className="hero-left">
          <div className="hero-text-wrapper" style={{ position: "relative", zIndex: 5 }}>
            {/* Caption */}
            <div style={{
              maxWidth: "280px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: "all 0.8s ease 0.4s",
            }}>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300,
                fontSize: "13px", color: "rgba(0,0,0,0.5)", lineHeight: 1.75,
              }}>
                From strangers to best friends !!! Not just memories captured but moments lived to the fullest
              </p>
            </div>

            {/* Giant name — per-letter gold hover ripple */}
            <div>
              <h1 style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800,
                fontSize: "clamp(4rem, 13vw, 15rem)", lineHeight: 0.88,
                textTransform: "uppercase", letterSpacing: "-0.02em",
                userSelect: "none",
              }}>
                <GlitchWord word="HAPPY" delay={0.05} visible={visible} />
                <GlitchWord word="BIRTHDAY," delay={0.15} visible={visible} />
                {/* THALU + heart — heart turns red on hover */}
                <span style={{ display: "flex", alignItems: "center", gap: "0.06em" }}>
                  <GlitchWord word={FRIEND_NAME.toUpperCase()} outline delay={0.25} visible={visible} />
                  <HeartIcon visible={visible} onFire={onFire} />
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Refined casual photo — priority loaded, GPU-composited, blur placeholder */}
      <Image
        src="/thalunew.jpg"
        alt={`${FRIEND_NAME}`}
        className="hero-img-casual"
        id="hero-photo"
        style={{
          opacity: imgLoaded ? (visible ? 1 : 0) : 0,
          filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.06))",
        }}
        onLoad={() => setImgLoaded(true)}
        priority
        // fetchpriority="high" is implied by priority, but sizes tells the browser
        // which resolution to request (avoids downloading a 6000px image for a 900px slot)
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
        width={1200}
        height={900}
        quality={85}
      />

      {/* Bottom info bar */}
      <div className="info-bar">
        <div className="info-bar-item">BORN {BIRTHDAY}</div>
        <div className="info-bar-item info-bar-item-center">THURSDAY</div>
        <div className="info-bar-item info-bar-item-right">
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: INK, display: "inline-block" }} />
            11:00 AM
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─── STORY SECTION ───────────────────────────────────────────────────────── */
function StorySection() {
  const [active, setActive] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="story" ref={ref} style={{ background: BG }}>
      <Ticker />

      {/* Header */}
      <div className="story-header-pad">
        <p style={{
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
          fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase",
          color: "rgba(0,0,0,0.35)", marginBottom: "1rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.6s ease",
        }}>Our Story</p>
        <h2 style={{
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
          fontSize: "clamp(2rem, 5.5vw, 3.8rem)", lineHeight: 0.95,
          color: INK, textTransform: "uppercase", letterSpacing: "-0.02em",
        }}>
          <span style={{ display: "block", overflow: "hidden" }}>
            <span style={{
              display: "block",
              transform: visible ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.05s"
            }}>
              <InteractiveText text="Our journey" />
            </span>
          </span>
          <span style={{ display: "block", overflow: "hidden" }}>
            <span style={{
              display: "block",
              transform: visible ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s"
            }}>
              <InteractiveText text="so far" />
            </span>
          </span>
        </h2>
      </div>

      {/* Chapter cards */}
      <div className="chapters-grid" style={{ borderTop: "none" }}>
        {CHAPTERS.map((ch, i) => (
          <div
            key={i}
            onClick={() => setActive(active === i ? null : i)}
            className={`chapter-card ${active === i ? "active" : ""}`}
            style={{
              background: active === i ? INK : undefined,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: `${i * 0.1 + 0.15}s`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            {/* Top row container */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase",
                color: active === i ? `rgba(201,168,76,0.65)` : "rgba(0,0,0,0.35)",
              }}>{ch.label}</span>
              <span className="chapter-year" style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
                fontSize: "4.2rem", lineHeight: 1,
                color: active === i ? `rgba(201,168,76,0.35)` : "rgba(0,0,0,0.06)",
                transition: "color 0.3s ease, transform 0.3s ease",
              }}>{ch.year}</span>
            </div>

            {/* Middle: Content container (fills space and aligns line/title/body) */}
            <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
              <div className="chapter-card-line" style={{
                width: active === i ? "48px" : "28px", height: "2px",
                background: active === i ? GOLD : "rgba(0,0,0,0.25)",
                marginBottom: "1.2rem",
                transition: "width 0.3s ease, background 0.3s ease",
              }} />

              <h3 style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
                fontSize: "1.6rem", letterSpacing: "0.02em", textTransform: "uppercase",
                marginBottom: "0.8rem",
              }}>
                <InteractiveText text={ch.title} isActive={active === i} activeColor={BG} baseColor={INK} />
              </h3>

              <div style={{ maxHeight: active === i ? "200px" : "0", overflow: "hidden", transition: "max-height 0.45s ease, opacity 0.4s ease", opacity: active === i ? 1 : 0 }}>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontWeight: 300,
                  fontSize: "13px", color: "rgba(255,251,235,0.65)", lineHeight: 1.8,
                  marginTop: "0.6rem"
                }}>{ch.body}</p>
              </div>
            </div>

            {/* Bottom row container (always pushes to the bottom of the card) */}
            <div style={{ marginTop: "1.5rem" }}>
              {active !== i ? (
                <p className="chapter-card-arrow" style={{
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                  fontSize: "11px", color: "rgba(0,0,0,0.3)",
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  transition: "color 0.3s ease",
                }}>Click to read →</p>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: GOLD, display: "inline-block", animation: "pulse-dot 1.5s infinite" }} />
                  <p style={{
                    fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                    fontSize: "11px", color: GOLD,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                  }}>Reading Chapter</p>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── GALLERY ─────────────────────────────────────────────────────────────── */

// Pre-distribute photos into N fixed columns (left→right, top→bottom)
// so the order never reshuffles on resize or re-render.
function buildColumns(photos: typeof PHOTOS, numCols: number) {
  const cols: (typeof PHOTOS)[] = Array.from({ length: numCols }, () => []);
  photos.forEach((p, i) => cols[i % numCols].push(p));
  return cols;
}

// Map each photo's position back to its index in the original PHOTOS array
function photoIndex(photo: (typeof PHOTOS)[0]) {
  return PHOTOS.findIndex(p => p.src === photo.src);
}

function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [visible, setVisible]   = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [numCols, setNumCols]   = useState(2);
  const ref = useRef<HTMLElement>(null);

  // Show first 48 initially, all when expanded
  const visiblePhotos = expanded ? PHOTOS : PHOTOS.slice(0, 48);
  const remaining = PHOTOS.length - 48;

  // Determine column count from window width — mirrors CSS breakpoints
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setNumCols(w >= 900 ? 4 : w >= 600 ? 3 : 2);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.04 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox(p => p !== null ? (p + 1) % PHOTOS.length : null);
      if (e.key === "ArrowLeft")  setLightbox(p => p !== null ? (p - 1 + PHOTOS.length) % PHOTOS.length : null);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [lightbox]);

  const columns = buildColumns(visiblePhotos, numCols);

  return (
    <section id="gallery" ref={ref} style={{ background: INK }}>
      {/* Header */}
      <div className="section-header-pad gallery-header-row" style={{
        borderTop: `1px solid rgba(255,255,255,0.08)`,
        borderBottom: `1px solid rgba(255,255,255,0.08)`,
        opacity: visible ? 1 : 0, transition: "opacity 0.7s ease",
      }}>
        <div>
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
            fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)", marginBottom: "1rem",
          }}>The Archive</p>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
            fontSize: "clamp(2rem, 5.5vw, 3.8rem)", lineHeight: 0.95,
            color: BG, textTransform: "uppercase", letterSpacing: "-0.02em",
          }}>
            <span style={{ display: "block" }}><InteractiveText text="Moments" baseColor={BG} /></span>
            <span style={{ display: "block" }}><InteractiveText text="Frozen in time" baseColor={BG} /></span>
          </h2>
        </div>
        <p className="gallery-desc-text" style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 300,
          fontSize: "13px", color: "rgba(255,255,255,0.55)",
          maxWidth: "200px", textAlign: "right", lineHeight: 1.75,
        }}>Click any photo to hold it closer. {PHOTOS.length} moments preserved.</p>
      </div>

      {/* Photo grid — JS-assigned columns freeze order regardless of resize */}
      <div className="masonry-grid">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="masonry-col">
            {col.map((photo) => {
              const i = photoIndex(photo);
              return (
                <div
                   key={photo.src}
                  onClick={() => setLightbox(i)}
                  className="masonry-item"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 0.5s ease ${(i % 12) * 40}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${(i % 12) * 40}ms`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    loading="lazy"
                    className="masonry-img"
                    onError={e => {
                      const item = (e.currentTarget as HTMLElement).closest(".masonry-item") as HTMLElement | null;
                      if (item) item.style.display = "none";
                    }}
                  />
                  <div className="masonry-hover">
                    <span className="masonry-tag">{photo.tag}</span>
                    <p className="masonry-date">{photo.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom spacer */}
      <div style={{ height: "2rem" }} />

      {/* Load More */}
      {!expanded && (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: "1rem", padding: "1rem 0 5rem",
          borderTop: `1px solid rgba(255,255,255,0.08)`,
        }}>
          {/* Count pill */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: `rgba(201,168,76,0.12)`,
            border: `1px solid rgba(201,168,76,0.35)`,
            borderRadius: "999px", padding: "6px 18px",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, fontSize: "11px", letterSpacing: "0.2em",
            textTransform: "uppercase", color: GOLD,
          }}>
            <span style={{ width: "6px", height: "6px", background: GOLD, borderRadius: "50%", display: "inline-block" }} />
            {remaining} more moments
          </div>

          <button
            onClick={() => setExpanded(true)}
            style={{
              background: BG, border: `2px solid ${BG}`, color: INK,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: "14px",
              letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "16px 56px", borderRadius: "8px",
              cursor: "pointer", transition: "all 0.25s ease",
              boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = GOLD; el.style.borderColor = GOLD;
              el.style.color = INK; el.style.boxShadow = `0 8px 32px rgba(201,168,76,0.45)`;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = BG; el.style.borderColor = BG;
              el.style.color = INK; el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.25)";
            }}
          >
            Load All Memories
          </button>

        </div>
      )}

      {/* All-loaded footer */}
      {expanded && (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: "0.5rem", padding: "3rem 0 5rem",
          borderTop: `1px solid rgba(255,255,255,0.08)`, marginTop: "2rem",
          opacity: 1,
        }}>
          <span style={{ fontSize: "1.5rem" }}>🤝</span>
        </div>
      )}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(10,10,10,0.96)", backdropFilter: "blur(12px)",
            zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
            animation: "lb-in 0.25s ease",
          }}
        >
          <div onClick={e => e.stopPropagation()} style={{ position: "relative", maxWidth: "90vw", maxHeight: "88vh" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTOS[lightbox].src} alt={PHOTOS[lightbox].caption}
              style={{ maxWidth: "90vw", maxHeight: "78vh", objectFit: "contain", borderRadius: "10px 10px 0 0", display: "block", boxShadow: "0 40px 100px rgba(0,0,0,0.7)" }}
            />
            {/* Caption bar */}
            <div style={{
              background: BG, padding: "1rem 1.5rem", borderRadius: "0 0 10px 10px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
                  fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.1em", color: INK,
                }}>{PHOTOS[lightbox].tag}</span>
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                  fontSize: "11px", letterSpacing: "0.15em", color: "rgba(0,0,0,0.4)", marginLeft: "12px",
                }}>{PHOTOS[lightbox].date}</span>
              </div>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                fontSize: "11px", letterSpacing: "0.15em", color: "rgba(0,0,0,0.35)",
              }}>{lightbox + 1} / {PHOTOS.length}</span>
            </div>

            {/* Nav buttons */}
            {/* Close — always visible */}
            <button onClick={() => setLightbox(null)} style={{
              position: "absolute", top: "-14px", right: "-14px",
              width: "40px", height: "40px", borderRadius: "50%",
              background: BG, border: "none", color: INK,
              cursor: "pointer", fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900, fontSize: "16px",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s", boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GOLD; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = BG; }}
            >✕</button>
            {/* Side arrows — hidden on mobile via CSS, shown on wider screens */}
            {[{ label: "←", pos: { left: "-52px", top: "40%" } as React.CSSProperties, fn: () => setLightbox((lightbox - 1 + PHOTOS.length) % PHOTOS.length) },
              { label: "→", pos: { right: "-52px", top: "40%" } as React.CSSProperties, fn: () => setLightbox((lightbox + 1) % PHOTOS.length) }].map(btn => (
              <button key={btn.label} onClick={btn.fn} className="lb-nav-side" style={{
                position: "absolute", ...btn.pos,
                width: "40px", height: "40px", borderRadius: "50%",
                background: BG, border: "none", color: INK,
                cursor: "pointer", fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900, fontSize: "16px",
                transition: "all 0.2s", boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GOLD; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = BG; }}
              >{btn.label}</button>
            ))}
          </div>
          {/* Mobile prev/next row — shown only on narrow screens */}
          <div className="lb-mobile-nav">
            {[{ label: "← Prev", fn: () => setLightbox((lightbox - 1 + PHOTOS.length) % PHOTOS.length) },
              { label: "Next →", fn: () => setLightbox((lightbox + 1) % PHOTOS.length) }].map(btn => (
              <button key={btn.label} onClick={btn.fn} style={{
                background: BG, border: "none", color: INK, borderRadius: "8px",
                padding: "10px 22px", fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900, fontSize: "13px", cursor: "pointer",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)", letterSpacing: "0.08em",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GOLD; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = BG; }}
              >{btn.label}</button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/* ─── AGE TIMER ─────────────────────────────────────────────────────────── */
function AgeTimerSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [age, setAge] = useState({ years: 0, months: 0, days: 0, hours: 0, mins: 0, secs: 0 });
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [yearPct, setYearPct] = useState(0);
  const [nextAge, setNextAge] = useState(25);
  const [nextBdayLabel, setNextBdayLabel] = useState("Jun 21, 2026");
  const [prevBdayLabel, setPrevBdayLabel] = useState("Jun 21, 2025");

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const totalSecs = Math.floor((now - BIRTH_MS) / 1000);
      const secs  = totalSecs % 60;
      const mins  = Math.floor(totalSecs / 60) % 60;
      const hours = Math.floor(totalSecs / 3600) % 24;
      const b = new Date(BIRTH_MS), n = new Date(now);
      let years = n.getFullYear() - b.getFullYear();
      let months = n.getMonth() - b.getMonth();
      if (months < 0) { years--; months += 12; }
      let days = n.getDate() - b.getDate();
      if (days < 0) {
        if (--months < 0) { years--; months += 12; }
        days += new Date(n.getFullYear(), n.getMonth(), 0).getDate();
      }
      setAge({ years, months, days, hours, mins, secs });

      // ── Next birthday (dynamic, works forever) ──
      // Count down to midnight IST (00:00 IST = 18:30 UTC the PREVIOUS day)
      // so the timer shows time until birthday starts, not exact birth time.
      const bm = BIRTH_UTC.getUTCMonth();
      const bd = BIRTH_UTC.getUTCDate();
      // Midnight IST on Jun 21 = Jun 20 18:30 UTC (IST is UTC+5:30)
      const thisYearBday = Date.UTC(n.getUTCFullYear(), bm, bd - 1, 18, 30, 0);
      const nextBdayMs = thisYearBday > now
        ? thisYearBday
        : Date.UTC(n.getUTCFullYear() + 1, bm, bd - 1, 18, 30, 0);
      const prevBdayMs = thisYearBday <= now
        ? thisYearBday
        : Date.UTC(n.getUTCFullYear() - 1, bm, bd - 1, 18, 30, 0);
      const nextBdayDate = new Date(nextBdayMs);
      const prevBdayDate = new Date(prevBdayMs);
      const nextAgeVal = nextBdayDate.getUTCFullYear() - BIRTH_UTC.getUTCFullYear();
      setNextAge(nextAgeVal);
      setNextBdayLabel(`Jun 21, ${nextBdayDate.getUTCFullYear()}`);
      setPrevBdayLabel(`Jun 21, ${prevBdayDate.getUTCFullYear()}`);

      const cdDiff = Math.max(0, nextBdayMs - now);
      setCountdown({
        days: Math.floor(cdDiff / 86400000),
        hours: Math.floor(cdDiff / 3600000) % 24,
        mins: Math.floor(cdDiff / 60000) % 60,
        secs: Math.floor(cdDiff / 1000) % 60,
      });
      setYearPct(Math.min(1, (now - prevBdayMs) / (nextBdayMs - prevBdayMs)));
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const show = (style: object) => ({
    ...style,
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(18px)",
    transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
  });

  return (
    <section ref={ref} className="age-timer-section">
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Header Title for the Section */}
        <div style={show({ textAlign: "center", marginBottom: "3.5rem" })}>
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
            fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase",
            color: GOLD, marginBottom: "0.5rem"
          }}>Chronology Console</p>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
            fontSize: "clamp(2rem, 4vw, 3rem)", textTransform: "uppercase",
            letterSpacing: "-0.01em", color: INK
          }}>Time & Milestone Archive</h2>
        </div>

        {/* Dashboard Grid */}
        <div style={show({
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2.5rem",
          transitionDelay: "0.08s"
        })}>

          {/* Left Card: The Age & Live Time Card */}
          <div style={{
            background: "#FFFFFF",
            border: "1px solid rgba(201, 168, 76, 0.16)",
            borderRadius: "20px",
            padding: "2.5rem",
            boxShadow: "0 20px 40px rgba(201, 168, 76, 0.05)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "2rem",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 30px 60px rgba(201, 168, 76, 0.08)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(201, 168, 76, 0.05)";
            }}
          >
            {/* Top row: Label and birth meta */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.2rem" }}>
                <span style={{
                  background: "rgba(201,168,76,0.12)",
                  color: GOLD,
                  fontSize: "10px",
                  fontWeight: 800,
                  padding: "4px 8px",
                  borderRadius: "6px",
                  letterSpacing: "0.1em",
                  fontFamily: "'Inter', sans-serif"
                }}>ARCHIVE</span>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: "11px",
                  color: "rgba(0,0,0,0.35)",
                  letterSpacing: "0.05em"
                }}>RECORDED HISTORY</span>
              </div>
              
              <h3 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "1.6rem",
                color: INK,
                textTransform: "uppercase",
                marginBottom: "0.5rem"
              }}>{FRIEND_NAME}'s Age</h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                color: "rgba(0,0,0,0.45)",
                lineHeight: 1.5
              }}>
                Born Thursday, 21 June 2001<br />
                at 11:00 AM IST
              </p>
            </div>

            {/* Middle: Big Age numbers */}
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {[
                { value: age.years, unit: "Yrs", desc: "Years" },
                { value: age.months, unit: "Mo", desc: "Months" },
                { value: age.days, unit: "D", desc: "Days" }
              ].map(({ value, unit, desc }) => (
                <div key={unit} style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline" }}>
                    <span style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 800,
                      fontSize: "clamp(2.5rem, 5.5vw, 3.8rem)",
                      lineHeight: 1,
                      color: INK,
                      letterSpacing: "-0.03em"
                    }}>{value}</span>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "13px",
                      color: GOLD,
                      marginLeft: "2px"
                    }}>{unit}</span>
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: "9px",
                    color: "rgba(0,0,0,0.35)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginTop: "2px"
                  }}>{desc}</div>
                </div>
              ))}
            </div>

            {/* Bottom: Live time clock with pulsing tag */}
            <div style={{
              borderTop: "1px solid rgba(0,0,0,0.06)",
              paddingTop: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600,
                  fontSize: "1.5rem",
                  letterSpacing: "0.05em",
                  color: INK,
                }}>
                  {pad(age.hours)}<span style={{ color: GOLD }}>:</span>
                  {pad(age.mins)}<span style={{ color: GOLD }}>:</span>
                  {pad(age.secs)}
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "9px",
                  color: "rgba(0,0,0,0.35)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginTop: "2px"
                }}>CURRENT TIME TRACKER</div>
              </div>

              {/* Pulsing indicator */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#e63946",
                  animation: "heartbeat 1.4s ease-in-out infinite"
                }} />
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "9px",
                  color: "#e63946",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em"
                }}>LIVE CHRONICLE</span>
              </div>
            </div>
          </div>

          {/* Right Card: Next Milestone Countdown (Dark Console Card) */}
          <div style={{
            background: INK,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "20px",
            padding: "2.5rem",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.22)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "2rem",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 35px 70px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.22)";
            }}
          >
            {/* Top: Countdown title and progress */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.2rem" }}>
                <span style={{
                  background: "rgba(201,168,76,0.18)",
                  color: GOLD,
                  fontSize: "10px",
                  fontWeight: 800,
                  padding: "4px 8px",
                  borderRadius: "6px",
                  letterSpacing: "0.1em",
                  fontFamily: "'Inter', sans-serif"
                }}>MILESTONE</span>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.05em"
                }}>NEXT ANNIVERSARY</span>
              </div>

              <h3 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "1.6rem",
                color: BG,
                textTransform: "uppercase",
                marginBottom: "0.5rem"
              }}>Turns {nextAge}</h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.5
              }}>
                Approaching next birthday on<br />
                {nextBdayLabel}
              </p>
            </div>

            {/* Middle: Progress Bar */}
            <div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "8px"
              }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.35)",
                  textTransform: "uppercase"
                }}>Yearly Progress</span>
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: GOLD
                }}>{Math.round(yearPct * 100)}%</span>
              </div>
              
              {/* Progress track */}
              <div style={{
                width: "100%", height: "8px", background: "rgba(255,255,255,0.06)",
                borderRadius: "4px", position: "relative", overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.03)"
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, height: "100%",
                  width: `${yearPct * 100}%`,
                  background: `linear-gradient(90deg, ${GOLD} 0%, #ffe066 100%)`,
                  borderRadius: "4px",
                  transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                }} />
              </div>
              
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "'Inter', sans-serif",
                fontSize: "9px",
                color: "rgba(255,255,255,0.3)",
                marginTop: "6px"
              }}>
                <span>{prevBdayLabel}</span>
                <span>{nextBdayLabel}</span>
              </div>
            </div>

            {/* Bottom: Countdown digits */}
            <div style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: "1.2rem",
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "6px"
              }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "9px",
                  color: "rgba(255,255,255,0.35)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em"
                }}>TIME REMAINING</span>
              </div>

              <div style={{ display: "flex", gap: "0.6rem" }}>
                {[
                  { value: countdown.days, label: "d" },
                  { value: countdown.hours, label: "h" },
                  { value: countdown.mins, label: "m" },
                  { value: countdown.secs, label: "s" }
                ].map(({ value, label }) => (
                  <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "6px 0", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(1.1rem, 2.8vw, 1.6rem)",
                      lineHeight: 1.1,
                      color: BG
                    }}>{pad(value)}</span>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "9px",
                      color: GOLD,
                      textTransform: "uppercase",
                      marginTop: "2px"
                    }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}



/* ─── BIRTHDAY CAKE WITH BLOW-OUT CANDLES ───────────────────────────────── */
function BirthdayCake({ onFire, onCut, onCutComplete }: { onFire: (opts?: { type?: "default" | "hearts"; x?: number; y?: number }) => void, onCut?: () => void, onCutComplete?: () => void }) {
  const [blown, setBlown] = useState(false);
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const [cutStatus, setCutStatus] = useState<"uncut" | "cutting" | "cut">("uncut");
  const [knifePos, setKnifePos] = useState({ x: 88, y: 55 });
  const [isDraggingKnife, setIsDraggingKnife] = useState(false);
  const cakeRef = useRef<HTMLDivElement>(null);

  const triggerConfetti = () => {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    if (cakeRef.current) {
      const rect = cakeRef.current.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }
    setTimeout(() => {
      onFire({ type: "hearts", x, y });
    }, 300);
  };

  const blowCandle = (idx: number) => {
    if (blown) return;
    setCandles(prev => {
      if (!prev[idx]) return prev;
      const next = [...prev];
      next[idx] = false;
      if (next.every(c => !c)) {
        setBlown(true);
        triggerConfetti();
      }
      return next;
    });
  };

  const blowAll = () => {
    if (blown) return;
    setCandles([false, false, false, false, false]);
    setBlown(true);
    triggerConfetti();
  };

  const triggerAutoCutFrom = (startY: number) => {
    setCutStatus("cutting");
    onCut?.();
    setKnifePos({ x: 50, y: startY });
    // Animate to bottom of the cake
    setTimeout(() => {
      setKnifePos({ x: 50, y: 81 });
    }, 50);
    setTimeout(() => {
      setCutStatus("cut");
      let x = window.innerWidth / 2;
      let y = window.innerHeight / 2;
      if (cakeRef.current) {
        const rect = cakeRef.current.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      }
      onFire({ type: "default", x, y });
      onCutComplete?.();
    }, 700);
  };

  const handleKnifeMouseDown = (e: React.MouseEvent) => {
    if (cutStatus !== "uncut") return;
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingKnife(true);
  };

  const handleKnifeTouchStart = (e: React.TouchEvent) => {
    if (cutStatus !== "uncut") return;
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingKnife(true);
  };

  const handleSVGMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDraggingKnife || cutStatus !== "uncut") return;
    updateKnifeDrag(e.clientX, e.clientY, e.currentTarget);
  };

  const handleSVGTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (!isDraggingKnife || cutStatus !== "uncut") return;
    if (e.touches.length > 0) {
      updateKnifeDrag(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget);
    }
  };

  const handleSVGMouseUp = () => {
    if (!isDraggingKnife) return;
    setIsDraggingKnife(false);
    // Return knife to side if released before cutting
    setKnifePos({ x: 88, y: 55 });
  };

  const handleKnifeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cutStatus !== "uncut") return;
    triggerAutoCutFrom(28);
  };

  const updateKnifeDrag = (clientX: number, clientY: number, svgElement: SVGSVGElement) => {
    const rect = svgElement.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    
    // Clamp values so knife doesn't fly off screen
    const clampedX = Math.max(5, Math.min(95, x));
    const clampedY = Math.max(5, Math.min(95, y));
    
    setKnifePos({ x: clampedX, y: clampedY });
    
    // Trigger slice if the knife is dragged close to the center cutting line
    if (Math.abs(clampedX - 50) < 6 && clampedY >= 20 && clampedY <= 65) {
      setIsDraggingKnife(false);
      triggerAutoCutFrom(clampedY);
    }
  };

  const renderCandle = (idx: number) => {
    const candlesData = [
      { cx: 34, cy: 26 },
      { cx: 42, cy: 24 },
      { cx: 50, cy: 22 },
      { cx: 58, cy: 24 },
      { cx: 66, cy: 26 },
    ];
    const candle = candlesData[idx];
    const lit = candles[idx];
    return (
      <g key={idx}>
        {/* Candle Stick */}
        <line x1={candle.cx} y1={candle.cy} x2={candle.cx} y2={candle.cy + 12} stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
        <line x1={candle.cx} y1={candle.cy + 3} x2={candle.cx} y2={candle.cy + 9} stroke={INK} strokeWidth="1" />
        
        {/* Flame */}
        <path
          d={`M${candle.cx} ${candle.cy - 1} C${candle.cx - 2.5} ${candle.cy - 4} ${candle.cx - 2} ${candle.cy - 8} ${candle.cx} ${candle.cy - 11} C${candle.cx + 2} ${candle.cy - 8} ${candle.cx + 2.5} ${candle.cy - 4} ${candle.cx} ${candle.cy - 1} Z`}
          fill="#FF4E00"
          style={{
            transformOrigin: `${candle.cx}px ${candle.cy - 1}px`,
            animation: lit ? "flicker 0.15s ease-in-out infinite alternate" : "none",
            filter: "drop-shadow(0 0 4px #FF8800)",
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
            transform: lit ? "scale(1)" : "scale(0)",
            opacity: lit ? 1 : 0,
            pointerEvents: lit ? "auto" : "none",
          }}
        />
        {/* Flame inner core */}
        <path
          d={`M${candle.cx} ${candle.cy - 2} C${candle.cx - 1.2} ${candle.cy - 4} ${candle.cx - 1} ${candle.cy - 6} ${candle.cx} ${candle.cy - 8} C${candle.cx + 1} ${candle.cy - 6} ${candle.cx + 1.2} ${candle.cy - 4} ${candle.cx} ${candle.cy - 2} Z`}
          fill="#FFE600"
          style={{
            transformOrigin: `${candle.cx}px ${candle.cy - 2}px`,
            animation: lit ? "flicker 0.1s ease-in-out infinite alternate" : "none",
            transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
            transform: lit ? "scale(1)" : "scale(0)",
            opacity: lit ? 1 : 0,
            pointerEvents: "none",
          }}
        />
        {/* Smoke drift after blowing */}
        {!lit && (
          <path
            d={`M${candle.cx} ${candle.cy - 2} Q${candle.cx - 3} ${candle.cy - 8} ${candle.cx - 1} ${candle.cy - 15}`}
            stroke="rgba(255,251,235,0.4)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            style={{
              transformOrigin: `${candle.cx}px ${candle.cy - 2}px`,
              animation: "smoke-drift 0.8s ease-out forwards",
            }}
          />
        )}
        {/* Invisible larger hover/tap zone */}
        {lit && (
          <rect
            x={candle.cx - 4}
            y={candle.cy - 12}
            width={8}
            height={26}
            fill="transparent"
            style={{ cursor: "pointer", pointerEvents: "auto" }}
            onMouseEnter={(e) => {
              e.stopPropagation();
              blowCandle(idx);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              blowCandle(idx);
            }}
          />
        )}
      </g>
    );
  };

  return (
    <div 
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "2rem 0",
        perspective: "1000px"
      }}
    >
      <div 
        ref={cakeRef}
        onClick={() => {
          if (!blown) {
            blowAll();
          }
        }}
        onMouseEnter={(e) => {
          if (cutStatus !== "cut") e.currentTarget.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1.0)";
        }}
        style={{
          cursor: (blown && cutStatus === "cut") ? "default" : "pointer",
          position: "relative",
          width: "clamp(280px, 75vw, 480px)",
          height: "clamp(280px, 75vw, 480px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "scale(1.0)",
          transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onMouseMove={handleSVGMouseMove}
          onTouchMove={handleSVGTouchMove}
          onMouseUp={handleSVGMouseUp}
          onTouchEnd={handleSVGMouseUp}
          onMouseLeave={handleSVGMouseUp}
        >
          {/* Cake Plate */}
          <path d="M10 82C10 82 25 87 50 87C75 87 90 82 90 82" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
          
          {/* Glowing heart inside the cake (revealed on cut) */}
          {cutStatus === "cut" && (
            <g style={{
              transformOrigin: "50px 64px",
              animation: "reveal-heart 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
            }}>
              <path
                d="M 50 64 C 48.5 61 46 61 46 62.5 C 46 64 50 67 50 67 C 50 67 54 64 54 62.5 C 54 61 51.5 61 50 64 Z"
                fill={GOLD}
                style={{
                  transformOrigin: "50px 64px",
                  animation: "heartbeat 1.4s ease-in-out infinite",
                }}
              />
            </g>
          )}

          {/* Cake Left Half */}
          <g style={{
            transform: cutStatus === "cut" ? "translateX(-15px)" : "translateX(0px)",
            transition: "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            transformOrigin: "50px 60px",
          }}>
            {/* Layer 1 Left */}
            <path d="M24 55 H50 V81 H24 A4 4 0 0 1 20 77 V59 A4 4 0 0 1 24 55 Z" fill={BG} stroke={GOLD} strokeWidth="2.5" />
            <path d="M20 59Q25 64 30 59Q35 64 40 59Q45 64 50 59" stroke={GOLD} strokeWidth="2.5" fill="none" />
            
            {/* Layer 2 Left */}
            <path d="M31 36 H50 V56 H31 A3 3 0 0 1 28 53 V39 A3 3 0 0 1 31 36 Z" fill={BG} stroke={GOLD} strokeWidth="2.5" />
            <path d="M28 39Q33 43 38 39Q43 43 48 39Q50 39" stroke={GOLD} strokeWidth="2.5" fill="none" />
            
            {/* Left Candles */}
            {renderCandle(0)}
            {renderCandle(1)}
            {renderCandle(2)}
          </g>

          {/* Cake Right Half */}
          <g style={{
            transform: cutStatus === "cut" ? "translateX(15px)" : "translateX(0px)",
            transition: "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            transformOrigin: "50px 60px",
          }}>
            {/* Layer 1 Right */}
            <path d="M50 55 H76 A4 4 0 0 1 80 59 V77 A4 4 0 0 1 76 81 H50 Z" fill={BG} stroke={GOLD} strokeWidth="2.5" />
            <path d="M50 59Q55 64 60 59Q65 64 70 59Q75 64 80 59" stroke={GOLD} strokeWidth="2.5" fill="none" />
            
            {/* Layer 2 Right */}
            <path d="M50 36 H69 A3 3 0 0 1 72 39 V53 A3 3 0 0 1 69 56 H50 Z" fill={BG} stroke={GOLD} strokeWidth="2.5" />
            <path d="M50 39Q53 43 58 39Q63 43 68 39" stroke={GOLD} strokeWidth="2.5" fill="none" />
            
            {/* Right Candles */}
            {renderCandle(3)}
            {renderCandle(4)}
          </g>

          {/* Slicing dotted guide line */}
          {blown && cutStatus !== "cut" && (
            <line
              x1="50" y1="28" x2="50" y2="81"
              stroke={GOLD}
              strokeWidth="1"
              strokeDasharray="2 2"
              style={{ opacity: 0.6 }}
            />
          )}

          {/* Slice/cut execution path (Knife w/ smooth sliding transition) */}
          {cutStatus === "cutting" && (
            <g 
              style={{
                transform: `translate(${knifePos.x}px, ${knifePos.y}px)`,
                transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            >
              <path d="M -1,-15 L 1,-15 L 1,0 C 1,2 0,3 -1,3 Z" fill="#E2E8F0" stroke={GOLD} strokeWidth="0.8" />
              <rect x="-0.6" y="-22" width="1.2" height="7" rx="0.3" fill={INK} stroke={GOLD} strokeWidth="0.6" />
            </g>
          )}

          {/* Knife beside the cake (rests on the right side, draggable/clickable once candles are blown) */}
          {blown && cutStatus === "uncut" && (
            <g
              style={{
                transform: `translate(${knifePos.x}px, ${knifePos.y}px)`,
                cursor: isDraggingKnife ? "grabbing" : "grab",
                transition: isDraggingKnife ? "none" : "transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              }}
              onMouseDown={handleKnifeMouseDown}
              onTouchStart={handleKnifeTouchStart}
              onClick={handleKnifeClick}
            >
              <g
                style={{
                  transform: isDraggingKnife ? "rotate(-30deg) scale(1.1)" : "none",
                  transition: "transform 0.25s ease",
                  animation: isDraggingKnife ? "none" : "bounce-gentle 2.2s ease-in-out infinite",
                }}
              >
                {/* Blade */}
                <path d="M -1,-15 L 1,-15 L 1,0 C 1,2 0,3 -1,3 Z" fill="#E2E8F0" stroke={GOLD} strokeWidth="0.8" />
                {/* Handle */}
                <rect x="-0.6" y="-22" width="1.2" height="7" rx="0.3" fill={INK} stroke={GOLD} strokeWidth="0.6" />
                
                {/* Pulsing ring around the handle */}
                {!isDraggingKnife && (
                  <circle cx="0" cy="-10" r="16" fill="transparent" stroke={GOLD} strokeWidth="0.8" strokeDasharray="2 2" style={{ opacity: 0.6 }} />
                )}
                
                {/* Invisible interactive area */}
                <circle cx="0" cy="-10" r="18" fill="transparent" style={{ pointerEvents: "auto" }} />
              </g>
            </g>
          )}
        </svg>
      </div>

      <p style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700,
        fontSize: "12px",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: (blown || cutStatus === "cut") ? GOLD : "rgba(255,255,255,0.4)",
        marginTop: "0.5rem",
        transition: "color 0.3s ease",
        textAlign: "center",
      }}>
        {!blown && "💡 Hover or click to blow out the candles"}
        {blown && cutStatus === "uncut" && "🔪 Drag the knife from the right or click it to cut the cake!"}
        {cutStatus === "cutting" && "🍰 Slicing through the sweetness..."}
        {cutStatus === "cut" && "✨ Make a wish, Thalu! ✨"}
      </p>

      {cutStatus === "cut" && (
        <button
          onClick={() => {
            const text = `🍰 Here is a slice of my birthday cake! Thank you for the wishes and for celebrating with me! 🎂✨`;
            const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
            window.open(waUrl, "_blank");
          }}
          style={{
            marginTop: "1.2rem",
            padding: "0.75rem 1.6rem",
            background: "linear-gradient(135deg, #0f6c56 0%, #1db854 100%)",
            border: `1.5px solid ${GOLD}`,
            borderRadius: "50px",
            color: BG,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "12px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: "pointer",
            boxShadow: "0 0 15px rgba(29, 184, 84, 0.2)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            animation: "seal-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.06) translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 0 25px rgba(29, 184, 84, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1.0) translateY(0px)";
            e.currentTarget.style.boxShadow = "0 0 15px rgba(29, 184, 84, 0.2)";
          }}
        >
          {/* WhatsApp SVG Icon */}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.031 2c-5.524 0-10 4.476-10 10 0 1.905.534 3.686 1.464 5.207l-1.495 5.464 5.612-1.473c1.472.853 3.178 1.342 4.99 1.342 5.524 0 10-4.476 10-10s-4.476-10-10-10zm5.836 14.193c-.24.675-1.393 1.272-1.921 1.326-.48.049-.933.242-2.993-.578-2.637-1.048-4.304-3.763-4.437-3.939-.133-.176-1.077-1.428-1.077-2.723 0-1.294.675-1.927.915-2.186.24-.26.528-.324.704-.324.176 0 .352.001.504.009.162.007.38-.061.594.462.221.536.756 1.848.822 1.984.066.136.11.294.022.476-.088.176-.132.287-.264.441-.132.154-.277.344-.396.462-.132.132-.27.276-.117.536.153.26.68 1.11 1.458 1.802.997.89 1.84 1.168 2.098 1.298.26.13.411.11.564-.066.153-.176.66-.767.836-1.029.176-.26.352-.22.594-.132.24.088 1.528.72 1.792.852.264.132.44.198.506.31.066.11.066.637-.174 1.312z" />
          </svg>
          Send Thank You Slice
        </button>
      )}

      <style>{`
        @keyframes flicker {
          0%   { transform: scaleX(0.9) scaleY(0.9) rotate(-2deg); }
          100% { transform: scaleX(1.1) scaleY(1.15) rotate(2deg); }
        }
        @keyframes smoke-drift {
          0%   { stroke-dashoffset: 0; opacity: 1; transform: translateY(0) scaleX(1); }
          100% { stroke-dashoffset: 10; opacity: 0; transform: translateY(-8px) scaleX(1.5); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1.0); }
          50%      { transform: scale(1.18); }
        }
        @keyframes reveal-heart {
          0%   { transform: scale(0) translateY(12px); opacity: 0; }
          100% { transform: scale(1.8) translateY(0); opacity: 1; }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px) rotate(15deg); }
          50%      { transform: translateY(-5px) rotate(18deg); }
        }
      `}</style>
    </div>
  );
}

/* ─── FLOATING GOLD DUST BACKDROP ─────────────────────────────────────────── */
function GoldDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedY: number = 0;
      speedX: number = 0;
      alpha: number = 0;
      color: string = "";

      constructor() {
        this.reset(true);
      }

      reset(initY = false) {
        this.x = Math.random() * width;
        this.y = initY ? Math.random() * height : height + 10;
        this.size = Math.random() * 2.2 + 0.8;
        this.speedY = -(Math.random() * 0.45 + 0.15);
        this.speedX = Math.random() * 0.3 - 0.15;
        this.alpha = Math.random() * 0.4 + 0.15;
        const goldColors = [
          "rgba(201, 168, 76, ",
          "rgba(240, 211, 129, ",
          "rgba(255, 224, 102, ",
          "rgba(168, 135, 58, "
        ];
        this.color = goldColors[Math.floor(Math.random() * goldColors.length)];
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.08;
        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset(false);
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color + this.alpha + ")";
        context.shadowBlur = this.size * 3;
        context.shadowColor = "#c9a84c";
        context.fill();
        context.restore();
      }
    }

    const particles: Particle[] = Array.from({ length: 35 }, () => new Particle());

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
      }
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });
      animFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.85,
      }}
    />
  );
}

/* ─── GOLD FOIL SCRATCH CARD ──────────────────────────────────────────────── */
function ScratchCard({ name, secretMessage }: { name: string; secretMessage: string }) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [revealed,    setRevealed]    = useState(false);
  const [hovered,     setHovered]     = useState(false);
  const isDrawing    = useRef(false);

  // ── Draw gold foil cover (always in logical CSS-pixel coords, transform is already set) ──
  const drawCover = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.clearRect(0, 0, w, h);

    // Rich metallic gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0,    "#d4af37");
    grad.addColorStop(0.25, "#fff2b2");
    grad.addColorStop(0.5,  "#aa7c11");
    grad.addColorStop(0.75, "#fff2b2");
    grad.addColorStop(1,    "#d4af37");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle sparkle dust
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    for (let i = 0; i < 45; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 1.4 + 0.6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Inner inset border
    ctx.strokeStyle = "rgba(10,10,10,0.14)";
    ctx.lineWidth = 1;
    ctx.strokeRect(7, 7, w - 14, h - 14);

    // Four-point sparkle icon (above name)
    const sc = 8, sx = w / 2, sy = h / 2 - 22;
    ctx.fillStyle = "rgba(10,10,10,0.72)";
    ctx.beginPath();
    ctx.moveTo(sx, sy - sc);
    ctx.quadraticCurveTo(sx, sy, sx + sc, sy);
    ctx.quadraticCurveTo(sx, sy, sx, sy + sc);
    ctx.quadraticCurveTo(sx, sy, sx - sc, sy);
    ctx.quadraticCurveTo(sx, sy, sx, sy - sc);
    ctx.closePath();
    ctx.fill();

    // Name text
    ctx.fillStyle = "#0a0a0a";
    ctx.font = "900 22px 'Barlow Condensed', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(name.toUpperCase(), w / 2, h / 2 + 10);
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    // ── KEY FIX: observe the CONTAINER, not the canvas.
    // Observing the canvas caused an infinite loop:
    //   canvas.width = N  →  ResizeObserver fires  →  canvas.width = N*dpr  →  fires again  → OOM
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) continue;

        // Size the backing store at device resolution
        canvas.width  = Math.round(width  * dpr);
        canvas.height = Math.round(height * dpr);

        // Absolute (not additive) DPR transform so logical coords stay correct
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        drawCover(ctx, width, height);
      }
    });

    ro.observe(container);
    return () => ro.disconnect();
  }, [name]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Scratch handler ────────────────────────────────────────────────────────
  const getClientXY = (e: React.MouseEvent | React.TouchEvent) => {
    if ("touches" in e) {
      if (e.touches.length === 0) return null;
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || revealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pt = getClientXY(e);
    if (!pt) return;

    const rect = canvas.getBoundingClientRect();
    // Map to logical CSS pixel coordinates (matching the DPR transform on ctx)
    const lx = (pt.x - rect.left)  * (canvas.width  / rect.width  / (window.devicePixelRatio || 1));
    const ly = (pt.y - rect.top)   * (canvas.height / rect.height / (window.devicePixelRatio || 1));

    // Draw eraser in logical space (transform already scales to backing store)
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(lx, ly, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Check scratch completion
    checkScratch(canvas);
  };

  // Sample every 32nd pixel to avoid OOM on high-DPR canvases
  const checkScratch = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Read a small downsampled region to avoid OOM
    const sampleW = Math.ceil(canvas.width  / 4);
    const sampleH = Math.ceil(canvas.height / 4);
    const imgData = ctx.getImageData(0, 0, sampleW, sampleH);
    const pixels  = imgData.data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 10) transparent++;
    }
    const pct = (transparent / (sampleW * sampleH)) * 100;
    if (pct > 45) {
      setIsScratched(true);
      setTimeout(() => setRevealed(true), 350);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); isDrawing.current = false; }}
      style={{
        width: "100%",
        height: "240px",
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        border: `1.5px solid ${GOLD}`,
        background: "#121212",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: hovered
          ? "0 15px 30px rgba(212,175,55,0.25)"
          : "0 8px 20px rgba(0,0,0,0.4)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease",
        animation: "seal-pop 0.6s cubic-bezier(.16,1,.3,1)",
        userSelect: "none",
      }}
    >
      {/* Hidden content revealed after scratching */}
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "radial-gradient(circle, #1a1a1a 0%, #0a0a0a 100%)",
        }}
      >
        <span style={{ fontSize: "1.2rem", marginBottom: "0.1rem" }}>🤝</span>
        <p style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800,
          fontSize: "11px",
          color: GOLD,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "0.2rem",
        }}>From {name}</p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: "12px",
          color: BG,
          lineHeight: 1.6,
          overflowY: "auto",
          maxHeight: "160px",
        }}>{secretMessage}</p>
      </div>

      {/* Gold foil scratch overlay */}
      {!revealed && (
        <canvas
          ref={canvasRef}
          onMouseDown={(e) => { isDrawing.current = true; scratch(e); }}
          onMouseMove={scratch}
          onMouseUp={() => { isDrawing.current = false; }}
          onMouseLeave={() => { isDrawing.current = false; }}
          onTouchStart={(e) => { isDrawing.current = true; scratch(e); }}
          onTouchMove={scratch}
          onTouchEnd={() => { isDrawing.current = false; }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            cursor: "crosshair",
            opacity: isScratched ? 0 : 1,
            transition: "opacity 0.4s ease",
            touchAction: "none",
          }}
        />
      )}
    </div>
  );
}

interface WishesVideoProps {
  onVideoPlayingChange?: (isPlaying: boolean) => void;
}

function WishesVideo({ onVideoPlayingChange }: WishesVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isBuffering, setIsBuffering] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startPlay = async () => {
      try {
        video.muted = true;
        setIsMuted(true);
        await video.play();
        setIsPlaying(true);
        onVideoPlayingChange?.(true);
        
        setTimeout(async () => {
          try {
            video.muted = false;
            setIsMuted(false);
          } catch (e) {
            console.log("Could not auto-unmute:", e);
          }
        }, 100);
      } catch (error) {
        console.log("Autoplay prevented:", error);
        setIsPlaying(false);
        onVideoPlayingChange?.(false);
      }
    };

    const t = setTimeout(startPlay, 1000);
    return () => clearTimeout(t);
  }, [onVideoPlayingChange]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play()
        .then(() => {
          setIsPlaying(true);
          onVideoPlayingChange?.(true);
        })
        .catch(err => console.log(err));
    } else {
      video.pause();
      setIsPlaying(false);
      onVideoPlayingChange?.(false);
    }
  };

  const handleMuteUnmute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    onVideoPlayingChange?.(false);
    setProgress(0);
  };

  return (
    <div
      style={{
        background: "#0a0a0a",
        borderRadius: "16px",
        border: `2px solid ${GOLD}`,
        boxShadow: isPlaying 
          ? `0 20px 50px rgba(201, 168, 76, 0.25)` 
          : "0 10px 30px rgba(0, 0, 0, 0.5)",
        overflow: "hidden",
        position: "relative",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        width: "100%",
        aspectRatio: "9/16",
      }}
    >
      {/* Buffering/Loading Indicator */}
      {isBuffering && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10, 10, 10, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: GOLD,
            zIndex: 9,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              border: `3px solid rgba(201, 168, 76, 0.25)`,
              borderTop: `3px solid ${GOLD}`,
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              marginBottom: "12px",
            }}
          />
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Buffering Wishes (68MB file)...
          </span>
        </div>
      )}

      <video
        ref={videoRef}
        src="/wishesvideo.mp4"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        onClick={handlePlayPause}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        onCanPlay={() => setIsBuffering(false)}
        onCanPlayThrough={() => setIsBuffering(false)}
        onLoadStart={() => setIsBuffering(true)}
        onError={() => setIsBuffering(false)}
        playsInline
      />

      {isMuted && isPlaying && (
        <div
          onClick={handleMuteUnmute}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "rgba(10, 10, 10, 0.75)",
            border: `1px solid ${GOLD}`,
            borderRadius: "8px",
            padding: "6px 12px",
            color: GOLD,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "11px",
            letterSpacing: "0.08em",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            zIndex: 10,
            animation: "pulse-mute 1.5s infinite",
            userSelect: "none",
          }}
        >
          <span>🔊</span> Click to Unmute
        </div>
      )}

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 70%, transparent 100%)",
          padding: "1rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          opacity: 1,
          transition: "opacity 0.3s ease",
          zIndex: 8,
        }}
      >
        <div
          onClick={(e) => {
            const video = videoRef.current;
            if (!video) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newTime = (clickX / rect.width) * video.duration;
            video.currentTime = newTime;
          }}
          style={{
            width: "100%",
            height: "4px",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "2px",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: GOLD,
              borderRadius: "2px",
              transition: "width 0.1s linear",
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={handlePlayPause}
              style={{
                background: "none",
                border: "none",
                color: BG,
                fontSize: "16px",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = GOLD}
              onMouseLeave={e => e.currentTarget.style.color = BG}
            >
              {isPlaying ? "⏸️" : "▶️"}
            </button>

            <button
              onClick={handleMuteUnmute}
              style={{
                background: "none",
                border: "none",
                color: BG,
                fontSize: "16px",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = GOLD}
              onMouseLeave={e => e.currentTarget.style.color = BG}
            >
              {isMuted ? "🔇" : "🔊"}
            </button>

            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "0.08em",
                color: GOLD,
                textTransform: "uppercase",
              }}
            >
              🎬 A Special Message for You
            </span>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-mute {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 rgba(201, 168, 76, 0); }
          50%      { transform: scale(1.03); box-shadow: 0 0 12px rgba(201, 168, 76, 0.4); }
        }
      `}</style>
    </div>
  );
}

/* ─── LETTER ──────────────────────────────────────────────────────────────── */
function LetterSection({
  dateStr,
  onFire,
  onCakeVisibleChange,
  onLetterVisibleChange,
  onCakeCut,
  onVideoPlayingChange,
}: {
  dateStr: string;
  onFire: (opts?: { type?: "default" | "hearts"; x?: number; y?: number }) => void;
  onCakeVisibleChange?: (visible: boolean) => void;
  onLetterVisibleChange?: (visible: boolean) => void;
  onCakeCut?: () => void;
  onVideoPlayingChange?: (isPlaying: boolean) => void;
}) {
  const [shown, setShown] = useState(0);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const cakeContainerRef = useRef<HTMLDivElement>(null);
  const letterContainerRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const [isCakeFullyCut, setIsCakeFullyCut] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        if (!started.current) {
          started.current = true;
          const iv = setInterval(() => setShown(p => { if (p >= LETTER.length) { clearInterval(iv); return p; } return p + 1; }), 700);
        }
      }
    }, { threshold: 0.12 });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // Observe cake visibility
  useEffect(() => {
    if (!onCakeVisibleChange) return;
    const obs = new IntersectionObserver(([e]) => {
      onCakeVisibleChange(e.isIntersecting);
    }, { threshold: 0.2 });
    if (cakeContainerRef.current) obs.observe(cakeContainerRef.current);
    return () => obs.disconnect();
  }, [onCakeVisibleChange]);

  // Observe letter container visibility
  useEffect(() => {
    if (!onLetterVisibleChange) return;
    const obs = new IntersectionObserver(([e]) => {
      onLetterVisibleChange(e.isIntersecting);
    }, { threshold: 0.1 });
    if (letterContainerRef.current) obs.observe(letterContainerRef.current);
    return () => obs.disconnect();
  }, [onLetterVisibleChange]);

  return (
    <section id="letter" ref={containerRef} style={{ background: INK, borderTop: `1px solid rgba(255,255,255,0.05)`, position: "relative", overflow: "hidden" }}>
      {/* Floating Gold Dust Backdrop */}
      {visible && <GoldDust />}


      {/* Age Timer — moved here from between Gallery and Letter */}
      {visible && <AgeTimerSection />}

      {/* Cake and Video Container */}
      <div
        ref={cakeContainerRef}
        className="cake-video-row"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.95)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className={isCakeFullyCut ? "cake-wrapper-cut" : "cake-wrapper"}>
          {visible && (
            <BirthdayCake 
              onFire={onFire} 
              onCut={onCakeCut} 
              onCutComplete={() => setIsCakeFullyCut(true)} 
            />
          )}
        </div>

        {isCakeFullyCut && (
          <div
            className="video-panel"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              animation: "video-slide-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards",
            }}
          >
            <WishesVideo onVideoPlayingChange={onVideoPlayingChange} />
          </div>
        )}
      </div>

      <style>{`
        @keyframes video-slide-in {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Wishes and Blessings Section */}
      <div className="wishes-pad">
        {/* ── Scratch Cards — horizontal grid ABOVE the letter ── */}
        {visible && (
          <div style={{ marginBottom: "3.5rem", animation: "seal-pop 0.8s cubic-bezier(.16,1,.3,1) both" }}>
            {/* Sub-heading */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1rem" }}>
              <p style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                fontSize: "15px", letterSpacing: "0.25em", textTransform: "uppercase",
                color: GOLD,
              }}>Wishes & Blessings</p>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300,
                fontSize: "12px", color: "rgba(255,255,255,0.35)",
              }}>· Scratch each gold card to reveal</p>
            </div>

            {/* Responsive grid — 1 col mobile, 2 col tablet, 3 col desktop */}
            <div className="scratch-grid">
              {WISHES.map((w, idx) => (
                <ScratchCard key={idx} name={w.name} secretMessage={w.message} />
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div style={{ borderTop: `1px solid rgba(255,255,255,0.07)`, marginBottom: "2.5rem" }} />
      </div>

      {/* ── Letter — full width below scratch cards ── */}
      <div
        ref={letterContainerRef}
        className="letter-body-pad"
      >
        <div style={{ maxWidth: "720px" }}>
          {LETTER.map((line, i) => {
            const isCloser = line.style === "closer";
            return (
              <div key={i} style={{
                opacity: shown > i ? 1 : 0,
                transform: shown > i ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                marginBottom: isCloser ? "0" : line.style === "opener" ? "2.5rem" : line.style === "highlight" ? "1.8rem" : "1.4rem",
                ...(line.style === "highlight" ? { borderLeft: "5px solid #ffffff", paddingLeft: "1.5rem" } : {}),
              }}>
                {isCloser ? (
                  <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {/* Text before logo */}
                    <p style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 900,
                      fontSize: "1.2rem",
                      color: "#ffffff",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      lineHeight: 1.6,
                    }}>— With everything I have 🤝</p>


                    {/* Wish text after logo */}
                    <div>
                      <p style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 900,
                        fontSize: "1.2rem",
                        color: "#ffffff",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}>Happy Birthday, {FRIEND_NAME} ❤️</p>
                      <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.28)",
                        letterSpacing: "0.1em",
                        marginTop: "4px",
                      }}>Sealed with love · Just for you</p>
                    </div>
                  </div>
                ) : (
                  <p style={{
                    fontFamily: line.style === "opener" ? "'Barlow Condensed', sans-serif" : "'Inter', sans-serif",
                    fontWeight: line.style === "opener" ? 900 : line.style === "highlight" ? 400 : 300,
                    fontSize: line.style === "opener" ? "1.5rem" : line.style === "highlight" ? "1rem" : "0.92rem",
                    lineHeight: 1.9,
                    color: line.style === "highlight" ? "#ffffff" : line.style === "opener" ? "#ffffff" : "rgba(255,255,255,0.75)",
                    textTransform: line.style === "opener" ? "uppercase" : "none",
                    letterSpacing: line.style === "opener" ? "0.05em" : "0",
                  }}>{line.text}</p>
                )}
              </div>
            );
          })}


        </div>
      </div>

      {/* Footer */}
      <div className="letter-footer">
        <div className="letter-footer-item">Birthday Vault</div>
        <div className="letter-footer-item letter-footer-item-center">{FRIEND_NAME} · {dateStr}</div>
        <div className="letter-footer-item letter-footer-item-right">Made with love</div>
      </div>
    </section>
  );
}

/* ─── FLOATING BUTTON ─────────────────────────────────────────────────────── */
function FloatingHeart({ onFire }: { onFire: () => void }) {
  const [pop, setPop] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const handleClick = () => {
    setPop(true);
    setShowTip(true);
    onFire();
    setTimeout(() => setPop(false), 400);
    setTimeout(() => setShowTip(false), 1600);
  };

  return (
    <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 200 }}>
      {/* Tooltip */}
      {showTip && (
        <div style={{
          position: "absolute", bottom: "110%", right: 0,
          background: INK, color: BG,
          fontSize: "11px", fontWeight: 700,
          fontFamily: "'Barlow Condensed', sans-serif",
          letterSpacing: "0.08em", textTransform: "uppercase",
          padding: "5px 12px", borderRadius: "8px",
          whiteSpace: "nowrap",
          animation: "tip-pop 0.25s cubic-bezier(.16,1,.3,1) both",
        }}>🎉 Celebrate!</div>
      )}
      {/* Gold pulse ring */}
      <div style={{
        position: "absolute", inset: -6, borderRadius: "50%",
        border: `2px solid ${GOLD}`,
        animation: pop ? "none" : "ring-pulse 2.4s ease-in-out infinite",
        opacity: pop ? 0 : 1,
        pointerEvents: "none",
      }} />
      <button
        onClick={handleClick}
        title="Fire confetti!"
        style={{
          width: "52px", height: "52px", borderRadius: "50%",
          background: INK, border: "none", color: BG,
          cursor: "pointer", fontSize: "22px",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          transform: pop ? "scale(1.32)" : "scale(1)",
          transition: "transform 0.2s cubic-bezier(.16,1,.3,1), box-shadow 0.2s",
          position: "relative",
        }}
      >🎂</button>
      <style>{`
        @keyframes ring-pulse {
          0%,100% { transform: scale(1);    opacity: 0.55; }
          50%      { transform: scale(1.35); opacity: 0.15; }
        }
        @keyframes tip-pop {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
      `}</style>
    </div>
  );
}

/* ─── MAIN PAGE ───────────────────────────────────────────────────────────── */
export default function VaultPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [muted, setMuted] = useState(false);
  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bdayAudioRef = useRef<HTMLAudioElement | null>(null);
  const [cakeVisible, setCakeVisible] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);
  const [cakeCut, setCakeCut] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const lastScrollY = useRef(0);
  const { canvasRef, fire, cleanup } = useConfetti();

  const fadeAudio = (audio: HTMLAudioElement, targetVolume: number, duration: number = 800) => {
    if (!audio) return;
    
    if ((audio as any).fadeInterval) {
      clearInterval((audio as any).fadeInterval);
    }
    
    if (targetVolume > 0 && audio.paused) {
      audio.play().catch(() => {});
    }
    
    const steps = 20;
    const stepTime = duration / steps;
    const volStep = (targetVolume - audio.volume) / steps;
    
    (audio as any).fadeInterval = setInterval(() => {
      let nextVol = audio.volume + volStep;
      if ((volStep > 0 && nextVol >= targetVolume) || (volStep < 0 && nextVol <= targetVolume)) {
        audio.volume = targetVolume;
        clearInterval((audio as any).fadeInterval);
        if (targetVolume === 0) {
          audio.pause();
        }
      } else {
        audio.volume = Math.max(0, Math.min(1, nextVol));
      }
    }, stepTime);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY <= 10) {
        setHeaderVisible(true);
      } else {
        if (currentScrollY > lastScrollY.current) {
          setHeaderVisible(false);
        } else {
          setHeaderVisible(true);
        }
      }
      
      lastScrollY.current = currentScrollY;
      setScrolled(currentScrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setDateStr(now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase());
      setTimeStr(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  // Audio state controller
  useEffect(() => {
    if (!unlocked) return;
    
    const mainAudio = audioRef.current;
    const bdayAudio = bdayAudioRef.current;
    if (!mainAudio || !bdayAudio) return;

    if (muted) {
      mainAudio.muted = true;
      bdayAudio.muted = true;
      mainAudio.pause();
      bdayAudio.pause();
      return;
    }

    mainAudio.muted = false;
    bdayAudio.muted = false;

    // Should play birthday song if cake is visible (plays until cake is fully scrolled out of view)
    const shouldPlayBday = cakeVisible && !isVideoPlaying;
    // Should play main background music if cake is not visible and letter is not visible
    const shouldPlayMain = !cakeVisible && !letterVisible && !isVideoPlaying;

    if (shouldPlayBday) {
      fadeAudio(mainAudio, 0, 800);
      fadeAudio(bdayAudio, 0.45, 800);
    } else if (shouldPlayMain) {
      fadeAudio(bdayAudio, 0, 800);
      fadeAudio(mainAudio, 0.45, 800);
    } else {
      // Silence during letter reading (cake is gone, letter is visible) or when wishes video is playing
      fadeAudio(mainAudio, 0, 800);
      fadeAudio(bdayAudio, 0, 800);
    }

    return () => {
      if ((mainAudio as any).fadeInterval) clearInterval((mainAudio as any).fadeInterval);
      if ((bdayAudio as any).fadeInterval) clearInterval((bdayAudio as any).fadeInterval);
    };
  }, [unlocked, muted, cakeVisible, letterVisible, cakeCut, isVideoPlaying]);

  const handleToggleMute = useCallback(() => {
    setMuted(prev => !prev);
  }, []);

  const handleUnlock = useCallback(() => {
    setTimeout(() => {
      setUnlocked(true);
      // Fire confetti with a small delay so the page has rendered first
      setTimeout(fire, 200);
    }, 900);
  }, [fire]);

  // Cleanup confetti on unmount — must be before any conditional return
  useEffect(() => cleanup, [cleanup]);

  if (!unlocked) return <GateScreen onUnlock={handleUnlock} dateStr={dateStr} timeStr={timeStr} />;

  return (
    <div style={{ background: BG, minHeight: "100vh", animation: "fade-in 0.6s ease" }}>
      {/* Confetti cannon — fires on unlock */}
      <ConfettiCanvas r={canvasRef} />
      {/* Hidden audio elements */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src="/newmusic.mpeg" loop preload="auto" />
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={bdayAudioRef} src="/birthdaysong.mp3" loop preload="auto" />
      <Header scrolled={scrolled} visible={headerVisible} muted={muted} onToggleMute={handleToggleMute} />
      <HeroSection dateStr={dateStr} timeStr={timeStr} onFire={fire} />
      <StorySection />
      <GallerySection />
      <LetterSection 
        dateStr={dateStr} 
        onFire={fire}
        onCakeVisibleChange={setCakeVisible}
        onLetterVisibleChange={setLetterVisible}
        onCakeCut={() => setCakeCut(true)}
        onVideoPlayingChange={setIsVideoPlaying}
      />
      <FloatingHeart onFire={fire} />
    </div>
  );
}
