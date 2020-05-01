export function mapLoad(map) {
    return new Promise((resolve, reject) => {
        map.on('load', () => resolve())
    })
}
