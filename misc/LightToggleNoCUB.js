// REQUIRES MODULE COMBAT-UTILITY-BELT
if (game.user.hasRole("GAMEMASTER") && canvas.tokens.controlled.length === 0) {
    ui.notifications.warn(`You need to select a token`)
}

let actorData = [canvas.tokens.controlled[0].document]
if (canvas.tokens.controlled.length > 1) {
    const docData = []
    canvas.tokens.controlled.forEach((token) => {
        docData.push(token.document)
    })
    actorData = docData
}


if (actorData.length === 0 || typeof actorData[0] === 'undefined') {
    ui.notifications.warn(`You need to select at least one token`)

} else {

    const flashlight = {
        "alpha": 0.1,
        "angle": 360,
        "animation": { "type": "none" },
        "bright": 5,
        "color": "#e4daa7",
        "dim": 10,
        "luminosity": 0.5
    }

    const none = {
        "alpha": 0,
        "angle": 360,
        "animation": { "type": "none" },
        "bright": 0,
        "color": "#e4daa7",
        "dim": 0,
        "luminosity": 0.5
    }

    actorData.forEach(async (token) => {
        const currentlyLit = token.light.dim || token.light.bright > 0 ? true : false

        if (!currentlyLit) {
            await token.update({ light: flashlight })
        } else {
            await token.update({ light: none})
        }
    })
}
