const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const { spawn } = require('child_process');
const fs = require('fs');

console.log('FFmpeg binary path:', ffmpeg.path);

const args = [
  '-y',
  '-i', 'public/wishesvideo.mp4',
  '-c:v', 'libx264',
  '-pix_fmt', 'yuv420p',
  '-preset', 'faster',
  '-profile:v', 'high',
  '-level:v', '4.0',
  '-c:a', 'copy',
  '-movflags', '+faststart',
  'public/wishesvideo_h264.mp4'
];

const child = spawn(ffmpeg.path, args);

child.on('close', (code) => {
  console.log(`\nFFmpeg process exited with code ${code}`);
  if (code === 0) {
    console.log('Transcoding successful!');
    try {
      if (fs.existsSync('public/wishesvideo_orig.mp4')) {
        fs.unlinkSync('public/wishesvideo_orig.mp4');
      }
      fs.renameSync('public/wishesvideo.mp4', 'public/wishesvideo_orig.mp4');
      fs.renameSync('public/wishesvideo_h264.mp4', 'public/wishesvideo.mp4');
      console.log('Successfully replaced public/wishesvideo.mp4 with the web-optimized H.264 version!');
    } catch (err) {
      console.error('Error replacing files:', err);
    }
  } else {
    console.error('Transcoding failed!');
  }
});
// Simple progress logging
let lastLogged = Date.now();
child.stderr.on('data', (data) => {
  const str = data.toString();
  if (str.includes('time=') || Date.now() - lastLogged > 2000) {
    process.stdout.write(str.substring(0, 120) + '\r');
    lastLogged = Date.now();
  }
});
