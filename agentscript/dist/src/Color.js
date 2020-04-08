// A general color module, supporting css string colors, canvas2d pixel
// colors, webgl and canvas2d Uint8ClampedArray r,g,b,a arrays.
// Notice a JavaScript Array is **not** a color!

import util from './util.js'

const Color = {
    // ### CSS Color Strings.

    // CSS colors in HTML are strings, see [Mozillas Color Reference](
    // https://developer.mozilla.org/en-US/docs/Web/CSS/color_value),
    // taking one of 7 forms:
    //
    // * Names: over 140 color case-insensitive names like
    //   Red, Green, CadetBlue, etc.
    // * Hex, short and long form: #0f0, #ff10a0
    // * RGB: rgb(255, 0, 0), rgba(255, 0, 0, 0.5)
    // * HSL: hsl(120, 100%, 50%), hsla(120, 100%, 50%, 0.8)
    //
    // See [this wikipedia article](https://goo.gl/ev8Kw0)
    // on differences between HSL and HSB/HSV.

    // Convert 4 r,g,b,a ints in [0-255] ("a" defaulted to 255) to a
    // css color string. Alpha "a" is converted to float in 0-1 for css string.
    // We use alpha in [0-255] to be compatible with TypedArray conventions.
    rgbaCssColor(r, g, b, a = 255) {
        a = a / 255
        const a2 = a.toPrecision(2)
        return a === 1 ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${a2})`
    },

    // Convert 4 ints, h,s,l,a, h in [0-360], s,l in [0-100]% a in [0-255] to a
    // css color string. Alpha "a" is converted to float in 0-1 for css string.
    //
    // NOTE: h=0 and h=360 are the same, use h in 0-359 for unique colors.
    hslCssColor(h, s, l, a = 255) {
        a = a / 255
        const a4 = a.toPrecision(4)
        return a === 1
            ? `hsl(${h},${s}%,${l}%)`
            : `hsla(${h},${s}%,${l}%,${a4})`
    },

    // Return a html/css hex color string for an r,g,b opaque color (a=255).
    // Hex strings do not support alpha.
    //
    // Both #nnn and #nnnnnn forms supported.
    // Default is to check for the short hex form.
    hexCssColor(r, g, b) {
        return `#${(0x1000000 | (b | (g << 8) | (r << 16)))
            .toString(16)
            .slice(-6)}`
    },

    // cssColor is a hybrid string and is our standard.  It returns:
    //
    // * rgbaCssColor if a not 255 (i.e. not opaque)
    // * hexCssColor otherwise
    cssColor(r, g, b, a = 255) {
        return a === 255
            ? this.hexCssColor(r, g, b, true)
            : this.rgbaCssColor(r, g, b, a)
    },

    randomCssColor() {
        const r255 = () => util.randomInt(256) // random int in [0,255]
        return this.cssColor(r255(), r255(), r255())
    },

    randomGrayCssColor(min = 0, max = 255) {
        const gray = util.randomInt2(min, max) // random int in [min,max]
        return this.cssColor(gray, gray, gray)
    },

    // ### Pixels

    cssToPixel(string) {
        const rgba = this.cssToUint8Array(string)
        return this.rgbaToPixel(...rgba)
    },

    rgbaToPixel(r, g, b, a = 255) {
        const rgba = new Uint8Array([r, g, b, a])
        const pixels = new Uint32Array(rgba.buffer)
        return pixels[0]
    },

    randomPixel() {
        const r255 = () => util.randomInt(256) // random int in [0,255]
        return this.rgbaToPixel(r255(), r255(), r255())
    },

    randomGrayPixel(min = 0, max = 255) {
        const gray = util.randomInt2(min, max) // random int in [min,max]
        return this.rgbaToPixel(gray, gray, gray)
    },

    // ### CSS String Conversions

    // Return 4 element array given any legal CSS string color.
    //
    // Because strings vary widely: CadetBlue, #0f0, rgb(255,0,0),
    // hsl(120,100%,50%), we do not parse strings, instead we let
    // the browser do our work: we fill a 1x1 canvas with the css string color,
    // returning the r,g,b,a canvas ImageData TypedArray.

    // The shared 1x1 canvas 2D context.
    sharedCtx1x1: util.createCtx(1, 1), // share across calls.
    // Convert any css string to 4 element Uint8ClampedArray TypedArray.
    // If you need a JavaScript Array, use `new Array(...TypedArray)`
    // Slow, but works for all css strings: hsl, rgb, .. as well as names.
    cssToUint8Array(string) {
        this.sharedCtx1x1.clearRect(0, 0, 1, 1)
        this.sharedCtx1x1.fillStyle = string
        this.sharedCtx1x1.fillRect(0, 0, 1, 1)
        return this.sharedCtx1x1.getImageData(0, 0, 1, 1).data
    },

    // ### Typed Color
    // A Color is a 4 element Uint8ClampedArray, with two properties:
    //
    // * pixelArray: A single element Uint32Array view on the Uint8ClampedArray
    // * string: an optional, lazy evaluated, css color string.
    //
    // This provides a universal color, good for canvas2d pixels, webgl & image
    // TypedArrays, and css/canvas2d strings.

    // Create Color from r,g,b,a.
    // This uses prototypal inheritance and does not need the new keyword.
    // If g is undefinec, returns toTypedColor(g)
    typedColor(r, g, b, a = 255) {
        if (g === undefined) return this.toTypedColor(r)
        const u8array = new Uint8ClampedArray([r, g, b, a])
        u8array.pixelArray = new Uint32Array(u8array.buffer) // one element array
        // Make this an instance of TypedColorProto
        Object.setPrototypeOf(u8array, TypedColorProto)
        return u8array
    },
    isTypedColor(any) {
        return any && any.constructor === Uint8ClampedArray && any.pixelArray
    },
    // Create a Color from a css string, pixel, JavaScript or Typed Array.
    // Returns `any` if is Color already. Useful for
    // ```
    // css: `toTypedColor('#ff0a00')`
    // hsl: `toTypedColor('hsl(200,100%,50%)')`
    // named colors: `toTypedColor('CadetBlue')`
    // pixels: `toTypedColor(4294945280)` !! Little Endian !!
    // JavaScript Arrays: `toTypedColor([255,0,0])`
    // ```
    toTypedColor(any) {
        if (this.isTypedColor(any)) return any
        const tc = this.typedColor(0, 0, 0, 0) // "empty" typed color
        if (util.isInteger(any)) {
            tc.setPixel(any)
        } else if (typeof any === 'string') {
            tc.setCss(any)
        } else if (Array.isArray(any) || util.isUintArray(any)) {
            tc.setColor(...any)
        } else if (util.isFloatArray(any)) {
            tc.setWebgl(any)
        } else {
            throw Error('toTypedColor: invalid argument', any)
        }
        return tc
    },
    // Return a random rgb Color, a=255
    randomTypedColor() {
        const r255 = () => util.randomInt(256) // random int in [0,255]
        return this.typedColor(r255(), r255(), r255())
    },
    // Random gray color, alpha = 255
    randomGrayTypedColor(min = 0, max = 255) {
        const gray = util.randomInt2(min, max) // random int in [min,max]
        return this.typedColor(gray, gray, gray)
    },
    // A static transparent color, set at end of file
    // transparent: null
}

// Prototype for Color. Getters/setters for usability, may be slower.
const TypedColorProto = {
    // Inherit from Uint8ClampedArray
    __proto__: Uint8ClampedArray.prototype,

    // Set the Color to new rgba values.
    setColor(r, g, b, a = 255) {
        this.checkColorChange()
        this[0] = r
        this[1] = g
        this[2] = b
        this[3] = a
    },
    // No real need for getColor, it *is* the typed Uint8 array
    set rgb(rgbaArray) {
        this.setColor(...rgbaArray)
    },
    get rgb() {
        return this
    },

    // Set opacity to a value in 0-255
    setAlpha(alpha) {
        this.checkColorChange()
        this[3] = alpha // Uint8ClampedArray will clamp to 0-255
    },
    getAlpha() {
        return this[3]
    },
    get alpha() {
        return this.getAlpha()
    },
    set alpha(alpha) {
        this.setAlpha(alpha)
    },

    // Set the Color to a new pixel value
    setPixel(pixel) {
        this.checkColorChange()
        this.pixelArray[0] = pixel
    },
    // Get the pixel value
    getPixel() {
        return this.pixelArray[0]
    },
    get pixel() {
        return this.getPixel()
    },
    set pixel(pixel) {
        this.setPixel(pixel)
    },

    // Set pixel/rgba values to equivalent of the css string.
    // 'red', '#f00', 'ff0000', 'rgb(255,0,0)', etc.
    //
    // Does *not* set the chached this.string, which will be lazily evaluated
    // to its common cssColor by getCss(). The above would all return '#f00'.
    setCss(string) {
        return this.setColor(...Color.cssToUint8Array(string))
    },
    // Return the cssColor for this Color, cached in the @string value
    getCss() {
        if (this.string == null) this.string = Color.cssColor(...this)
        return this.string
    },
    get css() {
        return this.getCss()
    },
    set css(string) {
        this.setCss(string)
    },

    // Note: webgl colors are 3 RGB floats (no A) if A is 255.
    setWebgl(floatArray) {
        this.setColor(
            // OK if float * 255 non-int, setColor stores into uint8 array
            floatArray[0] * 255,
            floatArray[1] * 255,
            floatArray[2] * 255,
            floatArray.length === 4 ? floatArray[3] * 255 : undefined
        )
    },
    getWebgl() {
        if (this.floatArray == null) {
            const floats = [this[0] / 255, this[1] / 255, this[2] / 255]
            if (this[3] !== 255) floats.push(this[3] / 255)
            this.floatArray = new Float32Array(floats)
        }
        return this.floatArray
    },
    get webgl() {
        return this.getWebgl()
    },
    set webgl(floatArray) {
        this.setWebgl(floatArray)
    },

    // Housekeeping when the color is modified.
    checkColorChange() {
        // Reset string & webgl on color change.
        this.string = null // will be lazy evaluated via getCss.
        this.floatArray = null
    },
    // Return true if color is same value as myself, comparing pixels
    equals(color) {
        return this.getPixel() === color.getPixel()
    },
    toString() {
        return `[${Array.from(this).toString()}]`
    },
    // Return a [distance metric](
    // http://www.compuphase.com/cmetric.htm) between two colors.
    // Max distance is roughly 765 (3*255), for black & white.
    // For our purposes, omitting the sqrt will not effect our results
    rgbDistance(r, g, b) {
        const [r1, g1, b1] = this
        const rMean = Math.round((r1 + r) / 2)
        const [dr, dg, db] = [r1 - r, g1 - g, b1 - b]
        const [dr2, dg2, db2] = [dr * dr, dg * dg, db * db]
        const distanceSq =
            (((512 + rMean) * dr2) >> 8) +
            4 * dg2 +
            (((767 - rMean) * db2) >> 8)
        return distanceSq // Math.sqrt(distanceSq)
    },
}

export default Color
