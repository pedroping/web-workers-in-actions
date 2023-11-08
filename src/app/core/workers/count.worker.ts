/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {

  for (let num of data) {
    let result = 0;
    for (let i = 0; i < num; i++) {
      result++;
    }
  }

  postMessage('Job finished');
});
