const fs = require('fs');
const path = require('path');
const { setup } = require('haste-test-utils');

const fromFixture = (filename) => {
  return fs.readFileSync(path.join(__dirname, filename), 'utf8');
};

const taskPath = require.resolve('../src');

console.log(setup);

describe('haste-task-rollup', () => {
  it ('should bundle with rollup', async () => {
    const test = await setup({
      'entry.js': fromFixture('./fixtures/entry.js')
    });

    await test.run(async ({ [taskPath]: rollup }) => {
      await rollup({
        inputOptions: {
          input: test.files['entry.js'].path
        },
        outputOptions: {
          file: 'bundle.js',
          format: 'umd',
        },
      });
    });

    expect(test.files['bundle.js'].exists).toBe(true);

    test.cleanup();
  });
});