import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: transparent;

  /* theme-mode-style */
  .mode + .container {
    --color-pure: #000;
    --color-primary: #e8e8e8;
    --color-secondary: #212121;
    --muted: #b8b8b8;
  }
  .mode:checked + .container {
    --color-pure: #fff;
    --color-primary: #212121;
    --color-secondary: #fff;
    --muted: #383838;
  }
  .container {
    background-color: var(--color-secondary);
    position: absolute;
    width: 100%;
    height: 110%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .container .theme {
    color: var(--color-secondary);
    background-color: var(--color-primary);
    position: relative;
    cursor: pointer;
    z-index: 9;
    -webkit-user-select: none;
    user-select: none;
    border: 1px solid var(--muted);
    border-radius: calc(var(--round) - var(--p-y));
    margin-left: calc(var(--p-x) * 2);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    transition: background-color 0.25s linear;
  }
  .container .theme:hover {
    background-color: var(--muted);
  }
  .container .theme::before {
    content: "";
    position: absolute;
    left: calc(var(--p-x) * -1);
    width: 1px;
    height: 100%;
    background-color: var(--muted);
  }
  .container .theme span {
    border: none;
    outline: none;
    background-color: transparent;
    padding: 0.125rem;
    border-radius: 9999px;
    align-items: center;
    justify-content: center;
  }
  .mode:checked + .container .theme span.light,
  .mode + .container .theme span.dark {
    display: none;
  }
  .mode + .container .theme span.light,
  .mode:checked + .container .theme span.dark {
    display: flex;
  }
  .container .theme svg {
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke: currentColor;
    fill: none;
    height: 22px;
    width: 22px;
  }

  /* main style */
  .wrap {
    --round: 10px;
    --p-x: 8px;
    --p-y: 4px;
    --w-label: 100px;
    display: flex;
    align-items: center;
    padding: var(--p-y) var(--p-x);
    position: relative;
    background: var(--color-primary);
    border-radius: var(--round);
    max-width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    top: 0;
    z-index: 1;
  }

  .wrap input {
    height: 0;
    width: 0;
    position: absolute;
    overflow: hidden;
    display: none;
    visibility: hidden;
  }

  .label {
    cursor: pointer;
    outline: none;
    font-size: 0.875rem;
    letter-spacing: initial;
    font-weight: 500;
    color: var(--color-secondary);
    background: transparent;
    padding: 12px 16px;
    width: var(--w-label);
    min-width: var(--w-label);
    text-decoration: none;
    -webkit-user-select: none;
    user-select: none;
    transition: color 0.25s ease;
    outline-offset: -6px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    -webkit-tap-highlight-color: transparent;
  }

  .label span {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .wrap input[class*="rd-"]:checked + label {
    color: var(--color-pure);
  }

  .bar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: absolute;
    transform-origin: 0 0 0;
    height: 100%;
    width: var(--w-label);
    z-index: 0;
    transition: transform 0.5s cubic-bezier(0.33, 0.83, 0.99, 0.98);
  }

  .bar::before,
  .bar::after {
    content: "";
    position: absolute;
    height: 4px;
    width: 100%;
    background: var(--color-secondary);
  }

  .bar::before {
    top: 0;
    border-radius: 0 0 9999px 9999px;
  }

  .bar::after {
    bottom: 0;
    border-radius: 9999px 9999px 0 0;
  }

  .slidebar {
    position: absolute;
    height: calc(100% - (var(--p-y) * 4));
    width: var(--w-label);
    border-radius: calc(var(--round) - var(--p-y));
    background: var(--muted);
    transform-origin: 0 0 0;
    z-index: 0;
    transition: transform 0.5s cubic-bezier(0.33, 0.83, 0.99, 0.98);
  }

  .rd-1:checked ~ .bar,
  .rd-1:checked ~ .slidebar,
  .rd-1 + label:hover ~ .slidebar {
    transform: translateX(0) scaleX(1);
  }

  .rd-2:checked ~ .bar,
  .rd-2:checked ~ .slidebar,
  .rd-2 + label:hover ~ .slidebar {
    transform: translateX(100%) scaleX(1);
  }

  .rd-3:checked ~ .bar,
  .rd-3:checked ~ .slidebar,
  .rd-3 + label:hover ~ .slidebar {
    transform: translateX(200%) scaleX(1);
  }
`;

const Radio: React.FC = () => {
  return (
    <StyledWrapper>
      <div>
        <input hidden className="mode" id="theme-mode" type="checkbox" />
        <div className="container">
          <div className="wrap">
            <input hidden className="rd-1" name="radio" id="rd-1" type="radio" />
            <label style={{ zIndex: 0 }} className="label" htmlFor="rd-1">
              <span>About Me</span>
            </label>

            <input hidden className="rd-2" name="radio" id="rd-2" type="radio" />
            <label style={{ zIndex: 1 }} className="label" htmlFor="rd-2">
              <span>Summary</span>
            </label>

            <input hidden className="rd-3" name="radio" id="rd-3" type="radio" />
            <label style={{ zIndex: 2 }} className="label" htmlFor="rd-3">
              <span>Portfolio</span>
            </label>

            <div className="bar" />
            <div className="slidebar" />

            <label htmlFor="theme-mode" className="theme">
              <span className="light">
                {/* Light icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={2}>
                  <path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z" />
                  <g data-g="high">
                    <path d="M4 12h-3" />
                    <path d="M12 4v-3" />
                    <path d="M20 12h3" />
                    <path d="M12 20v3" />
                  </g>
                  <g data-g="low">
                    <path d="M6.343 17.657l-1.414 1.414" />
                    <path d="M6.343 6.343l-1.414 -1.414" />
                    <path d="M17.657 6.343l1.414 -1.414" />
                    <path d="M17.657 17.657l1.414 1.414" />
                  </g>
                </svg>
              </span>

              <span className="dark">
                {/* Dark icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={0}>
                  <path
                    d="m4.8.69c0-.38-.31-.69-.69-.69s-.69.31-.69.69v1.03h-1.03c-.38,0-.69.31-.69.69s.31.69.69.69h1.03v1.03c0,.38.31.69.69.69s.69-.31.69-.69v-1.03h1.03c.38,0,.69-.31.69-.69s-.31-.69-.69-.69h-1.03V.69Z"
                    fill="currentColor"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </span>
            </label>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default Radio;