const { spawn } = require('child_process');

// https://rollupjs.org/guide/en#command-line-reference
module.exports = async ({ configPath }) => {
  const rollupBin = require.resolve('rollup/bin/rollup');

  return new Promise((resolve, reject) => {
    const rollupWorker = spawn(rollupBin, ['--config', configPath]);

    process.on('exit', () => rollupWorker.kill('SIGTERM'));

    rollupWorker.stdout.on('data', (buffer) => {
      console.log(buffer.toString());
    });

    rollupWorker.on('exit', code => code === 0 ?
      resolve() : reject(new Error(`rollup exited with code ${code}`)),
    );
  });
};