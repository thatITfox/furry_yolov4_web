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

  a {
    text-decoration: none;
    padding: 0.25rem 0.55rem;
    border-radius: 9px;
    color: white;
  }

  a#twitter {
    color: #1DA1F2;
    opacity: .5;
  }

  a#twitter:hover {
    opacity: 1;
  }

  a:first-child {
    font-size: 90%;
    background: linear-gradient(to right, #a659a3, #304ea7);
    font-weight: bold;
  }

  a:first-child:hover {
    background: linear-gradient(to right, orchid, royalblue);
  }

  footer {
    margin-top: 1rem;
    padding: 1.25rem;
    background: var(--global-bg);
    border-radius: 3px;
    border: 2px solid whitesmoke;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
<footer>
  <nav>
    <div style="display: flex">
      <a href="https://github.com/thatITfox/furry_yolov4_web" target="_blank"><i class="fab fa-github"></i>&nbsp;Source code</a>
      <a href="https://twitter.com/maxthecomputer1" target="_blank" id="twitter"><i class="fab fa-twitter"></i>&nbsp;@maxthecomputer1</a>
      <a href="https://twitter.com/skepfuskyjs" target="_blank" id="twitter"><i class="fab fa-twitter"></i>&nbsp;@skepfuskyjs</a>
    </div>
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