
// OPEN DIALOG TO SELECT A STATUS MARKER TO ADD/REMOVE FROM SELECTED TOKEN(S)

// REQUIRED MODULE: ConditionLab and Triggler

// exit if no condition lab module
if (!game.modules.get('condition-lab-triggler')?.active) {
    return ui.notifications.warn(`Macro - ${this.name}: Required module 'Condition Lab & Triggler' inactive. Exiting.`)
}

// exit if no tokens
if (canvas.tokens.controlled.length < 1) {
    return ui.notifications.warn(`Macro - ${this.name}: You need to select at least one token`)
}

const tokenData = canvas.tokens.controlled.entries()
const conditions = game.clt.getConditionsMap().entries()

let form =
    `<form class="dialog">
			<label for="condition" name="CONDITION"</label>
			<select style="width:100%" id="condition" name="condition">
    `

// iterate over conditions and append options to form based on conditions
for (const [i, condition] of conditions) {
    form += `<option${i === 0 ? ' selected' : ''} value="${condition.name}">${condition.name}</option>`
}

form += `</select>
        </form>
        `

new Dialog({
    buttons: {
        submit: { label: 'submit', callback: () => confirmed = true },
        cancel: { label: 'cancel', callback: () => confirmed = false }
    },
    content: form,
    default: 'submit',
    title: 'CONDITION PICKER',

    close: html => {
        (async () => {
            if (confirmed) {
                const condition = html.find('#condition')[0].value

                for (const [i, token] of tokenData) {
                    game.clt.hasCondition(condition, token)
                        ? game.clt.removeCondition(condition, token)
                        : game.clt.addCondition(condition, token)
                }
            }
        })();
    }
}).render(true)

