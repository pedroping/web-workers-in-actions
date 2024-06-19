import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class WebWorkesTestService {
  mainNumCount = 0;
  mainFibbonacciCount = 0;

  constructor(private toastr: ToastrService) {}

  createCountWorker() {
    return new Worker(new URL('../../workers/count.worker', import.meta.url));
  }

  createFibbonaciWorker() {
    return new Worker(
      new URL('../../workers/fibonacci.worker', import.meta.url)
    );
  }

  fibbonacciSequenceMain() {
    const { onHidden } = this.toastr.info(
      'Iniciando Fibbonacci na Main thread'
    );

    onHidden.subscribe(() => {
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
      this.mainFibbonacciCount = finalTick - initialTick;

      this.toastr.success(
        `Fibbonacci de ${number} na Main thread:  ${(
          finalTick - initialTick
        ).toFixed(0)} ms`
      );
    });
  }

  fibbonacciSequenceWorker() {
    const { onHidden } = this.toastr.info(
      'Iniciando Fibbonacci com Web Workers'
    );

    onHidden.subscribe(() => {
      const number = 1e9;

      const worker = this.createFibbonaciWorker();

      worker.onmessage = () => {
        const finalTick = performance.now();

        if (this.mainFibbonacciCount) {
          const diference =
            this.mainFibbonacciCount - (finalTick - initialTick);
          this.toastr.info(
            `Diferença de tempo gasto: ${
              diference < 0
                ? '+' + (diference * -1).toFixed(0)
                : diference.toFixed(0)
            }`
          );
        }

        this.toastr.success(
          `Fibbonacci de ${number} com Web Workers: ${(
            finalTick - initialTick
          ).toFixed(0)} ms`
        );
      };

      const initialTick = performance.now();
      worker.postMessage(number);
    });
  }

  countToBigNumMain() {
    const { onHidden } = this.toastr.info('Iniciando contagem na Main thread');

    onHidden.subscribe(() => {
      const numbers = Array.from({ length: 100 }, () => 1e8);

      const initialTick = performance.now();

      for (let num of numbers) {
        let result = 0;
        for (let i = 0; i < num; i++) {
          result++;
        }
      }

      const finalTick = performance.now();
      this.mainNumCount = finalTick - initialTick;

      this.toastr.success(
        `Contagem finalizada em:  ${(finalTick - initialTick).toFixed(0)} ms`
      );
    });
  }

  countToBigNumWorker() {
    const { onHidden } = this.toastr.info('Iniciando contagem com Web Workers');

    onHidden.subscribe(() => {
      const numbers = Array.from({ length: 100 }, () => 1e8);

      const workers = 8;
      let jobsDones = 0;

      const workerCallBack = () => {
        jobsDones++;

        if (jobsDones === workers) {
          const finalTick = performance.now();

          if (this.mainNumCount)
            this.toastr.info(
              `Diferença de tempo gasto: ${(
                this.mainNumCount -
                (finalTick - initialTick)
              ).toFixed(0)}`
            );

          this.toastr.success(
            `Contagem realizada com ${workers} worker(s) finalizada em: ${(
              finalTick - initialTick
            ).toFixed(0)}`
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
    });
  }

  fib(n: number): number {
    if (n <= 2) return 1;
    return this.fib(n - 1) + this.fib(n - 2);
  }
}
