const devices = await new Roll(`1d4`).roll()
const targets = await new Roll(`1d4`).roll()
const damage = await new Roll(`1d6`).roll()

const nameSt = "<strong style='color:#28ffff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>Boomboom</strong></br>${resultSt}${devices.total}</strong> nearby simple devices (lamps, monitors, cameras etc.) explode. ${resultSt}${damage.total}</strong> damage to up to ${resultSt}${targets.total}</strong> target(s)`

ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({token: actor}),
    content: result_html
});
