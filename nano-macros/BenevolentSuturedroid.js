const targets = await new Roll(`1d2`).roll()
const hp = await new Roll(`1d10`).roll()

const nameSt = "<strong style='color:#B861ff'>"
const resultSt = "<strong style='color: white'>"

var result_html = ""
if ( hp.total < 6) {
    result_html = `${nameSt}NANO POWER:</br>Benevolent Suturedroids</strong> get to work on ${resultSt}${targets.total}</strong> targets. They regain ${resultSt}${hp.total}</strong> HP each.`
} else {
    result_html = `${nameSt}NANO POWER:</br>Benevolent Suturedroids</strong> get to work on ${resultSt}${targets.total}</strong> targets. They regain ${resultSt}${hp.total}</strong> HP each and begin to develop a migraine.`
}

ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({token: actor}),
    content: result_html
});
