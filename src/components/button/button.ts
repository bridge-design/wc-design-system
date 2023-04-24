import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import style from './button.css';

/**
 * @cssproperty [--button-primary__bg= #C1D9EB] - The primary button background and border color.
 * @cssproperty [--button-primary__bg_hover= #74A9D2] - The primary button background color when it is hovered.
 * @cssproperty [--button-primary__bg_disabled= #D1E2F0] - The primary button background and border color when it is disabled.
 *
 * @cssproperty [--button-secondary__bg = #65A0CD] - The secondary button background and border color.
 * @cssproperty [--button-secondary__bg_hover = #3778A9] - The secondary button background color when it is hovered.
 * @cssproperty [--button-secondary__bg_disabled = #84B3D7] - The secondary background and border color when it is disabled.
 */
@customElement('wc-button')
export class WCButton extends LitElement {
  /**
   * Button appearance variant
   * @attr variant
   * @type {String}
   */
  @property({ type: String, reflect: true })
  variant: 'primary' | 'secondary' = 'primary';

  /**
   * Disabled state of the button.
   * @attr disabled
   * @type {Boolean}
   */
  @property({ reflect: true, type: Boolean })
  disabled = false;

  /**
   * The unique ID of an element(optional).
   * @attr id
   * @type {String}
   */
  @property({ reflect: true })
  id: string;

  /**
   * Aria-label text for button.
   * `aria-label` attribute that is used to define a string that labels the current element.
   * use it in cases where a text label is not visible on the screen.
   * if there is visible text labeling the element, use `aria-labelledby` instead.
   * @type {String}
   */
  @property({ type: String, attribute: 'aria-label', noAccessor: true })
  override ariaLabel!: string;

  /**
   * Aria-labelledby text for button.
   * the `aria-labelledby` attribute that establishes relationships between objects and their label(s),
   * and its value should be one or more element IDs, which refer to elements that have the text needed for labeling.
   * List multiple element IDs in a space delimited fashion.
   * @type {String}
   */
  @property({
    type: String,
    attribute: 'aria-labelledby',
    noAccessor: true,
  })
  ariaLabelledBy!: string;

  render() {
    const { variant, disabled, ariaLabel, ariaLabelledBy, id } = this;

    const buttonClasses = {
      button: true,
      'button--primary': variant === 'primary',
      'button--secondary': variant === 'secondary',
    };

    return html`<button
      type="button"
      class=${classMap(buttonClasses)}
      ?disabled=${disabled}
      aria-label="${ariaLabel}"
      .aria-labelledby="${ariaLabelledBy}"
      id="${ifDefined(id || undefined)}"
    >
      <slot></slot>
    </button>`;
  }

  /** @ignore */
  static formAssociated = true;

  static styles = unsafeCSS(style);
}
