// designed to be a called as a macro itself
// @param message string
game.user.hasRole("GAMEMASTER") ?
    ChatMessage.create({
        user: game.user._id,
        speaker: ChatMessage.getSpeaker({token: actor}),
        content: message,
        whisper: game.users.filter(u=> u.isGM)
    })
:
   ChatMessage.create({
        user: game.user._id,
        speaker: ChatMessage.getSpeaker({token: actor}),
        content: message,
    });

