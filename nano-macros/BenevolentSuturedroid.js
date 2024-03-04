const targets = await new Roll(`1d2`).roll()
const hp = await new Roll(`1d10`).roll()

const nameSt = "<strong style='color:#B861ff'>"
const resultSt = "<strong style='color: white'>"

let result_html = `<h1>${nameSt}NANO POWER</h1>`
if ( hp.total < 6) {
    result_html += `Benevolent Suturedroids</strong></br>${resultSt}${targets.total}</strong> people regain ${resultSt}${hp.total}</strong> HP each.`
} else {
    result_html += `Benevolent Suturedroids</strong></br>${resultSt}${targets.total}</strong> people regain ${resultSt}${hp.total}</strong> HP each and begin to develop a migraine.`
}

ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({token: actor}),
    content: result_html
});
