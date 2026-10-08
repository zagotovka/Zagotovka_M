'use strict';
import {
  h,
  render,
  useState,
  useEffect,
  useRef,
  html,
  Router
} from './bundle.js';
// Helper function that returns a promise that resolves after delay
const Delay = (ms, val) =>
  new Promise((resolve) => setTimeout(resolve, ms, val));

// Sidebar icons: Phosphor Icons (duotone weight), MIT license, https://phosphoricons.com
// One 256x256 grid, fill follows currentColor, so the colour comes from the parent tile
const navSvg = (children) => (props) =>
  html`<svg
    class=${props.class}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width="20"
    height="20"
    fill="currentColor"
    aria-hidden="true"
  >
    ${children}
  </svg>`;

export const Icons = {
  navLogger: navSvg(html`<path d="M208,88H152V32Z" opacity="0.2"/><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"/>`),
  navSelect: navSvg(html`<path d="M216,64V192H128V64Z" opacity="0.2"/><path d="M224,128a8,8,0,0,1-8,8H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128ZM128,72h88a8,8,0,0,0,0-16H128a8,8,0,0,0,0,16Zm88,112H128a8,8,0,0,0,0,16h88a8,8,0,0,0,0-16ZM82.34,42.34,56,68.69,45.66,58.34A8,8,0,0,0,34.34,69.66l16,16a8,8,0,0,0,11.32,0l32-32A8,8,0,0,0,82.34,42.34Zm0,64L56,132.69,45.66,122.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Zm0,64L56,196.69,45.66,186.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Z"/>`),
  navSwitch: navSvg(html`<path d="M208,128a32,32,0,1,1-32-32A32,32,0,0,1,208,128Z" opacity="0.2"/><path d="M176,56H80a72,72,0,0,0,0,144h96a72,72,0,0,0,0-144Zm0,128H80A56,56,0,0,1,80,72h96a56,56,0,0,1,0,112Zm0-96a40,40,0,1,0,40,40A40,40,0,0,0,176,88Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,176,152Z"/>`),
  navButton: navSvg(html`<path d="M213.66,201,201,213.66a8,8,0,0,1-11.31,0l-51.31-51.31a8,8,0,0,0-13,2.46l-17.82,46.41a8,8,0,0,1-14.85-.71L40.41,50.44a8,8,0,0,1,10-10L210.51,92.68a8,8,0,0,1,.71,14.85l-46.41,17.82a8,8,0,0,0-2.46,13l51.31,51.31A8,8,0,0,1,213.66,201Z" opacity="0.2"/><path d="M88,24V16a8,8,0,0,1,16,0v8a8,8,0,0,1-16,0ZM16,104h8a8,8,0,0,0,0-16H16a8,8,0,0,0,0,16ZM124.42,39.16a8,8,0,0,0,10.74-3.58l8-16a8,8,0,0,0-14.31-7.16l-8,16A8,8,0,0,0,124.42,39.16Zm-96,81.69-16,8a8,8,0,0,0,7.16,14.31l16-8a8,8,0,1,0-7.16-14.31ZM219.31,184a16,16,0,0,1,0,22.63l-12.68,12.68a16,16,0,0,1-22.63,0L132.7,168,115,214.09c0,.1-.08.21-.13.32a15.83,15.83,0,0,1-14.6,9.59l-.79,0a15.83,15.83,0,0,1-14.41-11L32.8,52.92A16,16,0,0,1,52.92,32.8L213,85.07a16,16,0,0,1,1.41,29.8l-.32.13L168,132.69ZM208,195.31,156.69,144h0a16,16,0,0,1,4.93-26l.32-.14,45.95-17.64L48,48l52.2,159.86,17.65-46c0-.11.08-.22.13-.33a16,16,0,0,1,11.69-9.34,16.72,16.72,0,0,1,3-.28,16,16,0,0,1,11.3,4.69L195.31,208Z"/>`),
  navEncoder: navSvg(html`<path d="M216,128a88,88,0,1,1-88-88A88,88,0,0,1,216,128Z" opacity="0.2"/><path d="M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h28.69L182.06,73.37a79.56,79.56,0,0,0-56.13-23.43h-.45A79.52,79.52,0,0,0,69.59,72.71,8,8,0,0,1,58.41,61.27a96,96,0,0,1,135,.79L208,76.69V48a8,8,0,0,1,16,0ZM186.41,183.29a80,80,0,0,1-112.47-.66L59.31,168H88a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V179.31l14.63,14.63A95.43,95.43,0,0,0,130,222.06h.53a95.36,95.36,0,0,0,67.07-27.33,8,8,0,0,0-11.18-11.44Z"/>`),
  navPid: navSvg(html`<path d="M128,80a24,24,0,1,1-24-24A24,24,0,0,1,128,80Zm40,72a24,24,0,1,0,24,24A24,24,0,0,0,168,152Z" opacity="0.2"/><path d="M40,88H73a32,32,0,0,0,62,0h81a8,8,0,0,0,0-16H135a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16Zm64-24A16,16,0,1,1,88,80,16,16,0,0,1,104,64ZM216,168H199a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16h97a32,32,0,0,0,62,0h17a8,8,0,0,0,0-16Zm-48,24a16,16,0,1,1,16-16A16,16,0,0,1,168,192Z"/>`),
  navTimer: navSvg(html`<path d="M216,136a88,88,0,1,1-88-88A88,88,0,0,1,216,136Z" opacity="0.2"/><path d="M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,216ZM173.66,90.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,90.34ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z"/>`),
  navOneWire: navSvg(html`<path d="M212,132l-58.63,58.63a32,32,0,0,1-45.25,0L65.37,147.88a32,32,0,0,1,0-45.25L124,44Z" opacity="0.2"/><path d="M237.66,66.34a8,8,0,0,0-11.32,0L192,100.69,155.31,64l34.35-34.34a8,8,0,1,0-11.32-11.32L144,52.69,117.66,26.34a8,8,0,0,0-11.32,11.32L112.69,44l-53,53a40,40,0,0,0,0,56.57l15.71,15.71L26.34,218.34a8,8,0,0,0,11.32,11.32l49.09-49.09,15.71,15.71a40,40,0,0,0,56.57,0l53-53,6.34,6.35a8,8,0,0,0,11.32-11.32L203.31,112l34.35-34.34A8,8,0,0,0,237.66,66.34ZM147.72,185a24,24,0,0,1-33.95,0L71,142.23a24,24,0,0,1,0-33.95l53-53L200.69,132Z"/>`),
  navSecurity: navSvg(html`<path d="M216,56v56c0,96-88,120-88,120S40,208,40,112V56a8,8,0,0,1,8-8H208A8,8,0,0,1,216,56Z" opacity="0.2"/><path d="M208,40H48A16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.26,47,25.53a8,8,0,0,0,4.2,0c1-.27,23.91-6.67,47-25.53C198.48,196.67,224,164.72,224,112V56A16,16,0,0,0,208,40Zm0,72c0,37.07-13.66,67.16-40.6,89.42A129.3,129.3,0,0,1,128,223.62a128.25,128.25,0,0,1-38.92-21.81C61.82,179.51,48,149.3,48,112l0-56,160,0ZM82.34,141.66a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32l-56,56a8,8,0,0,1-11.32,0Z"/>`),
  navZigbee: navSvg(html`<path d="M152,128a24,24,0,1,1-24-24A24,24,0,0,1,152,128Z" opacity="0.2"/><path d="M200,152a31.84,31.84,0,0,0-19.53,6.68l-23.11-18A31.65,31.65,0,0,0,160,128c0-.74,0-1.48-.08-2.21l13.23-4.41A32,32,0,1,0,168,104c0,.74,0,1.48.08,2.21l-13.23,4.41A32,32,0,0,0,128,96a32.59,32.59,0,0,0-5.27.44L115.89,81A32,32,0,1,0,96,88a32.59,32.59,0,0,0,5.27-.44l6.84,15.4a31.92,31.92,0,0,0-8.57,39.64L73.83,165.44a32.06,32.06,0,1,0,10.63,12l25.71-22.84a31.91,31.91,0,0,0,37.36-1.24l23.11,18A31.65,31.65,0,0,0,168,184a32,32,0,1,0,32-32Zm0-64a16,16,0,1,1-16,16A16,16,0,0,1,200,88ZM80,56A16,16,0,1,1,96,72,16,16,0,0,1,80,56ZM56,208a16,16,0,1,1,16-16A16,16,0,0,1,56,208Zm56-80a16,16,0,1,1,16,16A16,16,0,0,1,112,128Zm88,72a16,16,0,1,1,16-16A16,16,0,0,1,200,200Z"/>`),
  navSettings: navSvg(html`<path d="M207.86,123.18l16.78-21a99.14,99.14,0,0,0-10.07-24.29l-26.7-3a81,81,0,0,0-6.81-6.81l-3-26.71a99.43,99.43,0,0,0-24.3-10l-21,16.77a81.59,81.59,0,0,0-9.64,0l-21-16.78A99.14,99.14,0,0,0,77.91,41.43l-3,26.7a81,81,0,0,0-6.81,6.81l-26.71,3a99.43,99.43,0,0,0-10,24.3l16.77,21a81.59,81.59,0,0,0,0,9.64l-16.78,21a99.14,99.14,0,0,0,10.07,24.29l26.7,3a81,81,0,0,0,6.81,6.81l3,26.71a99.43,99.43,0,0,0,24.3,10l21-16.77a81.59,81.59,0,0,0,9.64,0l21,16.78a99.14,99.14,0,0,0,24.29-10.07l3-26.7a81,81,0,0,0,6.81-6.81l26.71-3a99.43,99.43,0,0,0,10-24.3l-16.77-21A81.59,81.59,0,0,0,207.86,123.18ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z" opacity="0.2"/><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.6,107.6,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.29,107.29,0,0,0-26.25-10.86,8,8,0,0,0-7.06,1.48L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.6,107.6,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8.06,8.06,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8.06,8.06,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"/>`),
  navFirmware: navSvg(html`<path d="M216,48V208H40V48A16,16,0,0,1,56,32H200A16,16,0,0,1,216,48Z" opacity="0.2"/><path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,124.69V32a8,8,0,0,0-16,0v92.69L93.66,98.34a8,8,0,0,0-11.32,11.32Z"/>`),
  heart: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      ></path>
    </svg>`,
  downArrowBox: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
      />
    </svg>`,
  upArrowBox: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
      />
    </svg>`,
  cog: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>`,
  settingsH: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
      />
    </svg>`,
  settingsV: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
      />
    </svg>`,
  scan: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg> `,
  desktop: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
      />
    </svg>`,
  alert: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
      />
    </svg>`,
  bell: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
      />
    </svg>`,
  refresh: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg> `,
  bars4: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
      />
    </svg>`,
  bars3: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>`,
  logout: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>`,
  save: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
      />
    </svg>`,
  email: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>`,
  expand: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
      />
    </svg>`,
  shrink: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
      />
    </svg>`,
  ok: (props) =>
    html`<svg
      class=${props.class}
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>`,
  fail: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>`,
  upload: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
      />
    </svg> `,
  download: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
      />
    </svg> `,
  bolt: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
      />
    </svg>`,
  home: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg> `,
  link: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
      />
    </svg> `,
  shield: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg> `,
  barsdown: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
      />
    </svg> `,
  arrowdown: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
      />
    </svg> `,
  arrowup: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
      />
    </svg>`,
  warn: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>`,
  info: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>`,
  exclamationTriangle: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>`,
  thumbUp: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
      />
    </svg>`,
  backward: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
      />
    </svg>`,
  chip: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
      />
    </svg>`,
  camera: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
      />
    </svg>`,
  arrows: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
      />
    </svg>`,
  doc: (props) =>
    html`<svg
      class=${props.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>`
};

export const tipColors = {
  green: 'bg-green-100 text-green-900 ring-green-300',
  yellow: 'bg-yellow-100 text-yellow-900 ring-yellow-300',
  red: 'bg-red-100 text-red-900 ring-red-300'
};

export function Button({
  title,
  onclick,
  disabled,
  cls,
  icon,
  ref,
  colors,
  hovercolor,
  disabledcolor
}) {
  const [spin, setSpin] = useState(false);
  const cb = function (ev) {
    const res = onclick ? onclick() : null;
    if (res && typeof res.catch === 'function') {
      setSpin(true);
      res.catch(() => false).then(() => setSpin(false));
    }
  };
  if (!colors) colors = 'bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400';
  return html` <button
    type="button"
    class="inline-flex justify-center items-center gap-2 rounded px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ${colors} ${cls}"
    ref=${ref}
    onclick=${cb}
    disabled=${disabled || spin}
  >
    ${title}
    <${spin ? Icons.refresh : icon} class="w-4 ${spin ? 'animate-spin' : ''}" />
  <//>`;
}
/******************************************************************/
export const MyPolzunok = ({ checked, onChange }) => html`
  <label class="switch">
    <input type="checkbox" checked=${checked} onChange=${onChange} />
    <span class="slider round"></span>
  </label>
`;
/******************************************************************/
export function Notification({ ok, text, close }) {
  const closebtn = useRef(null);
  const from = 'translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2';
  const to = 'translate-y-0 opacity-100 sm:translate-x-0';
  const [tr, setTr] = useState(from);
  useEffect(function () {
    setTr(to);
    setTimeout(
      (ev) => closebtn && closebtn.current.click && closebtn.current.click(),
      1500
    );
  }, []);
  const onclose = (ev) => {
    setTr(from);
    setTimeout(close, 300);
  };
  return html` <div
    aria-live="assertive"
    class="z-10 pointer-events-none absolute inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <div
        class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transform ease-out duration-300 transition ${tr}"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <${ok ? Icons.ok : Icons.fail}
                class="h-6 w-6 ${ok ? 'text-green-400' : 'text-red-400'}"
              />
            <//>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">${text}</p>
              <p class="hidden mt-1 text-sm text-gray-500">
                Anyone with a link can now view this file.
              </p>
            <//>
            <div class="ml-4 flex flex-shrink-0">
              <button
                type="button"
                ref=${closebtn}
                onclick=${onclose}
                class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span class="sr-only">Close</span>
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                  />
                <//>
              <//>
            <//>
          <//>
        <//>
      <//>
    <//>
  <//>`;
}

export function Login({ loginFn, logoIcon, title, tipText }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const onsubmit = function (ev) {
    const authhdr = 'Basic ' + btoa(user + ':' + pass);
    const headers = { Authorization: authhdr };
    return fetch('api/login', { headers })
      .then(loginFn)
      .finally((r) => setPass(''));
  };
  return html`
    <div class="h-full flex items-center justify-center relative overflow-hidden z-0">
      <!-- Decorative background glow -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl w-full max-w-sm mx-4 p-6 sm:p-8 relative z-10 flex flex-col items-center">
        <div class="mb-8 flex flex-col items-center justify-center gap-y-4">
          <div class="p-3 bg-gradient-to-br from-teal-400/20 to-cyan-500/20 rounded-2xl shadow-inner">
            <${logoIcon} class="h-16 w-16 stroke-cyan-600 drop-shadow-sm" />
          </div>
          <h1 class="font-extrabold text-2xl text-slate-800 drop-shadow-sm tracking-tight text-center">${title || 'Login'}<//>
        <//>

        <div class="w-full space-y-5">
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Username</label>
            <input
              type="text"
              autocomplete="current-user"
              required
              class="w-full bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all shadow-inner disabled:cursor-not-allowed disabled:opacity-50"
              oninput=${(ev) => setUser(ev.target.value)}
              value=${user}
            />
          <//>

          <div>
            <label class="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Password</label>
            <input
              type="password"
              autocomplete="current-password"
              required
              class="w-full bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all shadow-inner disabled:cursor-not-allowed disabled:opacity-50"
              oninput=${(ev) => setPass(ev.target.value)}
              value=${pass}
              onkeydown=${(ev) => ev.key === 'Enter' && onsubmit(ev)}
            />
          <//>
        <//>

        <div class="mt-8 w-full">
          <${Button}
            title="Sign In"
            icon=${Icons.logout}
            onclick=${onsubmit}
            colors="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            cls="w-full py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex justify-center"
          />
        <//>

        ${tipText ? html`<div class="mt-6 text-center text-slate-500 text-xs font-medium px-4">${tipText}<//>` : ''}
      <//>
    <//>
  `;
}

export function Colored({ icon, text, colors }) {
  colors ||= 'bg-slate-100 text-slate-900';
  return html` <span class="inline-flex items-center gap-1.5 py-0.5">
    ${icon && html`<${icon} class="w-5 h-5" />`}
    <span
      class="inline-block font-medium rounded-md px-2 py-1 text-xs ring-1 ring-inset ${colors}"
      >${text}<//
    >
  <//>`;
}

export function Stat({ title, text, tipText, tipIcon, tipColors, colors }) {
  return html` <div
    class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800"
  >
    <div class="overflow-auto rounded-lg bg-white px-4 py-2 ">
      <div class="flex items-center gap-x-2">
        <p class="text-sm truncate text-gray-500 font-medium">${title}</p>
      <//>
      <div class="mt-1 flex items-center gap-x-2">
        <h3
          class="text-xl truncate font-semibold tracking-tight ${colors ||
          'text-gray-800 dark:text-gray-200'}"
        >
          ${text}
        <//>
        <span class="flex items-center ${tipText || 'hidden'}">
          <${Colored} text=${tipText} icon=${tipIcon} colors=${tipColors} />
        <//>
      <//>
    <//>
  <//>`;
}

export function textSection(labelText, pinValue) {
  return html`
    <div class="grid grid-cols-2 gap-2 my-1">
      <label
        class="flex items-center text-sm text-gray-700 mr-2 font-medium DOUBLE CLICK"
        >${labelText}</label
      >
      <div class="flex items-center">${pinValue}</div>
    </div>
  `;
}
export function TextValue({
  value,
  setfn,
  disabled,
  placeholder,
  type,
  addonRight,
  addonLeft,
  attr,
  min,
  max,
  pattern,
  myclass,
  step,
  mult
}) {
  const [status, setStatus] = useState('ok');
  useEffect(() => {
    if (type == 'number') checkval(+min, +max, +value);
  }, []);
  (step ||= '1'), (mult ||= 1);
  const checkval = function (min, max, v) {
    setStatus('ok');
    if (min && v < min) setStatus('error');
    if (max && v > max) setStatus('error');
  };
  const m = step.match(/^.+\.(.+)/);
  const digits = m ? m[1].length : 0;
  const onchange = (ev) => {
    let v = ev.target.value;
    if (type == 'number') {
      checkval(+min, +max, +v);
      v = +(parseFloat(v) / mult).toFixed(digits);
    }
    setfn(v);
  };
  if (type == 'number') value = +(value * mult).toFixed(digits);
  const wrapClasses =
    status === 'error'
      ? 'bg-red-50/80 border-red-300/70 focus-within:ring-2 focus-within:ring-red-300/50 focus-within:border-red-300/70'
      : 'bg-white/60 border-white/50 focus-within:ring-2 focus-within:ring-teal-400/50 focus-within:border-teal-400/50';
  return html` <div
    class="flex w-full items-center rounded-xl border backdrop-blur-sm shadow-inner transition-all overflow-hidden ${wrapClasses} ${disabled
      ? 'opacity-50'
      : ''}"
  >
    ${addonLeft &&
    html`<span
      class="inline-flex font-medium truncate py-1.5 border-r border-white/50 bg-white/40 items-center px-2 text-slate-500 text-xs"
      >${addonLeft}<//
    >`}
    <input
      type=${type || 'text'}
      disabled=${disabled}
      value=${value}
      step=${step}
      min=${min}
      max=${max}
      pattern=${pattern}
      onchange=${onchange}
      ...${attr}
      class="bg-transparent font-medium text-sm w-full flex-1 py-1.5 px-3 text-slate-800 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed ${myclass}"
      placeholder=${placeholder}
    />
    ${addonRight &&
    html`<span
      class="inline-flex font-medium truncate py-1.5 border-l border-white/50 bg-white/40 items-center px-2 text-slate-500 text-xs overflow-scroll"
      style="min-width: 50%;"
      >${addonRight}<//
    >`}
  <//>`;
}

export function SelectValue({ value, setfn, options, disabled }) {
  const toInt = (x) => (x == parseInt(x) ? parseInt(x) : x);
  const onchange = (ev) => setfn(toInt(ev.target.value));
  return html` <div class="relative w-full">
    <select
      onchange=${onchange}
      class="w-full appearance-none rounded-xl font-medium border border-white/50 bg-white/60 backdrop-blur-sm shadow-inner py-1.5 pl-3 pr-8 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all disabled:cursor-not-allowed disabled:opacity-50"
      disabled=${disabled}
    >
      ${options.map(
        (v) =>
          html`<option value=${v[0]} selected=${v[0] == value}>${v[1]}<//>`
      )}
    <//>
    <svg
      class="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    <//>
  <//>`;
}

export function SwitchValue({ value, setfn }) {
  const onclick = (ev) => setfn(!value);
  const bg = !!value ? 'bg-blue-600' : 'bg-gray-200';
  const tr = !!value ? 'translate-x-5' : 'translate-x-0';
  return html` <button
    type="button"
    onclick=${onclick}
    class="${bg} inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0 ring-0"
    role="switch"
    aria-checked=${!!value}
  >
    <span
      aria-hidden="true"
      class="${tr} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 focus:ring-0 transition duration-200 ease-in-out"
    ></span>
  </button>`;
}

export function Setting(props) {
  let input = TextValue;
  if (props.type == 'switch') input = SwitchValue;
  if (props.type == 'select') input = SelectValue;
  return html` <div class=${props.cls || 'grid grid-cols-2 gap-2 my-1'}>
    <label
      class="flex items-center text-sm text-gray-700 mr-2 font-medium ${props.title ||
      'hidden'}"
      >${props.title}<//
    >
    <div class="flex items-center">${h(input, props)}<//>
  <//>`;
}

export function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  setPageFn,
  colors
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPageRange = 2;
  const lessThanSymbol = '<';
  const greaterThanSymbol = '>';
  const whiteSpace = ' ';
  const itemcls =
    'relative inline-flex items-center px-3 py-1 text-sm focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-blue-600';
  colors ||= 'bg-blue-600';

  const PageItem = ({ page, isActive }) =>
    html`<a
      onClick=${() => setPageFn(page)}
      class="${itemcls} ${isActive
        ? `${colors} text-white`
        : 'cursor-pointer text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'}"
    >
      ${page}
    </a>`;

  return html` <div
    class="flex items-center justify-between bg-white px-3 py-2"
  >
    <div
      class="sm:flex sm:flex-1 sm:items-center sm:justify-between space-x-4 whitespace-nowrap select-none"
    >
      <p class="text-sm text-slate-500 font-medium">
        showing
        <span class="font-bold text-slate-700"
          >${(currentPage - 1) * itemsPerPage + 1}</span
        >
        -
        <span class="font-medium"
          >${Math.min(currentPage * itemsPerPage, totalItems)}</span
        >
        of ${whiteSpace}
        <span class="font-bold text-slate-700">${totalItems}</span> results
      </p>
      <div>
        <nav
          class="isolate inline-flex -space-x-px rounded-md"
          aria-label="Pagination"
        >
          <a
            onClick=${() => setPageFn(Math.max(currentPage - 1, 1))}
            class="relative inline-flex px-3 items-center text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${currentPage !=
            1
              ? 'cursor-pointer'
              : ''} focus:z-20 focus:outline-offset-0"
          >
            ${lessThanSymbol}
          </a>

          <${PageItem} page=${1} isActive=${currentPage === 1} />
          ${currentPage > maxPageRange + 2
            ? html`<span
                class="${itemcls} ring-1 ring-inset ring-gray-300 text-slate-300"
                >...</span
              >`
            : ''}
          ${Array.from(
            { length: Math.min(totalPages, maxPageRange * 2 + 1) },
            (_, i) => Math.max(2, currentPage - maxPageRange) + i
          ).map(
            (page) =>
              page > 1 &&
              page < totalPages &&
              html`<${PageItem}
                page=${page}
                isActive=${currentPage === page}
              />`
          )}
          ${currentPage < totalPages - (maxPageRange + 1)
            ? html`<span
                class="${itemcls} ring-1 ring-inset ring-gray-300 text-slate-300"
                >...</span
              >`
            : ''}
          ${totalPages > 1
            ? html`<${PageItem}
                page=${totalPages}
                isActive=${currentPage === totalPages}
              />`
            : ''}

          <a
            onClick=${() => setPageFn(Math.min(currentPage + 1, totalPages))}
            class="relative inline-flex px-3 items-center text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${currentPage !=
            totalPages
              ? 'cursor-pointer'
              : ''} focus:z-20 focus:outline-offset-0"
          >
            ${greaterThanSymbol}
          </a>
        </nav>
      </div>
    </div>
  </div>`;
}

export function UploadFileButton(props) {
  const [upload, setUpload] = useState(null); // Upload promise
  const [status, setStatus] = useState(''); // Current upload status
  const btn = useRef(null);
  const input = useRef(null);

  // Send a large file chunk by chunk
  const sendFileData = function (url, fileName, fileData, chunkSize) {
    return new Promise(function (resolve, reject) {
      const finish = (ok) => {
        setUpload(null);
        const res = props.onupload
          ? props.onupload(ok, fileName, fileData.length)
          : null;
        if (res && typeof res.catch === 'function') {
          res.catch(() => false).then(() => (ok ? resolve() : reject()));
        } else {
          ok ? resolve() : reject();
        }
      };
      const sendChunk = function (offset) {
        var chunk = fileData.subarray(offset, offset + chunkSize) || '';
        var opts = { method: 'POST', body: chunk };
        var fullUrl =
          url +
          '?offset=' +
          offset +
          '&total=' +
          fileData.length +
          '&name=' +
          encodeURIComponent(fileName);
        var ok;
        setStatus(
          'Uploading ' +
            fileName +
            ', bytes ' +
            offset +
            '..' +
            (offset + chunk.length) +
            ' of ' +
            fileData.length
        );
        fetch(fullUrl, opts)
          .then(function (res) {
            if (res.ok && chunk.length > 0) sendChunk(offset + chunk.length);
            ok = res.ok;
            return res.text();
          })
          .then(function (text) {
            if (!ok) setStatus('Error: ' + text), finish(ok); // Fail
            if (chunk.length > 0) return; // More chunks to send
            setStatus((x) => x + '. Done, resetting device...');
            finish(ok); // All chunks sent
          });
      };
      sendChunk(0);
    });
  };

  const onchange = function (ev) {
    if (!ev.target.files[0]) return;
    let r = new FileReader(),
      f = ev.target.files[0];
    r.readAsArrayBuffer(f);
    r.onload = function () {
      setUpload(
        sendFileData(props.url, f.name, new Uint8Array(r.result), 2048)
      );
      ev.target.value = '';
      ev.preventDefault();
      btn && btn.current.base.click();
    };
  };

  const onclick = function (ev) {
    let fn;
    setUpload((x) => (fn = x));
    if (!fn) input.current.click(); // No upload in progress, show file dialog
    return fn;
  };

  return html` <div class="inline-flex flex-col ${props.class}">
    <input
      class="hidden"
      type="file"
      ref=${input}
      onchange=${onchange}
      accept=${props.accept}
    />
    <${Button}
      title=${props.title}
      icon=${Icons.download}
      onclick=${onclick}
      ref=${btn}
      colors=${props.colors}
    />
    <div class="pt-2 text-sm text-slate-400 ${status || 'hidden'}">${status}<//>
  <//>`;
}
