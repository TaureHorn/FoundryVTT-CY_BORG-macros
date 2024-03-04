const damage = await new Roll(`1d6`).roll()

const nameSt = "<strong style='color:#b861ff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `<h1>${nameSt}NANO POWER</h1>Dead Cell Spirits</strong></br>By consuming a handful of something dead, you can relive their last moments as if through a hazy and distorted lens. Test Presence DR14 to avoid taking ${resultSt}${damage.total}</strong> damage from ego death.`

ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({ token: actor }),
    content: result_html
});
