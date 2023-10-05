import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: 3600,
  checkperiod: 84600,
});

export default cache;
