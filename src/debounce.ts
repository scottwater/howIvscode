//  * @source underscore.js
//  * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
//  * @source https://github.com/chodorowicz/ts-debounce

/**
 * Inlined this module since it felt simpler than creating a dependency
 * that would requiring using a package manager
 * /

/**
 * A function that emits a side effect and does not return anything.
 */
export type Procedure = (...args: any[]) => void;

export type Options = {
  isImmediate: boolean;
};

export function debounce<F extends Procedure>(
  func: F,
  waitMilliseconds = 50,
  options: Options = {
    isImmediate: false
  }
): F {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function(this: any, ...args: any[]) {
    const context = this;

    const doLater = function() {
      timeoutId = undefined;
      if (!options.isImmediate) {
        func.apply(context, args);
      }
    };

    const shouldCallNow = options.isImmediate && timeoutId === undefined;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(doLater, waitMilliseconds);

    if (shouldCallNow) {
      func.apply(context, args);
    }
  } as any;
}
