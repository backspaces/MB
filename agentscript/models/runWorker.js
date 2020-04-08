import util from '../src/util.js'

let model, params

onmessage = e => {
    if (e.data.cmd === 'init') {
        params = e.data.params
        console.log('worker: params', params)

        async function run() {
            const module = await import(params.classPath)
            const Model = module.default

            if (params.seed) util.randomSeed()

            model = new Model()
            console.log('worker: params', params, 'model:', model)

            await model.startup()
            model.setup()
            util.repeat(params.steps, () => {
                model.step()
                model.tick()
            })
            console.log('worker: done, model', model)

            postMessage(util.sampleModel(model))
        }
        run()
    } else {
        console.log('Oops, unknown message: ', e)
    }
}
