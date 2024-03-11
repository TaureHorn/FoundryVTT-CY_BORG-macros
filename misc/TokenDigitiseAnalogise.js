if (!game.user.hasRole("GAMEMASTER")) {
    ui.notifications.error("Only a GM is allowed to use this macro")
} else {
    let tokens = canvas.tokens.controlled

    if (typeof tokens === 'undefined') {
        ui.notifications.warn(`You need to select at least one token`)
    }

    tokens.forEach((token) => {
        const imgStr = token.document.texture.src
        const digitise = imgStr.replace(".png", "-digital.png")
        const analogise = imgStr.replace("-digital.png", ".png")
        const digital = imgStr.endsWith("-digital.png")
        
        token.document.update({ 'texture.src': digital ? analogise : digitise })
    })

}

