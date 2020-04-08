import util from '../src/util.js'
import AntsModel from '../models/AntsModel.js'
console.log('worker self', self)

let model, params

function postData() {
    const data = {
        patches: model.patches.typedSample({
            foodPheromone: Float32Array,
            nestPheromone: Float32Array,
        }),
        turtles: model.turtles.typedSample({
            x: Float32Array,
            y: Float32Array,
            theta: Float32Array,
            carryingFood: Uint8Array,
        }),
    }
    postMessage(data, util.oofaBuffers(data))
    if (data.turtles.x.length !== 0) console.log('to data', data)
    model.tick()
}

onmessage = e => {
    if (e.data.cmd === 'init') {
        params = e.data.params
        if (params.seed) util.randomSeed()
        model = new AntsModel(params.world)
        model.population = params.population
        model.setup()

        console.log('worker: params', params)
        console.log('worker: model:', model)
        postData()
    } else if (e.data.cmd === 'step') {
        if (model.ticks === params.steps) {
            postMessage('done')
        } else {
            model.step()
            postData()
        }
    } else {
        console.log('Oops, unknown message: ', e)
    }
}
