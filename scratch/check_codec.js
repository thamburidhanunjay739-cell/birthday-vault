const fs = require('fs');

try {
  const filePath = 'public/wishesvideo.mp4';
  const stats = fs.statSync(filePath);
  const fileSize = stats.size;
  console.log('File size:', fileSize);

  // Let's read the first 1MB and the last 2MB of the file
  const fd = fs.openSync(filePath, 'r');
  
  const startBuf = Buffer.alloc(1024 * 1024);
  fs.readSync(fd, startBuf, 0, startBuf.length, 0);

  const endBuf = Buffer.alloc(Math.min(2 * 1024 * 1024, fileSize));
  fs.readSync(fd, endBuf, 0, endBuf.length, fileSize - endBuf.length);
  fs.closeSync(fd);

  const startStr = startBuf.toString('binary');
  const endStr = endBuf.toString('binary');

  // Check where moov is
  const moovInStart = startStr.includes('moov');
  const moovInEnd = endStr.includes('moov');
  console.log('moov atom at start:', moovInStart);
  console.log('moov atom at end:', moovInEnd);

  // Search for codec signatures in both
  const searchForCodecs = (str, name) => {
    console.log(`Searching in ${name}...`);
    if (str.includes('avc1')) {
      console.log('  Contains avc1 (H.264)');
    }
    if (str.includes('hev1') || str.includes('hvc1')) {
      console.log('  Contains HEVC/H.265 (hev1/hvc1)');
    }
    if (str.includes('mp4a')) {
      console.log('  Contains mp4a (AAC Audio)');
    }
    if (str.includes('vp09')) {
      console.log('  Contains VP9');
    }
    if (str.includes('av01')) {
      console.log('  Contains AV1');
    }
  };

  searchForCodecs(startStr, 'start');
  searchForCodecs(endStr, 'end');

} catch (e) {
  console.error(e);
}
