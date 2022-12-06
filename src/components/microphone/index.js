class Microphone extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.mapComponentAttributes();
    this.render();
    this.initComponent();
  }

  mapComponentAttributes() {
    const attributesMapping = ["title", "message"];

    attributesMapping.map((key) => {
      if (!this.attributes[key]) {
        this.attributes[key] = { value: "" };
      }
    });
  }

  render() {
    this.shadowDOM.innerHTML = `
        ${this.templateCss()}
        ${this.template()}
    `;
  }

  template() {
    return `
          <div class="permission-modal">
            <h2>Prueba de microfono<h2>
          </div>
          `;
  }

  templateCss() {
    return `
        <style>
        </style>
    `;
  }

  async initComponent() {
    this.$root = this.shadowDOM.querySelector(".permission-modal");
  }

  disconnectedCallback() {
    this.remove();
  }
}

export default Microphone;
