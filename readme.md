# Timeout using requestAnimationFrame

## Wait, requestAnimationFrame is for animation!
That's true. It's mainly built for optimazing animations, so multiple concurrent DOM updates can be put onto a single reflow and repaint cycle in the browser. However there are other benefits of requestAnimationFrame that we can make good use of in normal timers.

## Why use RAF over setTimeout
The main benefits are:

1. [`setTimeout` is not accurate](http://ejohn.org/blog/accuracy-of-javascript-time/).
2. requestAnimationFrame will pause when the current browser tab/window is no longer in focus thus saving battery power.

*Note: When the tab/window becomes active again any callbacks that have expired while inactive will be fired immidiately, so you don't need to manually invoke them or anything like that.*

### What happens if the browser doesn't support RAF?
Currently there's no polyfill built in. All of the vendor prefixes are there, and a setTimeout fallback would be fairly easy to implement.

## Examples
### Default timeout. Mimics setTimeout syntax:
```JavaScript
    timeout(function() {
        // Do something
    }, 1000);
```

### However there are more options
Unlike `window.setTimeout`, you can also set the context and arguments for the callback.

`timeout( callback, delay = 1000, args = [], context = this );`