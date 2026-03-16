(() => {
  'use strict';
  addEventListener('message', ({ data: s }) => {
    for (let t of s) {
      let r = 0;
      for (let e = 0; e < t; e++) r++;
    }
    postMessage('Job finished');
  });
})();
