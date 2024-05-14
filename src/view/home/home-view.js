import { LitElement, html, css } from 'lit';

class HomeView extends LitElement {
  // static properties = {
  //   header: { type: String },
  // };

  static styles = css``;

  render() {
    return html` <span>home</span> `;
  }
}

customElements.define('home-view', HomeView);
