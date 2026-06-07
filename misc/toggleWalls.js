if (!game.user.isGM) return
if (typeof sceneId === "undefined") {
    return ui.notifications.warn(`${this.name}: was called but was not provided a sceneId from the marcroArgs`)
}

const scene = game.scenes.get(sceneId)
const ignoreList = scene.getFlag('world', 'toggleWallsIgnoreList') || []

function invert(val) {
    return val > 0 ? 0 : 20
}

for (const wall of scene.walls) {
    if (ignoreList.includes(wall.id)) continue
    let newValue
    if (typeof sightValue === 'undefined') {
        newValue = invert(wall.sight)
    } else {
        if (sightValue === wall.sight) continue
        newValue = sightValue
    }
    wall.update({ sight: newValue })
}
