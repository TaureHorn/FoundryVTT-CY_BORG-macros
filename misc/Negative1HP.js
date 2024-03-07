if (game.user.hasRole("GAMEMASTER") && canvas.tokens.controlled.length === 0) {
    ui.notifications.warn(`You need to select a token`)
}

let actorData = [actor || canvas.tokens.controlled[0].document.actor || game.user.character]
if (canvas.tokens.controlled.length > 1) {
    const docData = []
    canvas.tokens.controlled.forEach((token) => {
        docData.push(token.document.actor)
    })
    actorData = docData
}

if (typeof actorData === 'undefined') {
    ui.notifications.warn(`You need to select at least one token`)

} else {
    actorData.forEach((actor) => {
        let HP = actor.system.hitPoints.value
        HP += -1
        if (HP > actor.system.hitPoints.max) {
            HP = actor.system.hitPoints.max
        }
        actor.update({ 'system.hitPoints.value': HP })
    })
}

