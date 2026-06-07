if (game.users.activeGM === null) {
    return ui.notifications.warn(`${this.name}: this macro requires an active GM to be logged in`)
}
if (!game.scenes.current.getFlag('world', 'toggleableWalls')) {
    return ui.notifications.warn(`${this.name}: you are not allowed to toggle the walls for this scene`)
}

if (game.user.isGM) {
    // TRIGGER MACRO DIRECTLY
    await game.macros.get('PWdunBbYl4IlJimP').execute({
        sceneId: game.scenes.current.id
    })
} else {
    // GET triggerSocketMacro && execute
    await game.macros.get('x5ShsKu7C7JFqkXb').execute({
        userArr: [game.users.activeGM.id],
        macroId: 'PWdunBbYl4IlJimP',
        macroArgs: {
            sceneId: game.scenes.current.id,
        }
    })
}
