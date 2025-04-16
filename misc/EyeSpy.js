// MACRO TO ENABLE / REVOKE A SELECTED CHARACTERS VISION OF ANOTHER TOKEN
// USED TO ALLOW A PC TO SEE THROUGH THE EYES OF A CAMERA FOR EXAMPLE

if (!game.user.isGM) {
    return ui.notifications.warn('GM only!')
} else {

    const src = canvas.tokens.controlled[0]
    const targets = Array.from(game.user.targets)

    if (!src) return ui.notifications.warn(`${this.name}: You must select a token`)
    if (targets.length < 1) return ui.notifications.warn(`${this.name}: You must select a target`)

    for await (const token of targets) {
        const flags = token.document.getFlag('world', 'eyeSpyMacro')
        const enabled = flags ? flags.originalId : false

        if (enabled) {
            token.document.update({
                'actorId': flags.originalId,
                'name': flags.originalName
            })
            ui.notifications.info(`${this.name}: Unlinked '${src.name}' from token '${token.name}'. Vision revoked`)
        } else {
            token.document.update({
                'actorId': src.document.actorId,
                'name': `${token.document.name} (+${src.document.name})`
            })
            ui.notifications.info(`${this.name}: Linked '${src.name}' to token '${token.name}'. Vision enabled.`)
        }

        await token.document.setFlag('world', 'eyeSpyMacro', {
            originalId: enabled ? "" : token.document.actorId,
            originalName: enabled ? "" : token.document.name
        })
    }
}
