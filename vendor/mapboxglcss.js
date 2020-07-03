
export default `<style>
.mapboxgl-map {
    font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
    overflow: hidden;
    position: relative;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.mapboxgl-canvas {
    position: absolute;
    left: 0;
    top: 0;
}

.mapboxgl-map:-webkit-full-screen {
    width: 100%;
    height: 100%;
}

.mapboxgl-canary {
    background-color: salmon;
}

.mapboxgl-canvas-container.mapboxgl-interactive,
.mapboxgl-ctrl-group button.mapboxgl-ctrl-compass {
    cursor: -webkit-grab;
    cursor: -moz-grab;
    cursor: grab;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.mapboxgl-canvas-container.mapboxgl-interactive.mapboxgl-track-pointer {
    cursor: pointer;
}

.mapboxgl-canvas-container.mapboxgl-interactive:active,
.mapboxgl-ctrl-group button.mapboxgl-ctrl-compass:active {
    cursor: -webkit-grabbing;
    cursor: -moz-grabbing;
    cursor: grabbing;
}

.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate,
.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate .mapboxgl-canvas {
    touch-action: pan-x pan-y;
}

.mapboxgl-canvas-container.mapboxgl-touch-drag-pan,
.mapboxgl-canvas-container.mapboxgl-touch-drag-pan .mapboxgl-canvas {
    touch-action: pinch-zoom;
}

.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan,
.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan .mapboxgl-canvas {
    touch-action: none;
}

.mapboxgl-ctrl-top-left,
.mapboxgl-ctrl-top-right,
.mapboxgl-ctrl-bottom-left,
.mapboxgl-ctrl-bottom-right { position: absolute; pointer-events: none; z-index: 2; }
.mapboxgl-ctrl-top-left     { top: 0; left: 0; }
.mapboxgl-ctrl-top-right    { top: 0; right: 0; }
.mapboxgl-ctrl-bottom-left  { bottom: 0; left: 0; }
.mapboxgl-ctrl-bottom-right { right: 0; bottom: 0; }

.mapboxgl-ctrl {
    clear: both;
    pointer-events: auto;

    /* workaround for a Safari bug https://github.com/mapbox/mapbox-gl-js/issues/8185 */
    transform: translate(0, 0);
}
.mapboxgl-ctrl-top-left .mapboxgl-ctrl     { margin: 10px 0 0 10px; float: left; }
.mapboxgl-ctrl-top-right .mapboxgl-ctrl    { margin: 10px 10px 0 0; float: right; }
.mapboxgl-ctrl-bottom-left .mapboxgl-ctrl  { margin: 0 0 10px 10px; float: left; }
.mapboxgl-ctrl-bottom-right .mapboxgl-ctrl { margin: 0 10px 10px 0; float: right; }

.mapboxgl-ctrl-group {
    border-radius: 4px;
    background: #fff;
}

.mapboxgl-ctrl-group:not(:empty) {
    -moz-box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}

@media (-ms-high-contrast: active) {
    .mapboxgl-ctrl-group:not(:empty) {
        box-shadow: 0 0 0 2px ButtonText;
    }
}

.mapboxgl-ctrl-group button {
    width: 29px;
    height: 29px;
    display: block;
    padding: 0;
    outline: none;
    border: 0;
    box-sizing: border-box;
    background-color: transparent;
    cursor: pointer;
}

.mapboxgl-ctrl-group button + button {
    border-top: 1px solid #ddd;
}

.mapboxgl-ctrl button .mapboxgl-ctrl-icon {
    display: block;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center center;
}

@media (-ms-high-contrast: active) {
    .mapboxgl-ctrl-icon {
        background-color: transparent;
    }

    .mapboxgl-ctrl-group button + button {
        border-top: 1px solid ButtonText;
    }
}

/* https://bugzilla.mozilla.org/show_bug.cgi?id=140562 */
.mapboxgl-ctrl button::-moz-focus-inner {
    border: 0;
    padding: 0;
}

.mapboxgl-ctrl-group button:focus {
    box-shadow: 0 0 2px 2px rgba(0, 150, 255, 1);
}

.mapboxgl-ctrl button:disabled {
    cursor: not-allowed;
}

.mapboxgl-ctrl button:disabled .mapboxgl-ctrl-icon {
    opacity: 0.25;
}

.mapboxgl-ctrl button:not(:disabled):hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.mapboxgl-ctrl-group button:focus:focus-visible {
    box-shadow: 0 0 2px 2px rgba(0, 150, 255, 1);
}

.mapboxgl-ctrl-group button:focus:not(:focus-visible) {
    box-shadow: none;
}

.mapboxgl-ctrl-group button:focus:first-child {
    border-radius: 4px 4px 0 0;
}

.mapboxgl-ctrl-group button:focus:last-child {
    border-radius: 0 0 4px 4px;
}

.mapboxgl-ctrl-group button:focus:only-child {
    border-radius: inherit;
}

.mapboxgl-ctrl button.mapboxgl-ctrl-zoom-out .mapboxgl-ctrl-icon {
    background-image: svg-load('svg/mapboxgl-ctrl-zoom-out.svg', fill: #333);
}

.mapboxgl-ctrl button.mapboxgl-ctrl-zoom-in .mapboxgl-ctrl-icon {
    background-image: svg-load('svg/mapboxgl-ctrl-zoom-in.svg', fill: #333);
}

@media (-ms-high-contrast: active) {
    .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-out .mapboxgl-ctrl-icon {
        background-image: svg-load('svg/mapboxgl-ctrl-zoom-out.svg', fill: #fff);
    }

    .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-in .mapboxgl-ctrl-icon {
        background-image: svg-load('svg/mapboxgl-ctrl-zoom-in.svg', fill: #fff);
    }
}

@media (-ms-high-contrast: black-on-white) {
    .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-out .mapboxgl-ctrl-icon {
        background-image: svg-load('svg/mapboxgl-ctrl-zoom-out.svg', fill: #000);
    }

    .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-in .mapboxgl-ctrl-icon {
        background-image: svg-load('svg/mapboxgl-ctrl-zoom-in.svg', fill: #000);
    }
}

.mapboxgl-ctrl button.mapboxgl-ctrl-fullscreen .mapboxgl-ctrl-icon {
    background-image: svg-load('svg/mapboxgl-ctrl-fullscreen.svg', fill: #333);
}

.mapboxgl-ctrl button.mapboxgl-ctrl-shrink .mapboxgl-ctrl-icon {
    background-image: svg-load('svg/mapboxgl-ctrl-shrink.svg');
}

@media (-ms-high-contrast: active) {
    .mapboxgl-ctrl button.mapboxgl-ctrl-fullscreen .mapboxgl-ctrl-icon {
        background-image: svg-load('svg/mapboxgl-ctrl-fullscreen.svg', fill: #fff);
    }

    .mapboxgl-ctrl button.mapboxgl-ctrl-shrink .mapboxgl-ctrl-icon {
        background-image: svg-load('svg/mapboxgl-ctrl-shrink.svg', fill: #fff);
    }
}

@media (-ms-high-contrast: black-on-white) {
    .mapboxgl-ctrl button.mapboxgl-ctrl-fullscreen .mapboxgl-ctrl-icon {
        background-image: svg-load('svg/mapboxgl-ctrl-fullscreen.svg', fill: #000);
    }

    .mapboxgl-ctrl button.mapboxgl-ctrl-shrink .mapboxgl-ctrl-icon {
        background-image: svg-load('svg/mapboxgl-ctrl-shrink.svg', fill: #000);
    }
}

.mapboxgl-ctrl button.mapboxgl-ctrl-compass .mapboxgl-ctrl-icon {
    background-image: svg-load('svg/mapboxgl-ctrl-compass.svg', fill: #333);
}

@media (-ms-high-contrast: active) {
    .mapboxgl-ctrl button.mapboxgl-ctrl-compass .mapboxgl-ctrl-icon {
        @svg-load ctrl-compass-white url(svg/mapboxgl-ctrl-compass.svg) {
            fill: #fff;
            #south { fill: #999; }
        }

        background-image: svg-inline(ctrl-compass-white);
    }
}

@media (-ms-high-contrast: black-on-white) {
    .mapboxgl-ctrl button.mapboxgl-ctrl-compass .mapboxgl-ctrl-icon {
        background-image: svg-load('svg/mapboxgl-ctrl-compass.svg', fill: #000);
    }
}

@svg-load ctrl-geolocate url(svg/mapboxgl-ctrl-geolocate.svg) {
    fill: #333;
    #stroke { display: none; }
}

@svg-load ctrl-geolocate-white url(svg/mapboxgl-ctrl-geolocate.svg) {
    fill: #fff;
    #stroke { display: none; }
}

@svg-load ctrl-geolocate-black url(svg/mapboxgl-ctrl-geolocate.svg) {
    fill: #000;
    #stroke { display: none; }
}

@svg-load ctrl-geolocate-disabled url(svg/mapboxgl-ctrl-geolocate.svg) {
    fill: #aaa;
    #stroke { fill: #f00; }
}

@svg-load ctrl-geolocate-disabled-white url(svg/mapboxgl-ctrl-geolocate.svg) {
    fill: #999;
    #stroke { fill: #f00; }
}

@svg-load ctrl-geolocate-disabled-black url(svg/mapboxgl-ctrl-geolocate.svg) {
    fill: #666;
    #stroke { fill: #f00; }
}

@svg-load ctrl-geolocate-active url(svg/mapboxgl-ctrl-geolocate.svg) {
    fill: #33b5e5;
    #stroke { display: none; }
}

@svg-load ctrl-geolocate-active-error url(svg/mapboxgl-ctrl-geolocate.svg) {
    fill: #e58978;
    #stroke { display: none; }
}

@svg-load ctrl-geolocate-background url(svg/mapboxgl-ctrl-geolocate.svg) {
    fill: #33b5e5;
    #stroke { display: none; }
    #dot { display: none; }
}

@svg-load ctrl-geolocate-background-error url(svg/mapboxgl-ctrl-geolocate.svg) {
    fill: #e54e33;
    #stroke { display: none; }
    #dot { display: none; }
}

.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate .mapboxgl-ctrl-icon {
    background-image: svg-inline(ctrl-geolocate);
}

.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate:disabled .mapboxgl-ctrl-icon {
    background-image: svg-inline(ctrl-geolocate-disabled);
}

.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active .mapboxgl-ctrl-icon {
    background-image: svg-inline(ctrl-geolocate-active);
}

.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active-error .mapboxgl-ctrl-icon {
    background-image: svg-inline(ctrl-geolocate-active-error);
}

.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background .mapboxgl-ctrl-icon {
    background-image: svg-inline(ctrl-geolocate-background);
}

.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background-error .mapboxgl-ctrl-icon {
    background-image: svg-inline(ctrl-geolocate-background-error);
}

.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-waiting .mapboxgl-ctrl-icon {
    -webkit-animation: mapboxgl-spin 2s infinite linear;
    -moz-animation: mapboxgl-spin 2s infinite linear;
    -o-animation: mapboxgl-spin 2s infinite linear;
    -ms-animation: mapboxgl-spin 2s infinite linear;
    animation: mapboxgl-spin 2s infinite linear;
}

@media (-ms-high-contrast: active) {
    .mapboxgl-ctrl button.mapboxgl-ctrl-geolocate .mapboxgl-ctrl-icon {
        background-image: svg-inline(ctrl-geolocate-white);
    }

    .mapboxgl-ctrl button.mapboxgl-ctrl-geolocate:disabled .mapboxgl-ctrl-icon {
        background-image: svg-inline(ctrl-geolocate-disabled-white);
    }

    .mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active .mapboxgl-ctrl-icon {
        background-image: svg-inline(ctrl-geolocate-active);
    }

    .mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active-error .mapboxgl-ctrl-icon {
        background-image: svg-inline(ctrl-geolocate-active-error);
    }

    .mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background .mapboxgl-ctrl-icon {
        background-image: svg-inline(ctrl-geolocate-background);
    }

    .mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background-error .mapboxgl-ctrl-icon {
        background-image: svg-inline(ctrl-geolocate-background-error);
    }
}

@media (-ms-high-contrast: black-on-white) {
    .mapboxgl-ctrl button.mapboxgl-ctrl-geolocate .mapboxgl-ctrl-icon {
        background-image: svg-inline(ctrl-geolocate-black);
    }

    .mapboxgl-ctrl button.mapboxgl-ctrl-geolocate:disabled .mapboxgl-ctrl-icon {
        background-image: svg-inline(ctrl-geolocate-disabled-black);
    }
}

@-webkit-keyframes mapboxgl-spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
}

@-moz-keyframes mapboxgl-spin {
    0% { -moz-transform: rotate(0deg); }
    100% { -moz-transform: rotate(360deg); }
}

@-o-keyframes mapboxgl-spin {
    0% { -o-transform: rotate(0deg); }
    100% { -o-transform: rotate(360deg); }
}

@-ms-keyframes mapboxgl-spin {
    0% { -ms-transform: rotate(0deg); }
    100% { -ms-transform: rotate(360deg); }
}

@keyframes mapboxgl-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

a.mapboxgl-ctrl-logo {
    width: 88px;
    height: 23px;
    margin: 0 0 -4px -4px;
    display: block;
    background-repeat: no-repeat;
    cursor: pointer;
    overflow: hidden;
    background-image: svg-load('svg/mapboxgl-ctrl-logo.svg');
}

a.mapboxgl-ctrl-logo.mapboxgl-compact {
    width: 23px;
}

@media (-ms-high-contrast: active) {
    a.mapboxgl-ctrl-logo {
        @svg-load ctrl-logo-white url(svg/mapboxgl-ctrl-logo.svg) {
            #outline { opacity: 1; }
            #fill { opacity: 1; }
        }

        background-color: transparent;
        background-image: svg-inline(ctrl-logo-white);
    }
}

@media (-ms-high-contrast: black-on-white) {
    a.mapboxgl-ctrl-logo {
        @svg-load ctrl-logo-black url(svg/mapboxgl-ctrl-logo.svg) {
            #outline { opacity: 1; fill: #fff; stroke: #fff; }
            #fill { opacity: 1; fill: #000; }
        }

        background-image: svg-inline(ctrl-logo-black);
    }
}

.mapboxgl-ctrl.mapboxgl-ctrl-attrib {
    padding: 0 5px;
    background-color: rgba(255, 255, 255, 0.5);
    margin: 0;
}

@media screen {
    .mapboxgl-ctrl-attrib.mapboxgl-compact {
        min-height: 20px;
        padding: 0;
        margin: 10px;
        position: relative;
        background-color: #fff;
        border-radius: 3px 12px 12px 3px;
    }

    .mapboxgl-ctrl-attrib.mapboxgl-compact:hover {
        padding: 2px 24px 2px 4px;
        visibility: visible;
        margin-top: 6px;
    }

    .mapboxgl-ctrl-top-left > .mapboxgl-ctrl-attrib.mapboxgl-compact:hover,
    .mapboxgl-ctrl-bottom-left > .mapboxgl-ctrl-attrib.mapboxgl-compact:hover {
        padding: 2px 4px 2px 24px;
        border-radius: 12px 3px 3px 12px;
    }

    .mapboxgl-ctrl-attrib.mapboxgl-compact .mapboxgl-ctrl-attrib-inner {
        display: none;
    }

    .mapboxgl-ctrl-attrib.mapboxgl-compact:hover .mapboxgl-ctrl-attrib-inner {
        display: block;
    }

    .mapboxgl-ctrl-attrib.mapboxgl-compact::after {
        content: '';
        cursor: pointer;
        position: absolute;
        background-image: svg-load('svg/mapboxgl-ctrl-attrib.svg');
        background-color: rgba(255, 255, 255, 0.5);
        width: 24px;
        height: 24px;
        box-sizing: border-box;
        border-radius: 12px;
    }

    .mapboxgl-ctrl-bottom-right > .mapboxgl-ctrl-attrib.mapboxgl-compact::after {
        bottom: 0;
        right: 0;
    }

    .mapboxgl-ctrl-top-right > .mapboxgl-ctrl-attrib.mapboxgl-compact::after {
        top: 0;
        right: 0;
    }

    .mapboxgl-ctrl-top-left > .mapboxgl-ctrl-attrib.mapboxgl-compact::after {
        top: 0;
        left: 0;
    }

    .mapboxgl-ctrl-bottom-left > .mapboxgl-ctrl-attrib.mapboxgl-compact::after {
        bottom: 0;
        left: 0;
    }
}

@media screen and (-ms-high-contrast: active) {
    .mapboxgl-ctrl-attrib.mapboxgl-compact::after {
        background-image: svg-load('svg/mapboxgl-ctrl-attrib.svg', fill=#fff);
    }
}

@media screen and (-ms-high-contrast: black-on-white) {
    .mapboxgl-ctrl-attrib.mapboxgl-compact::after {
        background-image: svg-load('svg/mapboxgl-ctrl-attrib.svg');
    }
}

.mapboxgl-ctrl-attrib a {
    color: rgba(0, 0, 0, 0.75);
    text-decoration: none;
}

.mapboxgl-ctrl-attrib a:hover {
    color: inherit;
    text-decoration: underline;
}

/* stylelint-disable-next-line selector-class-pattern */
.mapboxgl-ctrl-attrib .mapbox-improve-map {
    font-weight: bold;
    margin-left: 2px;
}

.mapboxgl-attrib-empty {
    display: none;
}

.mapboxgl-ctrl-scale {
    background-color: rgba(255, 255, 255, 0.75);
    font-size: 10px;
    border-width: medium 2px 2px;
    border-style: none solid solid;
    border-color: #333;
    padding: 0 5px;
    color: #333;
    box-sizing: border-box;
}

.mapboxgl-popup {
    position: absolute;
    top: 0;
    left: 0;
    display: -webkit-flex;
    display: flex;
    will-change: transform;
    pointer-events: none;
}

.mapboxgl-popup-anchor-top,
.mapboxgl-popup-anchor-top-left,
.mapboxgl-popup-anchor-top-right {
    -webkit-flex-direction: column;
    flex-direction: column;
}

.mapboxgl-popup-anchor-bottom,
.mapboxgl-popup-anchor-bottom-left,
.mapboxgl-popup-anchor-bottom-right {
    -webkit-flex-direction: column-reverse;
    flex-direction: column-reverse;
}

.mapboxgl-popup-anchor-left {
    -webkit-flex-direction: row;
    flex-direction: row;
}

.mapboxgl-popup-anchor-right {
    -webkit-flex-direction: row-reverse;
    flex-direction: row-reverse;
}

.mapboxgl-popup-tip {
    width: 0;
    height: 0;
    border: 10px solid transparent;
    z-index: 1;
}

.mapboxgl-popup-anchor-top .mapboxgl-popup-tip {
    -webkit-align-self: center;
    align-self: center;
    border-top: none;
    border-bottom-color: #fff;
}

.mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip {
    -webkit-align-self: flex-start;
    align-self: flex-start;
    border-top: none;
    border-left: none;
    border-bottom-color: #fff;
}

.mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip {
    -webkit-align-self: flex-end;
    align-self: flex-end;
    border-top: none;
    border-right: none;
    border-bottom-color: #fff;
}

.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
    -webkit-align-self: center;
    align-self: center;
    border-bottom: none;
    border-top-color: #fff;
}

.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip {
    -webkit-align-self: flex-start;
    align-self: flex-start;
    border-bottom: none;
    border-left: none;
    border-top-color: #fff;
}

.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip {
    -webkit-align-self: flex-end;
    align-self: flex-end;
    border-bottom: none;
    border-right: none;
    border-top-color: #fff;
}

.mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
    -webkit-align-self: center;
    align-self: center;
    border-left: none;
    border-right-color: #fff;
}

.mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
    -webkit-align-self: center;
    align-self: center;
    border-right: none;
    border-left-color: #fff;
}

.mapboxgl-popup-close-button {
    position: absolute;
    right: 0;
    top: 0;
    border: 0;
    border-radius: 0 3px 0 0;
    cursor: pointer;
    background-color: transparent;
}

.mapboxgl-popup-close-button:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.mapboxgl-popup-content {
    position: relative;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    padding: 10px 10px 15px;
    pointer-events: auto;
}

.mapboxgl-popup-anchor-top-left .mapboxgl-popup-content {
    border-top-left-radius: 0;
}

.mapboxgl-popup-anchor-top-right .mapboxgl-popup-content {
    border-top-right-radius: 0;
}

.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-content {
    border-bottom-left-radius: 0;
}

.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-content {
    border-bottom-right-radius: 0;
}

.mapboxgl-popup-track-pointer {
    display: none;
}

.mapboxgl-popup-track-pointer * {
    pointer-events: none;
    user-select: none;
}

.mapboxgl-map:hover .mapboxgl-popup-track-pointer {
    display: flex;
}

.mapboxgl-map:active .mapboxgl-popup-track-pointer {
    display: none;
}

.mapboxgl-marker {
    position: absolute;
    top: 0;
    left: 0;
    will-change: transform;
}

.mapboxgl-user-location-dot {
    background-color: #1da1f2;
    width: 15px;
    height: 15px;
    border-radius: 50%;
}

.mapboxgl-user-location-dot::before {
    background-color: #1da1f2;
    content: '';
    width: 15px;
    height: 15px;
    border-radius: 50%;
    position: absolute;
    -webkit-animation: mapboxgl-user-location-dot-pulse 2s infinite;
    -moz-animation: mapboxgl-user-location-dot-pulse 2s infinite;
    -ms-animation: mapboxgl-user-location-dot-pulse 2s infinite;
    animation: mapboxgl-user-location-dot-pulse 2s infinite;
}

.mapboxgl-user-location-dot::after {
    border-radius: 50%;
    border: 2px solid #fff;
    content: '';
    height: 19px;
    left: -2px;
    position: absolute;
    top: -2px;
    width: 19px;
    box-sizing: border-box;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.35);
}

@-webkit-keyframes mapboxgl-user-location-dot-pulse {
    0%   { -webkit-transform: scale(1); opacity: 1; }
    70%  { -webkit-transform: scale(3); opacity: 0; }
    100% { -webkit-transform: scale(1); opacity: 0; }
}

@-ms-keyframes mapboxgl-user-location-dot-pulse {
    0%   { -ms-transform: scale(1); opacity: 1; }
    70%  { -ms-transform: scale(3); opacity: 0; }
    100% { -ms-transform: scale(1); opacity: 0; }
}

@keyframes mapboxgl-user-location-dot-pulse {
    0%   { transform: scale(1); opacity: 1; }
    70%  { transform: scale(3); opacity: 0; }
    100% { transform: scale(1); opacity: 0; }
}

.mapboxgl-user-location-dot-stale {
    background-color: #aaa;
}

.mapboxgl-user-location-dot-stale::after {
    display: none;
}

.mapboxgl-user-location-accuracy-circle {
    background-color: #1da1f233;
    width: 1px;
    height: 1px;
    border-radius: 100%;
}

.mapboxgl-crosshair,
.mapboxgl-crosshair .mapboxgl-interactive,
.mapboxgl-crosshair .mapboxgl-interactive:active {
    cursor: crosshair;
}

.mapboxgl-boxzoom {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    background: #fff;
    border: 2px dotted #202020;
    opacity: 0.5;
}

@media print {
    /* stylelint-disable-next-line selector-class-pattern */
    .mapbox-improve-map {
        display: none;
    }
}
</style>
`
