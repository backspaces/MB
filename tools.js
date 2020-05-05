export function mapLoadPromise(map) {
    return new Promise((resolve, reject) => {
        map.on('load', () => resolve())
    })
}

export async function importModel(url, width, bbox) {
    const [west, south, east, north] = bbox
    const aspect = (east - west) / (north - south)

    const Model = (await import(url)).default
    const worldOptions = {
        minX: 0,
        minY: 0,
        maxX: width,
        maxY: Math.round(width / aspect),
    }
    const model = new Model(worldOptions)
    await model.startup()
    model.setup()

    util.toWindow({ Model, model, width, aspect, worldOptions })
    return model
}

export function bboxCenter(bbox) {
    const [west, south, east, north] = bbox
    return [(west + east) / 2, (south + north) / 2]
}

export function bboxCoords(bbox) {
    const [west, south, east, north] = bbox
    return [
        [west, north],
        [east, north],
        [east, south],
        [west, south],
    ]
}

export default { mapLoadPromise, importModel, bboxCenter, bboxCoords }
