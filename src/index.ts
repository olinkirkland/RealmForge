/**
 * Hint: Use 'npm run build' from console to compile + watch the TS code on save
 */

// Delay intro animations
const sectionEls: NodeList = document.querySelectorAll('.container');
sectionEls.forEach((node: Node, index: number) => {
  const el: HTMLElement = node as HTMLElement;
  setTimeout(() => {
    el.classList.add('fade-in');
  }, 100 * index);
});

const home: HomePage = new HomePage();
