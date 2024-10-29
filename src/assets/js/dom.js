export const appendClassName = (dom, className) => {
  // const style = getComputedStyle(dom);
  // if (!style.className.contain('g-relative')) dom.addClass('g-relative');
  if (!dom.classList.contains('g-relative')) dom.classList.add(className);
};
export const removeClassName = (dom, className) => {
  dom.classList.remove(className);
};
