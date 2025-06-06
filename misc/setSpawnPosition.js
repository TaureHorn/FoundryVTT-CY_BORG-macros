// macro to write controlled tokens position to current scene as a world flag for 'spawn-point'

if (!game.user.isGM) return
if (!canvas.tokens.controlled.length) {
	return ui.notifications.warn(`${this.name}: You must select a token`)
}
if (canvas.tokens.controlled.length > 1) {
	return ui.notifications.warn(`${this.name}: You have more than one token selected. This macro only works with one token.`)
}

const token = canvas.tokens.controlled[0].document
await game.scenes.current.setFlag('world', 'spawn-point', {
		elevation: token.elevation,
		x: token.x,
		y: token.y
	}
)
