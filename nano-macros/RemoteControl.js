const nameSt = "<strong style='color:#b861ff'>"

const result_html = `<h1>${nameSt}NANO POWER</h1>Remote Control</strong></br>A target within spitting range must obey a single command. You will forever hear their wordless voice faintly in your mind.`

ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({ token: actor }),
    content: result_html
});
