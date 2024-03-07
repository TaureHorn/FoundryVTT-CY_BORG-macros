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
    actorData.forEach(async (token) => {
        let tokenImgArray = [...await token.actor.getTokenImages()]

        if (tokenImgArray.length < 2) {
            ui.notifications.warn(`Actor "${token.actor.name}" does not have multiple tokens`)

        } else {
            tokenImgArray.splice(tokenImgArray.indexOf(token.texture.src), 1)
            let imageChoice = Math.floor(Math.random() * tokenImgArray.length);
            let image = tokenImgArray[imageChoice]
            await token.update({ "img": image })
        }
    })
}

