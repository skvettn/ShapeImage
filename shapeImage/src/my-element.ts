import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
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

  @property({ type: Number })
  width = 600;

  @property({ type: Number })
  height = 600;

  @state()
  private _imagedata: srcImageData | null = null;

  private async loadImageData(): Promise<srcImageData | null> {
    if (!this.imgSrc) return null;

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = this.imgSrc;
    });
  }

  async firstUpdated() {
    try {
      this._imagedata = await this.loadImageData();
      this.requestUpdate();
    } catch (error) {
      console.error("Error loading image data:", error);
    }
  }

  render() {
    return html`
      <div
        class="card"
        data-masksrc="${this.shapeSrc}"
        data-width="${this.width}"
        data-height="${this.height}"
      >
        <img
          data-left="${this.calculateLeft(this.fp)}"
          data-top="${this.calculateTop(this.fp)}"
          data-scale="${this.sc * 100}"
          src=${this.imgSrc}
        />
      </div>
    `;
  }

  private calculateLeft(fp: string): number {
    // Assuming fp is in the format "y,x"
    const parts = fp.split(",");
    if (parts.length !== 2) {
      console.warn("Invalid fp format. Expected 'y,x'.");
      return 0;
    }
    const l = parseFloat(parts[1]);
    const left =
      Math.floor(l * (this._imagedata?.width! * this.sc)) * -1 + this.width / 2;
    return left;
  }
  private calculateTop(fp: string): number {
    const parts = fp.split(",");
    if (parts.length !== 2) {
      console.warn("Invalid fp format. Expected 'y,x'.");
      return 0;
    }
    const t = parseFloat(parts[0]);
    const top =
      Math.floor(t * (this._imagedata?.height! * this.sc)) * -1 +
      this.height / 2;
    return top;
  }

  static styles = css`
    .card {
      position: relative;
      display: inline-block;
      background-color: #b41717;
      width: attr(data-width px, number, 600px);
      height: attr(data-height px, number, 600px);
      overflow: hidden;
      mask-image: url("/public/shape.svg");
      mask-size: contain;
      mask-position: center;
      mask-repeat: no-repeat;
    }
    .card img {
      position: relative;
      transform: scale(
        attr(data-scale %, number, 1%),
        attr(data-scale %, number, 1%)
      );
      /* transform: scale(0.1, 0.1); */
      top: attr(data-top px, number, 0px);
      left: attr(data-left px, number, 0px);
      min-height: 100%;
      min-width: 100%;
      transform-origin: top left;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "shape-image": ShapeImage;
  }
}

interface srcImageData {
  width: number;
  height: number;
}
