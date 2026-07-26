// RENDER INCOMING HTML & SETUP EVENTS
// @param {HTMLElement[]} elements => elements to render
// @param {object} events => functions to trigger { elementId: 'stringifiedFunction', }

if (typeof elements=== 'undefined' && typeof events === 'undefined') {
    return ui.notifications.warn(`${this.name}: no HTML element passed to macro`)
}

if (typeof elements === 'undefined') return
// ADD ELEMENTS TO DOM
for (const el of elements) {
    $('body').append(el)
}

if (typeof events === 'undefined') return
// TRIGGER EVENTS => useful for addings eventListeners to HTML element
for (const ev in events) {
    let func = new Function("return " + events[ev])()
    $(`#${ev}`).on('click', () => {
        func()
    })
}

