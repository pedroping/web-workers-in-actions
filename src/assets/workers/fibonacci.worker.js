(() => {
  'use strict';
  addEventListener('message', ({ data: a }) => {
    let t,
      s = 0,
      e = 1;
    for (let r = 0; r <= a; r++) ((t = e + s), (s = e), (e = t));
    postMessage('Job finished');
  });
})();
