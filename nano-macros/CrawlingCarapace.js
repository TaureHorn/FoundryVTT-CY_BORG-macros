const targets = await new Roll(`1d4`).roll()

const nameSt = "<strong style='color:#b861ff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `<h1>${nameSt}NANO POWER</h1></strong></br>A person becomes invisible and attacks and defends at DR6. The effect lasts for ${resultSt}${rounds.total}</strong> rounds or until you are hurt.`

ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({ token: actor }),
    content: result_html
});
