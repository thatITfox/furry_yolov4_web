/* this JS script allows it to be reusable in all pages without
 * rewriting repetitive HTML elements when we update something and
 * updating it to all of the pages and it saves the hassle
 */

// adds the backdrop element
const bd = document.createElement('div');
bd.setAttribute("id", "backdrop");
document.body.appendChild(bd);

class yolov4Header extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <h1>The YOLOV4 Fursuit Detector</h1>
    `;
  }
}
window.customElements.define('yolov4-header', yolov4Header);


class yolov4Container extends HTMLElement {
  constructor() {
    super();
  }
}
window.customElements.define('yolov4-container', yolov4Container);

class yolov4ModelWarning extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <p style="font-size: 90%;">
      If there's something wrong or some inaccuracies or something
    </p>
    `;
  }
}
window.customElements.define('yolov4-model-warning', yolov4ModelWarning);


