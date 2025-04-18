// args macroId String, macroArgs Object

if (!macroId) return ui.notifications.warn(`${this.name}: no provided macroId`)

let form =
    `<form class="dialog" id="user-select">
		<label for="users">SELECT USER(S)</label>
		<div>
	`
let i = 0
for (const user of game.users) {
    if (user.active) {
        form +=
            `<div style="align-items:center;display:flex">
				<input type="checkbox" name=user${i} value=${user.id} />
				<label for=user${i}>${user.name}</label>
			</div>`
        i++
    }
}

form +=
    `</div>
	</form>`


const dialog = new Dialog({
    buttons: {
        submit: {
            label: 'submit', callback: () => {
                confirmed = true
                submitToAll = false
            }
        },
        all: {
            label: 'all users', callback: () => {
                confirmed = true
                submitToAll = true
            }
        },
        cancel: { label: 'cancel', callback: () => confirmed = false }
    },
    content: form,
    default: 'submit',
    title: 'USER PICKER',

    close: html => {
        (async () => {
            if (!confirmed) return
            let users = submitToAll
                ? game.users.filter(obj => obj.active).map(obj => obj.id)
                : html.find('#user-select').serializeArray().map(obj => obj.value)

            // trigger macro in users sessions via game socket
            const trigger = game.macros.get('<macro id>')
            if (typeof trigger === 'undefined') return ui.notifications.error(`${this.name}: no trigger macro with id '<macro id>'`)
            trigger.execute({
                userArr: users,
                macroId: macroId,
                ...(typeof macroArgs !== 'undefined' && { macroArgs: macroArgs })
            })

        })();
    }
})
dialog.options.classes.push('nlb-dialog')
dialog.render(true)

