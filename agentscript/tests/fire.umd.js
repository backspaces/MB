importScripts('../dist/agentscript.umd.js')
importScripts('../models/scripts/FireModel.js')

// AS.util.randomSeed() // for consistant results over runs

let model

onmessage = e => {
    console.log('worker onmessage e.data = ', e.data)
    if (e.data.cmd === 'init') {
        const options = AS.World.defaultWorld(e.data.size)
        model = new FireModel(options)
        model.setup()
        console.log('worker model:', model)
        console.log('worker self:', self)
        console.log('worker message data:', e.data)
        postMessage(model.patches.props('type'))
    } else if (e.data.cmd === 'step') {
        if (model.isDone()) {
            postMessage('done')
        } else {
            model.step()
            // postMessage(model.patches.props('type'))
            postMessage(getData())
        }
    } else if (e.data.cmd === 'script') {
        importScripts(e.data.url)
        console.log(getData)
    } else {
        console.log('Oops, unknown message: ', e)
    }
}
