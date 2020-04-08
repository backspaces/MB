import DropletsModel from '../models/DropletsModel.js'
import TwoMVC from './TwoMVC.js'
import Color from '../src/Color.js'
import ColorMap from '../src/ColorMap.js'

export default class DropletsMVC extends TwoMVC {
    static defaultOptions() {
        return {
            // Model defaults, you can override here:
            // stepType choices:
            //    'minNeighbor',
            //    'patchAspect',
            //    'dataSetAspectNearest',
            //    'dataSetAspectBilinear',
            // stepType: 'dataSetAspectNearest',
            // killOffworld: false, // Kill vs clamp turtles when offworld.
            // tile:
            //     'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/13/1594/3339.png',
            // speed: 0.2,

            // TwoMVC defaults, you can override here:
            // div: document.body,
            // useSprites: false,
            // patchSize: 10,

            useSprites: true,

            // View parameters, used by draw() below
            shape: 'circle',
            shapeColor: 'yellow',
            shapeSize: 0.5,
            grayColorMap: ColorMap.grayColorMap(),
            localMinColor: Color.typedColor(255, 0, 0), // 'red'?
        }
    }

    // ======================

    constructor(options) {
        options = Object.assign(DropletsMVC.defaultOptions(), options)
        super(new DropletsModel(), options)
        Object.assign(this, options)
    }

    // Extend setup to initialize patches
    setup() {
        console.log('calling super')
        super.setup()
        console.log('setting up view')

        // Install patche colors from their elevations
        const patchColors = this.getPatchColors()
        this.view.createPatchPixels(i => patchColors[i].pixel)
    }

    draw() {
        // view.clear() // REMIND: uses toWindow's view!!
        view.drawPatches() // redraw cached patches colors
        view.drawTurtles(model.turtles, {
            shape: this.shape,
            color: this.shapeColor,
            size: this.shapeSize,
        })
    }

    // Use patches.elevation to set patch colors
    getPatchColors() {
        const elevation = model.patches.exportDataSet('elevation')
        const grays = elevation.scale(0, 255).data
        const colors = grays.map(d => this.grayColorMap[Math.round(d)])
        model.localMins.forEach(p => (colors[p.id] = this.localMinColor))
        return colors
    }
}
