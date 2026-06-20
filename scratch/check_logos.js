const fs = require('fs');

function getDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  // Find JPEG dimensions
  let i = 0;
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    throw new Error('Not a valid JPEG');
  }
  i += 2;
  while (i < buffer.length) {
    while (buffer[i] !== 0xff) i++;
    while (buffer[i] === 0xff) i++;
    const marker = buffer[i];
    i++;
    if (marker === 0xd9 || marker === 0xda) { // SOS or EOI
      break;
    }
    const size = buffer.readUInt16BE(i);
    if (marker >= 0xc0 && marker <= 0xc3) { // SOF0, SOF1, SOF2
      const height = buffer.readUInt16BE(i + 3);
      const width = buffer.readUInt16BE(i + 5);
      return { width, height };
    }
    i += size;
  }
  return null;
}

try {
  console.log('logo1.jpeg:', getDimensions('public/logo1.jpeg'));
  console.log('logo2.jpeg:', getDimensions('public/logo2.jpeg'));
} catch (e) {
  console.error(e);
}
