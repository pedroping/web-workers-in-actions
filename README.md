# Web Workers in action

As you already know, JavaScript traditionally operates as a single-threaded language with all tasks queued. However, now we have the power of Web Workers to execute code on separate threads, allowing us to avoid blocking the main thread.

### Angular environment configuration:

In an Angular environment, execute the following command to automatically configure your *angular.json* file and generate two additional files: *tsconfig.worker.json* and your worker file.

```
  ng generate web-worker <location>
```

The *tsconfig.worker.json* file is essential for code compilation, as it specifies which parts of your code are web workers.

### Code example: 

To create a worker will be needed to create a new *Worker* instance:

```typescript
  private _worker: Worker;
  
  _worker = new Worker(new URL('../worker relative path', import.meta.url));
```


A Web Worker communicates with the main thread through a messaging system, and you need to create a callback to be executed once the worker completes its task.

On the main thread:
```typescript
  _worker.onmessage = () => {
    console.log('Your worker job is done!');
  }

  _worker.postMessage('Pass some data to your worker here');
```

On the worker:

```typescript
  /// <reference lib="webworker" />

  addEventListener('message', ({ data }) => {
    console.log('Perform actions with the received data here');
    
    postMessage('Send to main thread the results here');
  });
```
