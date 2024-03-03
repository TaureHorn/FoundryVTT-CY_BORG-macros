const targets = await new Roll(`1d3`).roll()
const damage = await new Roll(`4d10`).roll()

const nameSt = "<strong style='color:#28ffff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `${nameSt}APP HACK:</br>CTeckAttak</strong> deals a total of ${resultSt}${damage.total}</strong> damage to ${resultSt}${targets.total}</strong> nearby targets`

ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({token: actor}),
    content: result_html

});
