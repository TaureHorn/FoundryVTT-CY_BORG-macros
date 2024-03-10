if (!game.user.hasRole("GAMEMASTER")) {
    ui.notifications.error("Only a GM is allowed to use this macro")
} else {
    if (canvas.lighting.placeables < 1) {
        ui.notifications.warn("There are no lights placed in this scene to change")
    } else {
        canvas.lighting.updateAll({
            "hidden": true
        });
    }
}

