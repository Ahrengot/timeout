# Timeout using requestAnimationFrame

## Wait, requestAnimationFrame is for animation!
That’s true. It’s mainly built for optimizing animations, so multiple concurrent DOM updates can be put onto a single reflow and repaint cycle in the browser. However there are other benefits of requestAnimationFrame that we can make good use of in normal timers.

### Why use RAF over setTimeout
The main benefits are:

1. [`window.setTimeout` is not all that accurate](http://ejohn.org/blog/accuracy-of-javascript-time/).
2. requestAnimationFrame IS accurate.
3. requestAnimationFrame will pause when the current browser tab/window is no longer in focus thus saving CPU, Memory and battery power.

*Note: When the tab/window becomes active again any callbacks that have expired while inactive will be fired immediately, so you don’t need to manually invoke them or anything like that.*

#### What happens if the browser doesn’t support RAF?
Currently there’s no polyfill built-in. All of the vendor prefixes are there, and a setTimeout fallback would be fairly easy to implement.

## Examples
**Default usage. The timeout method mimics the syntax of`window.setTimeout`:**
```JavaScript
 timeout(function() {
 // Do something after 1 second has passed
 }, 1000);
```

**However, there are more options**:
Unlike `window.setTimeout`, you can also set the context and arguments for the callback.
`timeout( callback, delay = 1000, args = [], context = this );`

For instance, in jQuery callbacks the context(the "this" keyword) has been changed to whatever the event target was.
by supplying the context of the callback you can make use of this.

```JavaScript
var _this = this, clickBtnHandler;

var clickBtnHandler = function(msg, link) {
 console.log( "You clicked ", this ); // Outputs the button clicked
 alert( msg );
 window.location.href = link;
}

$("button").on("click", function() {
 timeout( clickBtnHandler, 1000, ["You clicked the button", "http://ahrengot.com/"], this );
});
```

## On the drawing board

- Support intervals
- Allow you to pause/resume/cancel a timeout
- AMD/Require.js support
- ~~Basic timeout functionality.~~
