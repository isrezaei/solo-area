import {css} from "@emotion/css";

export const playBackStyle = css`
  @media (min-width: 20em) {
    .rhap_progress-section {
      display: none;
    }

    .rhap_volume-controls {
      display: none;
    }

    .rhap_additional-controls {
      display: none;
    }

    .rhap_main-controls {
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      line-height: 0;
    }

    .rhap_controls-section {
      margin: 0
    }
  }
  @media (min-width: 30em) {
    .rhap_main {
      justify-content: space-between;
      align-items: center;
    }

    .rhap_progress-section {
      width: 45rem;
      display: flex;
    }

    .rhap_volume-controls {
      display: flex;
    }

    .rhap_additional-controls {
      display: flex;
    }

    .rhap_controls-section {
      width: 100%;
      margin: 0
    }

    .rhap_main-controls {
      width: auto;
      height: auto;
      justify-content: center;
      align-items: center;
      line-height: 0;
    }

    .rhap_time, .rhap_total-time {
      font-size: 12px;
      color: #e5e5e5 !important;
    }
  }


  .rhap_progress-indicator {
    display: none;
    width: 10px !important;
    height: 14px !important;
    top: -4px !important;
    background-color: #b79218 !important;
  }


  .rhap_progress-filled {
    background-color: #424242 !important;
  }

  .rhap_download-progress {
    background-color: rgba(56, 56, 56, 0.41) !important;
  }


  .rhap_volume-bar {
    background-color: #424242 !important;
  }
`
