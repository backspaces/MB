import Model from '../src/Model.js'
import util from '../src/util.js'

util.toWindow({ Model, util })

class LinksModel extends Model {
    setup() {
        this.turtles.setDefault('atEdge', 'bounce')

        this.patches.ask(p => {
            p.data = util.randomFloat(100)
        })

        this.turtles.create(1000, t => {
            // t.size = util.randomFloat2(0.2, 0.5) // + Math.random()
            t.speed = util.randomFloat2(0.01, 0.05) // 0.5 + Math.random()
        })

        this.turtles.ask(turtle => {
            const other = this.turtles.otherOneOf(turtle)
            if (turtle.links.length === 0 || other.links.length === 0) {
                this.links.create(turtle, other, link => {
                    link.data = util.randomInt(100)
                })
            }
        })
    }
    step() {
        this.turtles.ask(t => {
            t.theta += util.randomCentered(0.1)
            t.forward(t.speed)
        })
    }
}

const usingPuppeteer = navigator.userAgent === 'Puppeteer'
if (usingPuppeteer) util.randomSeed()

const model = new LinksModel() // default world.
model.setup()

// Debugging
util.printToPage('patches: ' + model.patches.length)
util.printToPage('turtles: ' + model.turtles.length)
util.printToPage('links: ' + model.links.length)
const { world, patches, turtles, links } = model
util.toWindow({ world, patches, turtles, links, model })

// util.repeat(500, () => model.step())
util.yieldLoop(() => model.step(), 500)

util.printToPage('')
const sample = util.sampleModel(model)
util.printToPage(sample)

if (usingPuppeteer) {
    // window.modelDone = model.modelDone = true
    // window.modelSample = model.modelSample = util.sampleJSON(model)
    window.modelSample = JSON.stringify(sample)
}
