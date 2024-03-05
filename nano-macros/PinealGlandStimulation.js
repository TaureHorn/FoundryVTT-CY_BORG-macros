const rounds = await new Roll(`1d4`).roll()

const nameSt = "<strong style='color:#B861ff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `<h1>${nameSt}NANO POWER</h1>Pineal Gland Stimulation</strong></br>For ${resultSt}${rounds.total}</strong> rounds, you can feel nearby data flows. You can hear a short converstaion or message, sense the direction of a large data source or see the last few seconds of the most recently recorded information of a device.`

game.user.hasRole("GAMEMASTER") ?
    ChatMessage.create({
        user: game.user._id,
        speaker: ChatMessage.getSpeaker({ token: actor }),
        content: result_html,
        whisper: game.users.filter(u => u.isGM)
    })
    :
    ChatMessage.create({
        user: game.user._id,
        speaker: ChatMessage.getSpeaker({ token: actor }),
        content: result_html,
    });

