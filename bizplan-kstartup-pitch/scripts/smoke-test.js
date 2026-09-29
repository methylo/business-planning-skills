const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const output = path.join(os.tmpdir(), `bizplan-kstartup-pitch-${process.pid}.pptx`);

execFileSync(
  process.execPath,
  [
    path.join(root, 'scripts', 'build-pitch.js'),
    path.join(root, 'examples', 'pitch-input.example.json'),
    output,
  ],
  { stdio: 'inherit' },
);

const stats = fs.statSync(output);
if (stats.size < 10000) throw new Error('Generated PPTX is unexpectedly small');
fs.unlinkSync(output);
console.log('PITCH_PACKAGE_SMOKE_OK');
