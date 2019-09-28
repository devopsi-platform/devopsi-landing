type Func = () => void;
const executedRegistry: Func[] = [];

export function executeOnce(func: Func) {
  if (executedRegistry.includes(func)) {
    return;
  }
  try {
    document.addEventListener('readystatechange', () => {
      if (document.readyState !== 'complete') {
        return;
      }
      func();
      executedRegistry.push(func);
    });
  } catch (error) {}
}
