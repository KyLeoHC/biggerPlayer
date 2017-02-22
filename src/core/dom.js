/**
 * 元素查询
 * @param selector：选择器
 * @param el：父容器
 */
const query = (selector, el) => {
    el = el || document;
    return el.querySelectorAll(selector);
};

/**
 * 替换目标元素节点
 * @param el
 * @param html
 */
const replace = (el, html) => {
    const outer = document.createElement('div');
    outer.innerHTML = html;
    el.parentNode.insertBefore(outer.firstElementChild, el);
    el.parentNode.removeChild(el);
};

export {
    query,
    replace
};