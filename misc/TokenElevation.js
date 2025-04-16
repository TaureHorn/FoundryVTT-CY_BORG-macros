
// SET SELECTED TOKEN(S) ELEVATION WITH DIALOG

if (canvas.tokens.controlled.length < 1) {
    return ui.notifications.warn(`Macro - ${this.name}: You need to select at least one token`)
}

const tokenData = canvas.tokens.controlled

let form =
    `<form class="dialog">
		<label for="elevation">ELEVATION? (m)</label>
		<input type="number" min="0" max="1000" id="elevation" name="elevation" 
			value=${tokenData[0].document.elevation}
			placeholder="${tokenData[0].document.elevation}" />
	</form>`

new Dialog({
    buttons: {
        submit: { label: 'submit', callback: () => confirmed = true },
        cancel: { label: 'cancel', callback: () => confirmed = false }
    },
    content: form,
    default: 'submit',
    title: 'ELEVATION SETTER',

    close: html => {
        (async () => {
            if (confirmed) {
                const elevation = html.find('#elevation')[0].value

                tokenData.forEach(token => {
                    token.document.update({ 'elevation': elevation })
                })
            }
        })();
    }
}).render(true)

