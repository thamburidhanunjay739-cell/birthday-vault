const fs = require('fs');
const path = require('path');

const memoriesDir = path.join(__dirname, '..', 'public', 'memories');
const pagePath = path.join(__dirname, '..', 'app', 'vault', 'page.tsx');
const files = fs.readdirSync(memoriesDir);

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const CAPTIONS = [
  "Captured Moment",
  "Finding Our Rhythm",
  "Laughter and Stories",
  "A Frame in Time",
  "Golden Hour Vibes",
  "Shared Memories",
  "Simply Us",
  "Side by Side",
  "Unforgettable Days",
  "Lab Chronicles",
  "Sleepless and Smiling",
  "Chasing Dreams",
  "Special Chapter",
  "The Candid Ones",
  "Still Going Strong",
  "Us Against the World",
  "One for the Vault",
  "Summer Vibrations",
  "Frozen in Time",
  "Another Beautiful Day"
];

function getStableHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getImageDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  
  // PNG
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height };
  }
  
  // JPEG
  if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xFF) {
        offset++;
        continue;
      }
      const marker = buffer[offset + 1];
      if (marker >= 0xC0 && marker <= 0xCF && 
          marker !== 0xC4 && marker !== 0xC8 && marker !== 0xCC) {
        const height = (buffer[offset + 5] << 8) + buffer[offset + 6];
        const width = (buffer[offset + 7] << 8) + buffer[offset + 8];
        return { width, height };
      }
      // If segment is invalid or overflow
      if (offset + 3 >= buffer.length) break;
      const length = (buffer[offset + 2] << 8) + buffer[offset + 3];
      offset += 2 + length;
    }
  }
  
  throw new Error('Unsupported image format or invalid header');
}

const photoData = [];

files.forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') return;

  const name = path.basename(file, ext);
  let year = null;
  let monthIndex = null;
  let day = null;
  let timestamp = null;

  // 1. Check for YYYYMMDD_HHMMSS or YYYYMMDD
  let match = name.match(/\b(202[1-6])(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\b/) ||
              name.match(/(202[1-6])(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])/);
  
  if (match) {
    year = match[1];
    monthIndex = parseInt(match[2], 10) - 1;
    day = parseInt(match[3], 10);
  } else {
    // 2. Check for YYYY-MM-DD
    match = name.match(/(202[1-6])-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/);
    if (match) {
      year = match[1];
      monthIndex = parseInt(match[2], 10) - 1;
      day = parseInt(match[3], 10);
    } else {
      // 3. Check for millisecond timestamp
      match = name.match(/\b(16\d{11}|17\d{11})\b/);
      if (match) {
        timestamp = parseInt(match[1], 10);
        const dateObj = new Date(timestamp);
        year = String(dateObj.getFullYear());
        monthIndex = dateObj.getMonth();
        day = dateObj.getDate();
      }
    }
  }

  // Fallback to file system stats if no date parsed
  let finalDateStr = "Recent";
  let finalTag = "Memory";
  let sortKey = new Date().getTime();

  if (year && monthIndex !== null) {
    finalDateStr = `${months[monthIndex]} ${year}`;
    finalTag = year;
    sortKey = new Date(parseInt(year), monthIndex, day || 1).getTime();
  } else {
    try {
      const stats = fs.statSync(path.join(memoriesDir, file));
      const mtime = stats.mtime;
      sortKey = mtime.getTime();
      const mYear = mtime.getFullYear();
      if (mYear >= 2021 && mYear <= 2026) {
        finalDateStr = `${months[mtime.getMonth()]} ${mYear}`;
        finalTag = String(mYear);
      }
    } catch (e) {}
  }

  // Get image dimensions using custom parser
  let width = 600;
  let height = 800; // sensible defaults
  try {
    const dimensions = getImageDimensions(path.join(memoriesDir, file));
    width = dimensions.width || 600;
    height = dimensions.height || 800;
  } catch (e) {
    console.error(`Error getting size for ${file}:`, e.message);
  }

  const hashVal = getStableHash(name);
  const caption = CAPTIONS[hashVal % CAPTIONS.length];

  photoData.push({
    src: `/memories/${file}`,
    caption,
    date: finalDateStr,
    tag: finalTag,
    width,
    height,
    sortKey
  });
});

photoData.sort((a, b) => a.sortKey - b.sortKey);

// Generate JavaScript string representing the array
let generatedArrayStr = "const PHOTOS = [\n";
photoData.forEach(p => {
  generatedArrayStr += `  { src: "${p.src}", caption: "${p.caption}", date: "${p.date}", tag: "${p.tag}", width: ${p.width}, height: ${p.height} },\n`;
});
generatedArrayStr += "];";

// Read and update the page file
let pageContent = fs.readFileSync(pagePath, 'utf8');

const regex = /const\s+PHOTOS\s*=\s*\[[\s\S]*?\n\];/;
if (regex.test(pageContent)) {
  pageContent = pageContent.replace(regex, generatedArrayStr);
  fs.writeFileSync(pagePath, pageContent, 'utf8');
  console.log(`Successfully updated ${photoData.length} photos in page.tsx.`);
} else {
  console.error("Could not find 'const PHOTOS = [ ... ];' declaration in page.tsx!");
}
