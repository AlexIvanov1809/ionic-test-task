export default function throttle(callback: Function, delay: number) {
  let isThrottled = false;
  let savedArgs: null | IArguments[] = null;
  let savedThis: any = null;

  return function wrapper(this: any) {
    if (isThrottled) {
      savedArgs = [...arguments];
      savedThis = this;
      return;
    }

    callback.apply(this, savedArgs);
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply<any, IArguments[], any>(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, delay);
  };
}
