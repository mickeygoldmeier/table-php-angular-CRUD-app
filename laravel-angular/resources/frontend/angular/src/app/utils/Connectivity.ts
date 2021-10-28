import {fromEvent, merge, of} from 'rxjs';
import {mapTo} from 'rxjs/operators';

/**
 * Observable that is updated each time the network connection changes. Boolean variable returns whether there is a
 * connection or not.
 */
let online = merge(
  of(navigator.onLine),
  fromEvent(window, 'online').pipe(mapTo(true)),
  fromEvent(window, 'offline').pipe(mapTo(false))
);

export {online}
