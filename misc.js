// ------------------------------
// ------------------------------
// ------------------------------
// ------------------------------
// let cities
// fetch('./data/cities.geojson')
//     .then((response) => response.json())
//     .then(json => cities = json)

let cities = await util.xhrPromise('./data/cities.geojson', 'json')

// function mapPromise(map) {
//     return new Promise((resolve, reject) => {
//         map.on('load', () => resolve())
//     })
// }

// await mapPromise(map)
// console.log('map loaded')

// ------------------------------
import('../src/gis.js').then((m) => (window.gis = m.default))
util.dump()

l = ls.oneOf()
len = gis.lonLat2meters([l.end0.lon, l.end0.lat], [l.end1.lon, l.end1.lat])

radians = (degrees) => (degrees * Math.PI) / 180
let [pt1, pt2] = [
    [l.end0.lon, l.end0.lat],
    [l.end1.lon, l.end1.lat],
]
let [lon1, lat1] = pt1.map((val) => radians(val))

// ------------------------------
async function foo(val) {
    const ms = 2000
    await util.timeoutPromise(ms)
    console.log('done', ms)
    // ms returned as the result of the foo promise
    return ms
}
foo(2000).then((val) => console.log(val))

// ------------------------------
s = `{
    "ticks": 500,
    "model": [
      "ticks",
      "world",
      "patches",
      "turtles",
      "links",
      "population",
      "speed",
      "wiggle"
    ],
    "patches": 10201,
    "patch": {
      "id": 6061
    },
    "turtles": 1000,
    "turtle": {
      "id": 970,
      "theta": 2.2594884500660295,
      "x": 8.959619891506229,
      "y": 19.997493746915403,
      "links": [
        970
      ]
    },
    "links": 1000,
    "link": {
      "id": 973,
      "end0": {
        "id": 973,
        "theta": -0.1238336464778842,
        "x": -11.468510239029987,
        "y": -38.12513187598359,
        "links": [
          811,
          973
        ]
      },
      "end1": {
        "id": 310,
        "theta": -5.147058801081283,
        "x": -1.1990260586185204,
        "y": -9.070063756578504,
        "links": [
          310,
          973
        ]
      }
    }
}
`
re = /"([^"]+)":/gm
s.replace(/"([^"]+)":/gm, '$1:')

sample.replace(/"([^"]+)":/gm, '$1:')

// ------------------------------
