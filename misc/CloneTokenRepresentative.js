if (!game.user.hasRole("GAMEMASTER")) {
    ui.notifications.error("Only a GM is allowed to use this macro")
} else {
    const source = canvas.tokens.controlled[0]
    const targets = Array.from(game.user.targets)

    if (typeof source !== 'object' || typeof targets !== 'object') {
        ui.notifications.warn("You must select highlight a source and target one or more targets")
    } else {
        targets.forEach((token) => {
            token.document.update({ 'actorId': source.document.actorId, 'name': `"${source.document.name}"` })
        })
    }
}

