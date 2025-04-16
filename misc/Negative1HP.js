
// DECREMENT TOKEN(S) HP BY 1

// exit if no tokens selected
if (canvas.tokens.controlled.length < 1) {
    return ui.notifications.warn(`Macro - ${this.name}: You need to select at least one token`)
}

let tokensData = canvas.tokens.controlled.entries()

for (let [i, token] of tokensData) {
    const actor = token.document.actor
    let HP = actor.system.hitPoints.value - 1

    actor.update({ 'system.hitPoints.value': HP })

    const position = {
        x: token.document.x + ((canvas.grid.size * token.document.width) * 0.5),
        y: token.document.y + ((canvas.grid.size * token.document.height) * 0.5)
    }

    canvas.interface.createScrollingText(position, '-1', {
        direction: 1,
        fill: '#ff0055',
        fontSize: '32px'
    })
}

