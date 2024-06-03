import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebWorkesTestService {
  mainNumCount = 0;

  startDomain() {
    console.log('Test start');
    // this.countToBigNum();
    // this.fibbonacciSequence();
  }

  createCountWorker() {
    return new Worker(new URL('../workers/count.worker', import.meta.url));
  }

  createFibbonaciWorker() {
    return new Worker(new URL('../workers/fibonacci.worker', import.meta.url));
  }

  countToBigNum() {
    this.countToBigNumMain();
    this.countToBigNumWorker();
  }

  fibbonacciSequence() {
    this.fibbonacciSequenceMain();
    this.fibbonacciSequenceWorker();
  }

  fibbonacciSequenceMain() {
    const number = 1e9;
    let n1 = 0,
      n2 = 1;
    let result;

    const initialTick = performance.now();

    for (let i = 0; i <= number; i++) {
      result = n2 + n1;
      n1 = n2;
      n2 = result;
    }

    const finalTick = performance.now();

    console.log(
      `Fibbonacci of ${number} on main thread: ${finalTick - initialTick} ms`
    );
  }

  fibbonacciSequenceWorker() {
    const number = 1e9;

    const worker = this.createFibbonaciWorker();

    worker.onmessage = () => {
      const finalTick = performance.now();
      console.log(
        `Fibbonacci of ${number} on worker: ${finalTick - initialTick} ms`
      );
    };

    const initialTick = performance.now();
    worker.postMessage(number);
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
    this.mainNumCount = finalTick;

    console.log(
      `Count to a big number on main thread: ${finalTick - initialTick} ms`
    );
  }

  countToBigNumWorker() {
    const numbers = Array.from({ length: 100 }, () => 1e8);

    const workers = 8;
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

        console.log(
          `Time spend difference is ${
            this.mainNumCount - (finalTick - initialTick)
          }`
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

  fib(n: number): number {
    if (n <= 2) return 1;
    return this.fib(n - 1) + this.fib(n - 2);
  }
}
