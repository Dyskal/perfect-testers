export function setupCounter(element) {
  let counter = 0;
  const setCounter = (count) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };
  element.addEventListener('click', () => setCounter(counter + 1));
  setCounter(0);
  return counter;
}

if (import.meta.vitest) {
  test('counter initialized at 0', () => {
    expect(setupCounter(window)).toBe(0);
  });
}
