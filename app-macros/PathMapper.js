const nameSt = "<strong style='color:#28ffff'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>PathMapper</strong></br>Users nearby sensors, cameras and public information to create a detailed 3D map of the surrounding ~100m`

ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({token: actor}),
    content: result_html
});
