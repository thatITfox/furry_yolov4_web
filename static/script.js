// Detects if the user is closing the window
window.onbeforeunload = () => {
  fetch('/delete/{{session}}')
};

// Adds the backdrop element
const bd = document.createElement('div');
bd.setAttribute("id", "backdrop");
document.body.appendChild(bd);

// CUSTOM ELEMENTS
customElements.define('fsd-header', class extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = '<h1>The YOLOV4 Fursuit Detector</h1>';
  }
});

customElements.define('fsd-container', class extends HTMLElement {
  constructor() {
    super();
  }
});

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = `
<style>
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css");
  
  :host {
    all: inital;
    display: block;
  }
</style>
<footer>
  <nav>
    <a href="https://github.com/thatItfox/yolov4" target="_blank"><i class="fab fa-github"></i> Source code</a>
    <span>&copy; ${ new Date().getFullYear() }, MIT License.</span>
  </nav>
</footer>
`;

customElements.define('fsd-footer', class extends HTMLElement {
  constructor() {
    super();
  }
  
  connectedCallback() {
    const fontAwesome = document.querySelector('link[href*="font-awesome]');
    const shadowRoot = this.attachShadow({ mode: "open" });
    if (fontAwesome) { shadowRoot.appendChild(fontAwesome.cloneNode()) }

    shadowRoot.appendChild(footerTemplate.content);
  }
}, { extends: 'footer' })