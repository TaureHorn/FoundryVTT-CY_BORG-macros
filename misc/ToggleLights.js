if (!game.user.isGM) {
    ui.notifications.error("Only a GM is allowed to use this macro")
} else {
    if (canvas.lighting.placeables < 1) {
        ui.notifications.warn("There are no lights placed in this scene to change")
    } else {
        const hidden = canvas.lighting.placeables[0].document.hidden
        canvas.lighting.updateAll({
            "hidden": hidden ? false : true
        });
    }
}

