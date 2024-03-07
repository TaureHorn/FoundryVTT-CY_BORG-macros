if (canvas.tokens.controlled.length !== 1) {
    ui.notifications.warn(`You need to select a token`)
}

let actorData = canvas.tokens.controlled[0].document.actor;

let tokenImgArray = await actorData.getTokenImages();

if (tokenImgArray.length < 2) {
    ui.notifications.warn(`This actor does not have multiple tokens`)
} else {
    let imageChoice = Math.floor(Math.random() * tokenImgArray.length);
    let image = tokenImgArray[imageChoice]
    await canvas.tokens.controlled[0].document.update({ "img": image })
}

