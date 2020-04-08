// import Color from './Color.js'
import AgentArray from './AgentArray.js'
import util from './util.js'

// Flyweight object creation, see Patch/Patches.

// Class Turtle instances represent the dynamic, behavioral element of modeling.
// Each turtle knows the patch it is on, and interacts with that and other
// patches, as well as other turtles.

class Turtle {
    static defaultVariables() {
        return {
            // Core variables for turtles.
            // turtle's position: x, y, z.
            // Generally z set to constant via turtles.setDefault('z', num)
            x: 0,
            y: 0,
            z: 0,
            // my euclidean direction, radians from x axis, counter-clockwise
            theta: 0,
            // What to do if I wander off world. Can be 'clamp', 'wrap'
            // 'bounce', or a function, see handleEdge() method
            atEdge: 'clamp',
        }
    }
    // Initialize a Turtle given its Turtles AgentSet.
    constructor() {
        Object.assign(this, Turtle.defaultVariables())
    }
    die() {
        this.agentSet.removeAgent(this) // remove me from my baseSet and breed
        // Remove my links if any exist.
        // Careful: don't promote links
        if (this.hasOwnProperty('links')) {
            while (this.links.length > 0) this.links[0].die()
        }
        // Remove me from patch.turtles cache if patch.turtles array exists
        if (this.patch.turtles != null) {
            util.removeArrayItem(this.patch.turtles, this)
        }
        // Set id to -1, indicates that I've died.
        this.id = -1
    }

    // Factory: create num new turtles at this turtle's location. The optional init
    // proc is called on the new turtle after inserting in its agentSet.
    hatch(num = 1, breed = this.agentSet, init = turtle => {}) {
        return breed.create(num, turtle => {
            turtle.setxy(this.x, this.y)
            // hatched turtle inherits parents' ownVariables
            for (const key of breed.ownVariables) {
                if (turtle[key] == null) turtle[key] = this[key]
            }
            init(turtle)
        })
    }
    // Getter for links for this turtle. REMIND: use new AgentSet(0)?
    // Uses lazy evaluation to promote links to instance variables.
    // REMIND: Let links create the array as needed, less "tricky"
    get links() {
        // lazy promote links from getter to instance prop.
        Object.defineProperty(this, 'links', {
            value: new AgentArray(0),
            enumerable: true,
        })
        return this.links
    }
    // Getter for the patch I'm on. Return null if off-world.
    get patch() {
        return this.model.patches.patch(this.x, this.y)
    }

    // Heading vs Euclidean Angles. Direction for clarity when ambiguity.
    get heading() {
        return util.heading(this.theta)
    }
    set heading(heading) {
        this.theta = util.angle(heading)
    }
    get direction() {
        return this.theta
    }
    set direction(theta) {
        this.theta = theta
    }

    // Set x, y position. If z given, override default z.
    // Call handleEdge(x, y) if x, y off-world.
    setxy(x, y, z = null) {
        const p0 = this.patch
        if (z != null) this.z = z // don't promote z if null, use default z instead.
        if (this.model.world.isOnWorld(x, y) || this.atEdge === 'OK') {
            this.x = x
            this.y = y
        } else {
            this.handleEdge(x, y)
        }
        const p = this.patch
        if (p && p.turtles != null && p !== p0) {
            // util.removeItem(p0.turtles, this)
            if (p0) util.removeArrayItem(p0.turtles, this)
            p.turtles.push(this)
        }
    }
    // Handle turtle if x,y off-world
    handleEdge(x, y) {
        if (util.isString(this.atEdge)) {
            const { minXcor, maxXcor, minYcor, maxYcor } = this.model.world
            if (this.atEdge === 'wrap') {
                this.x = util.wrap(x, minXcor, maxXcor)
                this.y = util.wrap(y, minYcor, maxYcor)
            } else if (this.atEdge === 'clamp' || this.atEdge === 'bounce') {
                this.x = util.clamp(x, minXcor, maxXcor)
                this.y = util.clamp(y, minYcor, maxYcor)
                if (this.atEdge === 'bounce') {
                    if (this.x === minXcor || this.x === maxXcor) {
                        this.theta = Math.PI - this.theta
                    } else {
                        this.theta = -this.theta
                    }
                }
            } else {
                throw Error(`turtle.handleEdge: bad atEdge: ${this.atEdge}`)
            }
        } else {
            this.atEdge(this)
        }
    }
    // Place the turtle at the given patch/turtle location
    moveTo(agent) {
        this.setxy(agent.x, agent.y)
    }
    // Move forward (along theta) d units (patch coords),
    forward(d) {
        this.setxy(
            this.x + d * Math.cos(this.theta),
            this.y + d * Math.sin(this.theta)
        )
    }
    // Change current direction by rad radians which can be + (left) or - (right).
    rotate(rad) {
        this.theta = util.mod(this.theta + rad, Math.PI * 2)
    }
    right(rad) {
        this.rotate(-rad)
    }
    left(rad) {
        this.rotate(rad)
    }

    // Set my direction towards turtle/patch or x,y.
    // "direction" is euclidean radians.
    face(agent) {
        this.theta = this.towards(agent)
    }
    faceXY(x, y) {
        this.theta = this.towardsXY(x, y)
    }

    // Return the patch ahead of this turtle by distance (patchSize units).
    // Return undefined if off-world.
    patchAhead(distance) {
        return this.patchAtAngleAndDistance(this.theta, distance)
    }
    // Use patchAhead to determine if this turtle can move forward by distance.
    canMove(distance) {
        return this.patchAhead(distance) != null
    } // null / undefined
    patchLeftAndAhead(angle, distance) {
        return this.patchAtAngleAndDistance(angle + this.theta, distance)
    }
    patchRightAndAhead(angle, distance) {
        return this.patchAtAngleAndDistance(angle - this.theta, distance)
    }

    // 6 methods in both Patch & Turtle modules
    // Distance from me to x, y. REMIND: No off-world test done
    distanceXY(x, y) {
        return util.distance(this.x, this.y, x, y)
    }
    // Return distance from me to object having an x,y pair (turtle, patch, ...)
    // distance (agent) { this.distanceXY(agent.x, agent.y) }
    distance(agent) {
        return util.distance(this.x, this.y, agent.x, agent.y)
    }
    // Return angle towards agent/x,y
    // Use util.heading to convert to heading
    towards(agent) {
        return this.towardsXY(agent.x, agent.y)
    }
    towardsXY(x, y) {
        return util.radiansToward(this.x, this.y, x, y)
    }
    // Return patch w/ given parameters. Return undefined if off-world.
    // Return patch dx, dy from my position.
    patchAt(dx, dy) {
        return this.model.patches.patch(this.x + dx, this.y + dy)
    }
    // Note: angle is absolute, w/o regard to existing angle of turtle.
    // Use Left/Right versions for angle-relative.
    patchAtAngleAndDistance(direction, distance) {
        return this.model.patches.patchAtAngleAndDistance(
            this,
            direction,
            distance
        )
    }

    // Link methods. Note: this.links returns all links linked to me.
    // See links getter above.

    // Return other end of link from me. Link must include me!
    otherEnd(l) {
        return l.end0 === this ? l.end1 : l.end0
    }
    // Return all turtles linked to me
    linkNeighbors() {
        return this.links.map(l => this.otherEnd(l))
    }

    isLinkNeighbor(t) {
        // const linkNeighbors = this.linkNeighbors()
        return t in this.linkNeighbors()
    }
}

export default Turtle
