import Animator from '../src/Animator.js'
import GUI from '../src/GUI.js'
import Mouse from '../src/Mouse.js'
import { HelloModelPlus as Model } from '../models/HelloModel.js'
import View from '../models2/HelloView.js'
import util from '../src/util.js'
// util.toWindow({ Animator, GUI, Mouse, Model, View, util })

const template = {
    fps: {
        value: 20,
        extent: [5, 60, 5],
        cmd: val => (animator.fps = val),
    },
    // fps: GUI.item(animator, 'fps', 20, [5, 60, 5]),
    speed: {
        value: 0.1,
        extent: [0.01, 0.5, 0.01],
        cmd: val => (model.speed = val),
    },
    wiggle: {
        value: 0.2,
        extent: [0, 1, 0.1],
        cmd: val => (model.wiggle = val),
    },
    patchSize: {
        value: 12,
        extent: [1, 20, 1],
        cmd: val => view.reset(val),
    },
    shape: {
        value: 'dart',
        extent: ['dart', 'circle', 'square', 'bug'],
        cmd: val => (view.shape = val),
    },
    shapeSize: {
        value: 1,
        extent: [0.5, 5, 0.5],
        cmd: val => (view.shapeSize = val),
    },
    run: { value: () => animator.toggle() },
    useMouse: { value: true, cmd: val => mouse.run(val) },
    useSprites: { value: false, cmd: val => (view.useSprites = val) },
    population: {
        value: 20,
        extent: [5, 1000, 5],
        cmd: val => (model.population = val),
    },
    perf: { value: 0, cmd: 'listen' },
}
const controls = new GUI(template).target

let selectedTurtle = null
const handleMouse = mouse => {
    // console.log('mouse:', event, mouse)
    const { xCor, yCor } = mouse
    switch (mouse.action) {
        case 'down':
            selectedTurtle = model.turtles.closestTurtle(xCor, yCor, 2)
            // console.log('down', selectedTurtle)
            if (selectedTurtle === null) return
            selectedTurtle.setxy(xCor, yCor)
            break
        case 'drag':
            if (selectedTurtle === null) return
            selectedTurtle.setxy(xCor, yCor)
            // console.log('drag', selectedTurtle)
            break
        case 'up':
            selectedTurtle = null
            break
    }
}

// const model = new HelloModelPlus()
const model = new Model()
util.assign(model, controls, 'speed wiggle population')
model.setup()

// const view = HelloView.setupView(model.world, {
const view = View.newView(model, {
    div: 'modelDiv',
    useSprites: controls.useSprites,
    patchSize: controls.patchSize,
})
// REMIND!!
View.draw = () => View.drawView(model, view)

const animator = new Animator(model, View, controls.fps)
animator.start()

// REMIND: use evented animator!
util.timeoutLoop(() => (controls.perf = animator.fps), -1, 1000)

const mouse = new Mouse(view.canvas, model.world, handleMouse).start()

util.toWindow({ template, controls, mouse, model, view, animator, util })
const { patches, turtles, links } = model
util.toWindow({ patches, turtles, links })
