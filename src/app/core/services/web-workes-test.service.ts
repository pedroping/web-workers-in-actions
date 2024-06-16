import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebWorkesTestService {
  createCountWorker() {
    return new Worker(new URL('../workers/count.worker', import.meta.url));
  }

  countToBigNum() {
    this.countToBigNumMain();
    this.countToBigNumWorker();
  }

  countToBigNumMain() {
    const numbers = Array.from({ length: 100 }, () => 1e8);

    const initialTick = performance.now();

    for (let num of numbers) {
      let result = 0;
      for (let i = 0; i < num; i++) {
        result++;
      }
    }

    const finalTick = performance.now();

    console.log(
      `Count to a big number on main thread: ${finalTick - initialTick} ms`
    );
  }

  countToBigNumWorker() {
    const numbers = Array.from({ length: 100 }, () => 1e8);

    const workers = 10;
    let jobsDones = 0;

    const workerCallBack = () => {
      jobsDones++;

      if (jobsDones === workers) {
        const finalTick = performance.now();

        console.log(
          `Count to a big number on ${workers} workers: ${
            finalTick - initialTick
          } ms`
        );
      }
    };

    const initialTick = performance.now();
    const jobs = numbers.length / workers;

    for (let i = 0; i < workers; i++) {
      const worker = this.createCountWorker();
      worker.onmessage = workerCallBack;
      worker.postMessage(numbers.slice(i * jobs, (i + 1) * jobs));
    }
  }
}
