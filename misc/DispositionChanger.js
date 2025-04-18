
// CHANGE TOKEN(S) DISPOSITION

// exit if no tokens selected
if (canvas.tokens.controlled.length < 1) {
    return ui.notifications.warn(`Macro - ${this.name}: You need to select at least one token`)
}

const tokensData = canvas.tokens.controlled

let form =
    `<form class="dialog">
		<label for="disposition">DISPOSITION</label>
		<select style="width:100%" id="disposition" name="disposition">`

// iterate through CONST.TOKEN_DISPOSITIONS and add options to form
let i = 0
for (const mode in CONST.TOKEN_DISPOSITIONS) {
    form += `<option${i === 0 ? ' selected' : ''} value=${mode}>${mode}</option>`
    i++
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

                const disposition = CONST.TOKEN_DISPOSITIONS[html.find('#disposition')[0].value]

                for (const token of tokensData) {
                    token.document.update({ 'disposition': disposition })
                }

            }
        })();
    }
})
dialog.options.classes.push('nlb-dialog')
dialog.render(true)

