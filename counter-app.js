/**
 * Copyright 2025 nickhadden23
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `counter-app`
 * 
 * @demo index.html
 * @element counter-app
 */
export class CounterApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.min = 0;
    this.max = 100
    this.count = 0;
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/counter-app.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      count: { type: Number },
      min: { type: Number },
      max: { type: Number },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
     .counter {
        font-size: var(--counter-app-label-font-size, var(--ddd-font-size-xxl));
        color: ${this.count === 18 ? 'pink' : this.count === 21 ? 'purple' : 'inherit'};
      }
      .buttons {
        display: flex;
        gap: var(--ddd-spacing-2);
      }
        button {
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        font-size: var(--ddd-font-size-m);
        cursor: pointer;
      }
      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `];
  } 

  // Lit render the HTML
  render() {
    return html`  
  <div class="wrapper">
  <div class="counter>${this.count}</div>
  <div class="buttons">
  <button@click>=${this.decrease}>-1</button>
  <button@click>=${this.increase}>+1</button>
  </div>
</div>`
;
  }
  increase() {
    if (this.count < this.max) {
    this.count++;
    }
  }
  decrease() {
    if (this.count > this.min) {
    this.count--;
    }
  }
  reset() {
    this.count = 0;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
}

updated(changedProperties) {
  if (super.updated) {
    super.updated(changedProperties);
  }
  if (changedProperties.has('counter') && this.count === 21) {
    this.makeItRain();
  }
}

makeItRain() {
  import("@haxtheweb/multiple-choice/lib/confetti-container.js").then((module) => {
    setTimeout(() => {
      this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
    }, 0);
  });
}

}

globalThis.customElements.define(CounterApp.tag, CounterApp);
