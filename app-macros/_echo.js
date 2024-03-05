const nameSt = "<strong style='color:#28ffff'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>*_echo</strong></br>Request hacking assistance from the AI housed inside. For the next ${resultSt}`

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

