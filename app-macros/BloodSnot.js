const roll = await new Roll(`1d4`).roll()

const nameSt = "<strong style='color:#28ffff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `${nameSt}APP HACK:</br>Blood Snot</strong> deals ${resultSt}${roll.total}</strong> to its target`

ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({token: actor}),
    content: result_html
});
