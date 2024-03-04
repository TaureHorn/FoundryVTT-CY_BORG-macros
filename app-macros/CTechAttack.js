const targets = await new Roll(`1d3`).roll()
const damage = await new Roll(`4d10`).roll()

const nameSt = "<strong style='color:#28ffff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>CTeckAttak</strong></br>${resultSt}${targets.total}</strong> nearby cybered targets lost a total of ${resultSt}${damage.total}</strong> HP.`

ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({token: actor}),
    content: result_html

});
