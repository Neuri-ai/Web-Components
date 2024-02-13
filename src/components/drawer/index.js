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
    const attributesMapping = ["delay", "styles"];

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
            <h1 class="drawer-transcript"></h1>
        </div>
    `;
  }

  templateCss() {
    if(!this.attributes.styles.value){
      return `
			  <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
          .drawer-component {
            padding: 10px;
            background-color: #172641;
            border-radius: 10px;
            width: fit-content;
            display: none;
            transition: all 3s ease;
          }
          .drawer-component h1 {
            font-family: 'Poppins', sans-serif;
            font-size: 16px;
            color: white;
            font-weight: bold;
            text-transform: uppercase;
          }
          .drawer-highlight{
            color: #75D8EF;
          }
	  	  </style>
		  `;
    }
    // if using external styles
    if(this.attributes.styles.value.includes("http")){
      return `
        <style>@import "${this.attributes.styles}";</style>
      `;
    }

    // if using inline styles
    return ` <style>${this.attributes.styles.value}</style>`
  }



  async initComponent() {
    this.$root = this.shadowDOM.querySelector(".drawer-component");
    this.drawerTranscript = this.shadowDOM.querySelector(".drawer-transcript")
    this.phrase = []

    window.addEventListener('onSpeech', (e) => {
        this.data = e.detail
        if(this.data.transcription != undefined){
            this.drawerTranscript.innerHTML = this.data.transcription
            this.$root.style.display = "block"

            // if data.isFinal is true, then it means that the user has finished speaking and the transcription is complete
        }
    });
    window.addEventListener('onResult', (e) => {
        this.data = e.detail
        if(this.data.entities){
          // highlith each value if match with some word in this.data.entities values array
          this.data.entities.forEach((entity) => {
            this.drawerTranscript.innerHTML = this.drawerTranscript.innerHTML.replace(entity.value, `<span class="drawer-highlight">${entity.value}</span>`)
          })

          // await for the delay time and then clean the drawer
          setTimeout(() => {
            this.$root.style.display = "none"
            this.drawerTranscript.innerHTML = ""
          }, parseInt(this.attributes.delay.value) || 1500);
        }
    });
  }

  disconnectedCallback() {
    this.remove();
  }
}

export default Drawer;
