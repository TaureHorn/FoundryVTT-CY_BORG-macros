const nameSt = "<strong style='color:#28ffff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>RDCOvrChargr</strong></br>One target get ${resultSt}+d6</strong> on all Agility and Strength tests for Knowledge+3 rounds.`

ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({token: actor}),
    content: result_html
});
