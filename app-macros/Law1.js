const nameSt = "<strong style='color:#28ffff'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>Law1</strong></br>Parallaxes imagery around you, making you invisible to all tech (except true AI) for 10 minutes.`

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
