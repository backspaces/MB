import util from './util.js'

// class World defines the coordinate system for the model.
// It will be upgraded with methods converting from other
// transforms like GIS and DataSets.

export default class World {
    static defaultOptions(maxX = 16, maxY = maxX) {
        return {
            minX: -maxX,
            maxX: maxX,
            minY: -maxY,
            maxY: maxY,
        }
    }
    static defaultWorld(maxX = 16, maxY = maxX) {
        return new World(World.defaultOptions(maxX, maxY))
    }

    // ======================

    // Initialize the world w/ defaults overridden w/ options.
    constructor(options = World.defaultOptions()) {
        // Object.assign(this, World.defaultOptions()) // initial this w/ defaults
        // Object.assign(this, options) // override defaults with options
        Object.assign(this, options) // set the 4 option values
        this.setWorld() // convert these to rest of world parameters
    }
    // Complete properties derived from minX/Y, maxX/Y (patchSize === 1)
    setWorld() {
        this.numX = this.width = this.maxX - this.minX + 1
        this.numY = this.height = this.maxY - this.minY + 1
        this.minXcor = this.minX - 0.5
        this.maxXcor = this.maxX + 0.5
        this.minYcor = this.minY - 0.5
        this.maxYcor = this.maxY + 0.5
        // The midpoints of the world, in world coords.
        // (0, 0) for the centered default worlds. REMIND: remove?
        this.centerX = (this.minX + this.maxX) / 2
        this.centerY = (this.minY + this.maxY) / 2
        this.numPatches = this.width * this.height
    }
    randomPoint() {
        return [
            util.randomFloat2(this.minXcor, this.maxXcor),
            util.randomFloat2(this.minYcor, this.maxYcor),
        ]
    }
    randomPatchPoint() {
        return [
            // REMIND: can maxX/Y be in the result?
            util.randomInt2(this.minX, this.maxX),
            util.randomInt2(this.minY, this.maxY),
        ]
    }
    // Test x,y for being on-world.
    isOnWorld(x, y) {
        return (
            this.minXcor <= x &&
            x <= this.maxXcor &&
            this.minYcor <= y &&
            y <= this.maxYcor
        )
    }
    // cropToWorld(x, y) {}

    bboxTransform(topLeft, bottomRight) {
        return new BBoxTransform(topLeft, bottomRight, this)
    }

    // ### Following use PatchSize

    // Get the world size in pixels. PatchSize is optional, defalting to 1
    getWorldSize(patchSize = 1) {
        return [this.numX * patchSize, this.numY * patchSize]
    }

    // Convert a canvas context to world euclidean coordinates
    // Change the ctx.canvas size, determined by patchSize.
    setEuclideanTransform(ctx, patchSize) {
        // ctx.canvas.width = this.numX * patchSize
        // ctx.canvas.height = this.numY * patchSize
        this.setCanvasSize(ctx.canvas, patchSize)
        ctx.restore() // close earlier save(). OK if no save called yet.
        ctx.save()
        ctx.scale(patchSize, -patchSize)
        ctx.translate(-this.minXcor, -this.maxYcor)
    }
    // Return patch size for given canvas.
    // Error if canvas patch width/height differ.
    patchSize(canvas) {
        const { numX, numY } = this
        const { clientWidth: width, clientHeight: height } = canvas
        const xSize = width / numX
        const ySize = height / numY
        if (xSize !== ySize) {
            throw Error(`World patchSize: x/y sizes differ ${xSize}, ${ySize}`)
        }
        return xSize
    }
    // Change canvas size to this world's size.
    // Does not change size if already the same, preserving the ctx content.
    setCanvasSize(canvas, patchSize) {
        const [width, height] = this.getWorldSize(patchSize)
        util.setCanvasSize(canvas, width, height)
    }

    // Convert pixel location (top/left offset i.e. mouse) to patch coords (float)
    pixelXYtoPatchXY(x, y, patchSize) {
        return [this.minXcor + x / patchSize, this.maxYcor - y / patchSize]
    }
    // Convert patch coords (float) to pixel location (top/left offset i.e. mouse)
    patchXYtoPixelXY(x, y, patchSize) {
        return [(x - this.minXcor) * patchSize, (this.maxYcor - y) * patchSize]
    }

    xyToPatchIndex(x, y) {
        if (!this.isOnWorld(x, y)) return undefined
        const { minX, maxY, numX, maxXcor, maxYcor } = this
        x = x === maxXcor ? maxX : Math.round(x)
        y = y === maxYcor ? maxY : Math.round(y)
        return x - minX + numX * (maxY - y)
    }
    // patchIndexToXY(index) {}
}

class BBoxTransform {
    constructor(topLeft, bottomRight, world) {
        // const [topX, topY] = topLeft
        // const [botX, botY] = bottomRight
        let [topX, topY] = topLeft
        let [botX, botY] = bottomRight

        if (topX < botX) console.log('flipX')
        if (topY < botY) console.log('flipY')

        if (topX < botX) [topX, botX] = [botX, topX]
        if (topY < botY) [topY, botY] = [botY, topY]
        const { maxXcor, maxYcor, minXcor, minYcor } = world

        // console.log('topX, botX:', topX, botX)
        // console.log('topY, botY', topY, botY)

        const mx = (topX - botX) / (maxXcor - minXcor)
        const my = (topY - botY) / (maxYcor - minYcor)

        const bx = (topX + botX - mx * (maxXcor + minXcor)) / 2
        const by = (topY + botY - my * (maxYcor + minYcor)) / 2

        Object.assign(this, { mx, my, bx, by })
    }
    toWorld(tlbrPoint) {
        const { mx, my, bx, by } = this
        const [tlbrX, tlbrY] = tlbrPoint
        const x = (tlbrX - bx) / mx
        const y = (tlbrY - by) / my
        return [x, y]
    }
    toBBox(worldPoint) {
        const { mx, my, bx, by } = this
        const [worldX, worldY] = worldPoint
        const x = mx * worldX + bx
        const y = my * worldY + by
        return [x, y]
    }
}

// export default World

// The midpoints of the world, in world coords.
// (0, 0) for the centered default worlds. REMIND: remove?
// this.centerX = (this.minX + this.maxX) / 2
// this.centerY = (this.minY + this.maxY) / 2

// Calculate patchSize from canvas (any imagable) dimensions
// canvasPatchSize(canvas) {
//     // const [width, height] = canvas
//     return canvas.width / this.numX
// }
// canvasSize(patchSize) {
//     return [this.numX * patchSize, this.numY * patchSize]
// }
