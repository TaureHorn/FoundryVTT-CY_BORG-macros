
// EMOTE DEFINITIONS
const emotes = {
    alarm       : "<[ !! ]>",
    annoyed     : "<[`^`]>",
    celebrate   : "\\<[^o^]>/",
    cry         : "<[T~T]>",
    dead        : "<[X X]>",
    happy       : "<[*^_^*]>",
    love        : "<[ <3 ]>",
    no          : "<[-_-]>",
    plug        : "<[o_o]D <- =D~~~~",
    sad         : "<[U_U]>",
    sleep       : "<[~ o ~]>",
    small       : "<[,_,]>",
    surprise    : "<[0_0]>",
    tired       : "<['@ _ @']>",
    unplug      : "<[*_*]D -> =D~~~~",
    yes         : "<[^_^]>",
}

async function speakEmote(emote) {
    const actorId = 'ifyHHpaukr6Xjb0o'
    const token = canvas.tokens.placeables.filter(tk => tk.document.actorId === actorId)[0]

    ChatMessage.create({
        user: game.user.id,
        speaker: {
            scene: game.scenes.current,
            actor: actorId,
            token: token.document
        },
        content: emote
    })
    await canvas.hud.bubbles.broadcast(token, emote, { requireVisible: true })
}

const dialogButtons = {}
for (const emote in emotes) {
    dialogButtons[emote] = {
        label: emotes[emote],
        callback: () => speakEmote(emotes[emote])
    }
}

function fixButtonLayout(el) {
    el.style.display = "grid"
	el.style.gridTemplateColumns = "repeat(auto-fill, minmax(min(10rem, 100%), 1fr))"
	el.style.gridGap = "0.5em"
}

// DIALOG
const dialog = new Dialog({
    buttons: dialogButtons,
    title: 'EMOTE PICKER',
    render: html => fixButtonLayout(html[2])
})

dialog.options.classes.push('nlb-dialog')
dialog.render(true)


