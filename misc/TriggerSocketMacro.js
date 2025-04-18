
// args userArr Array, macroId String, macroArgs Object

if (typeof game.modules.get('n1ght0wls_little_bits') === 'undefined') {
    return ui.notifications.warn(`${this.name}: 'n1ght0wls_little_bits' is required for this macro and is not installed`)
}

if (!game.modules.get('n1ght0wls_little_bits').active) {
    return ui.notifications.warn(`${this.name}: 'n1ght0wls_little_bits' is required for this macro and is not enabled`)
}

if (typeof userArr === 'undefined') {
    return ui.notifications.error(`${this.name}: no userArr provided as macro arguments`)
}

if (typeof macroId === 'undefined') {
    return ui.notifications.error(`${this.name}: no macroId provided as macro arguments`)
}

game.socket.emit('module.n1ght0wls_little_bits', {
    event: 'triggerMacro',
    users: userArr,
    macroId: macroId,
    ...(typeof macroArgs !== 'undefined' && { 'macroArgs': macroArgs })
})

