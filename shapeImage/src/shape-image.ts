import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Calculator } from "./positionCalculator";
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("shape-image")
export class ShapeImage extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  // fp is in the format "y,x"
  @property({ type: String })
  fp = "";

  @property({ type: Number })
  sc = 0.1;

  @property({ type: String })
  imgSrc = "";

  @property({ type: String })
  shapeSrc = "";

  render() {
    return html`
      <div
        class="card"
        data-masksrc="${this.shapeSrc}"
        style="--background: url('${this.shapeSrc}')"
      >
        <img
          data-left="${Calculator.calculate(this.fp.split(",")[1], this.sc)}"
          data-top="${Calculator.calculate(this.fp.split(",")[0], this.sc)}"
          data-scale="${this.sc * 100}"
          src=${this.imgSrc}
        />
      </div>
    `;
  }

  static styles = css`
    .card {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #b41717;
      width: 100%;
      height: 100%;
      overflow: hidden;
      mask-image: var(--background);
      mask-size: contain;
      mask-position: center;
      mask-repeat: no-repeat;
    }
    .card img {
      position: relative;
      transform-origin: center;
      transform: scale(
          attr(data-scale %, number, 1%),
          attr(data-scale %, number, 1%)
        )
        translate(attr(data-left %, number, 0%), attr(data-top %, number, 0%));
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "shape-image": ShapeImage;
  }
}
