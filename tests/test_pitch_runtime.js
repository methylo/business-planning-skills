const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const out = process.argv[2] || path.join(os.tmpdir(), 'business-planning-skills-pitch-test.pptx');
execFileSync(process.execPath, [
  path.join(root, 'bizplan-kstartup-pitch/scripts/build-pitch.js'),
  path.join(root, 'bizplan-kstartup-pitch/examples/pitch-input.example.json'),
  out,
], { stdio: 'inherit' });
if (!fs.existsSync(out) || fs.statSync(out).size < 10000) {
  throw new Error('PPTX was not created');
}
console.log(`PITCH_TEST_OK ${out}`);
