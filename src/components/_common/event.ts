export interface EventOptions {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

export interface EventDispatcher<T> {
  (value: T, options?: EventOptions): void;
}

function dispatcher<T>(
  target: HTMLElement,
  eventName: string
): EventDispatcher<T> {
  // eslint-disable-next-line func-names
  return function (value: T, options?: EventOptions) {
    target.dispatchEvent(
      new CustomEvent<T>(eventName, {
        detail: value,
        bubbles: true,
        cancelable: false,
        composed: true,
        ...options,
      })
    );
  };
}

export function event(customName?: string) {
  return (protoOrDescriptor: {}, name: string): void => {
    const descriptor = {
      get(this: HTMLElement) {
        return dispatcher(this, customName || name);
      },
      enumerable: true,
      configurable: true,
    };

    Object.defineProperty(protoOrDescriptor, name, descriptor);
  };
}
