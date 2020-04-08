var Model = AS.Model

class ButtonsModel extends Model {
    static defaultOptions() {
        return {
            population: 200, // number of buttons
        }
    }

    // ======================

    constructor(worldDptions) {
        super(worldDptions) // default world options if "undefined"
        Object.assign(this, ButtonsModel.defaultOptions())
    }

    setup() {
        this.turtles.setDefault('heading', 0) // override promotion to random angle

        this.cluster = new Set()
        this.done = false

        this.turtles.create(this.population, t =>
            t.setxy(...this.world.randomPatchPoint())
        )
    }

    step() {
        if (this.done) return // done, idleing

        const b1 = this.turtles.oneOf()
        const b2 = this.turtles.otherOneOf(b1)

        this.links.create(b1, b2)

        const vertices = this.graphOf(b1)
        if (vertices.size > this.cluster.size) this.cluster = vertices

        if (this.cluster.size === this.turtles.length) {
            this.done = true
            console.log(`Done at tick: ${this.ticks}`)
        }
    }

    graphOf(t) {
        const vertices = new Set()
        this.addNeighbors(t, vertices)
        return vertices
    }
    addNeighbors(t, vertices) {
        vertices.add(t)
        t.linkNeighbors().ask(n => {
            if (!vertices.has(n)) this.addNeighbors(n, vertices)
        })
    }
}
const defaultModel = ButtonsModel

