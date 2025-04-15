const src = {
    'flashlight': {
        'alpha': 0.1,
        'bright': 5,
        'color': '#e4daa7',
        'dim': 10,
    },
    'none': {
        'alpha': 0,
        'bright': 0,
        'color': '#e4daa7',
        'dim': 0,
    },
}

// get token and actor data
if (canvas.tokens.controlled.length < 1) {
    ui.notifications.warn('You must select a token')
    return
}
const token = canvas.tokens.controlled[0].document
const actor = game.actors.get(token.actorId)

if (!actor.items.find(obj => obj.name === 'Flashlight')) {
    ui.notifications.warn('You do not own a flashlight')
    return
}

const enabled = token.getFlag('world', 'flashlight')
const light = enabled ? src.none : src.flashlight

token.update({ 'light': light })
await token.setFlag('world', 'flashlight', !enabled)
