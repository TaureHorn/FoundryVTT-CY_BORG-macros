if (canvas.tokens.controlled.length !== 1) {
    ui.notifications.warn(`You need to select just one token to clone an image from`)
}

const src = canvas.tokens.controlled[0].document.texture.img
const targets = Array.from(game.user.targets)

if (targets.length < 1) {
    ui.notifications.warn(`You need to target at least one token to clone an image to`)
} else {
    targets.forEach(async (token) => {
        await token.document.update({ 'texture.img': src })
    })
}

