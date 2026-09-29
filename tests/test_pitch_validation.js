const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { validate } = require('../bizplan-kstartup-pitch/scripts/build-pitch');

const examplePath = path.join(__dirname, '..', 'bizplan-kstartup-pitch', 'examples', 'pitch-input.example.json');
const load = () => JSON.parse(fs.readFileSync(examplePath, 'utf8'));

const valid = load();
assert.doesNotThrow(() => validate(valid));
assert.strictEqual(valid.solution.comparison.header[0], '대안');
assert.strictEqual(valid.solution.comparison.rows[valid.solution.comparison.highlightRow][0], '자사');

const noSize = load();
delete noSize.market.size;
assert.throws(() => validate(noSize), /market\.size/);

const badPattern = load();
badPattern.meta.pattern = 'D';
assert.throws(() => validate(badPattern), /meta\.pattern/);

const badComparison = load();
badComparison.solution.comparison.rows[0] = ['열 부족'];
assert.throws(() => validate(badComparison), /solution\.comparison\.rows/);

const tooManyBullets = load();
tooManyBullets.problem.definition = ['1', '2', '3', '4', '5', '6'];
assert.throws(() => validate(tooManyBullets), /problem\.definition/);

const tooManyRows = load();
tooManyRows.solution.comparison.rows = Array.from({ length: 9 }, () => ['항목', '값', '값']);
assert.throws(() => validate(tooManyRows), /solution\.comparison\.rows/);

const badHighlight = load();
badHighlight.solution.comparison.highlightRow = 99;
assert.throws(() => validate(badHighlight), /solution\.comparison\.highlightRow/);

const objectBullet = load();
objectBullet.market.target = [{ text: '문자열이 아님' }];
assert.throws(() => validate(objectBullet), /market\.target/);

const missingPattern = load();
delete missingPattern.meta.pattern;
assert.throws(() => validate(missingPattern), /meta\.pattern/);

const missingClosingContact = load();
delete missingClosingContact.closing.contact;
assert.throws(() => validate(missingClosingContact), /closing\.contact/);

const objectTitle = load();
objectTitle.meta.title = { text: '제목' };
assert.throws(() => validate(objectTitle), /meta\.title/);

const blankTitle = load();
blankTitle.meta.title = '   ';
assert.throws(() => validate(blankTitle), /meta\.title/);

const objectCareer = load();
objectCareer.team.members[0].career = { text: '이력' };
assert.throws(() => validate(objectCareer), /team\.members\[0\]\.career/);

const blankCell = load();
blankCell.solution.comparison.rows[0][1] = '   ';
assert.throws(() => validate(blankCell), /solution\.comparison\.rows\[0\]\[1\]/);

console.log('PITCH_VALIDATION_TEST_OK');
