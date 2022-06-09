export default {
  extensions: {
    ts: 'module',
  },
  nodeArguments: [
    '--no-warnings', // disable "--experimental-loader is an experimental feature"
    '--loader=ts-node/esm',
  ],
};
