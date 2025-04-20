
// opens dialog to choose door state for all doors in current scene
// WARN: if doors have sounds associated, this action is REALLY LOUD

if (!game.user.isGM) {
    return ui.notifications.warn(`${this.name}: GM only!`)
}

let form = `<form class="dialog">
                <label for="door-state">DOORS STATE</label>
                <select style="width:100%" id="door-state" name="door-state">`

let i = 0
for (const state in CONST.WALL_DOOR_STATES) {
    form += `<option${i === 0 ? ' selected' : ''} value=${CONST.WALL_DOOR_STATES[state]}>${state}</option>`
}


form += `</select>
    </form>`

const dialog = new Dialog({
    buttons: {
        submit: { label: 'submit', callback: () => confirmed = true },
        cancel: { label: 'cancel', callback: () => confirmed = false }
    },
    content: form,
    default: 'submit',
    title: 'DISPOSITION CHANGER',

    close: html => {
        (async () => {
            if (confirmed) {
                const state = parseInt(html.find('#door-state')[0].value)
                console.log(state)
                for await (const wall of game.scenes.viewed.walls) {
                    if (wall.door) {
                        await wall.update({ 'ds': state })
                    }
                }
            }
        })();
    }
})
dialog.options.classes.push('nlb-dialog')
dialog.render(true)

