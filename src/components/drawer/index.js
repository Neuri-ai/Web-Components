class Drawer extends HTMLElement {
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
    const attributesMapping = ["delay", "style"];

    // si alguno de los dos atributos de attributesMapping está empty entonces dejar un mensaje por default
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
        <div class="drawer-component">
            <h1 class="drawer-transcript">Hola mundo</h1>
        </div>"
    `;
  }

  templateCss() {
    return `
			<style>
            .drawer-highlight{
                color: blue;
            }
		    </style>
		`;
  }



  async initComponent() {
    this.$root = this.shadowDOM.querySelector(".drawer-component");
    this.drawerTranscript = this.shadowDOM.querySelector(".drawer-transcript")
    this.phrase = []

    window.addEventListener('onSpeech', (e) => {
        this.data = e.detail
        if(this.data.transcription != undefined){
            //this.drawerTranscript.innerHTML = this.data.transcription

            this.drawerTranscript.innerHTML = this.data.transcription

            if(this.data.isFinal){
                let splitText = this.data.transcription.split(" ")
                const splitResult = splitText.map(word => {
                    let result = this.data.entities.map(entity => Object.values(entity).includes(word))

                    result.map(val => {
                        if(val){
                            this.phrase.push(`<span class="drawer-highlight">${word}</span>`)
                        }else{
                            this.phrase.push(word)
                        }
                    })
                })
                let result = this.phrase.filter((item, index) => this.phrase.indexOf(item) === index);

                this.drawerTranscript.innerHTML = result.join(" ")

                // todo: ocultar los estilos cuando el drawer completo la transcription en [delay]
            }
        }
    });
  }

  disconnectedCallback() {
    this.remove();
  }
}

export default Drawer;
