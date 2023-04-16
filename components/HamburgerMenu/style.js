import {css} from "@emotion/css";

export const style = css`
  .bm-burger-button {
    position: fixed;
    width: 36px;
    height: 30px;
    left: 36px;
    top: 36px;
  }
  .bm-burger-bars {
    background: #373a47;
  }
  .bm-burger-bars-hover {
    background: #a90000;
  }
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }
  .bm-cross {
    background: #bdc3c7;
  }
  .bm-menu-wrap {
    position: fixed;
    height: 100%;
  }
  .bm-menu {
    background: #101010;
    padding: .5rem;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  .bm-morph-shape {
    fill: #373a47;
  }
  .bm-item-list {
    padding: 0;
  }
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }

,
`