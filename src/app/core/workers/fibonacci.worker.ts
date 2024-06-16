/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  let n1 = 0, n2 = 1;
  let result;

  for (let i = 0; i <= data; i++) {
    result = n2 + n1;
    n1 = n2
    n2 = result
  }

  postMessage('Job finished');
});
