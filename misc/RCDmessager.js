// MACRO TO RENDER DIALOG FOR MESSAGE, TEXT COLOR AND PLAYER RECIPIENTS
// SENDS DIALOG OUTPUT TO SOCKET MACRO TO RENDER MESSAGE ON PLAYERS SCREENS

if (!game.user.isGM) {
    return ui.notifications.warn(`${this.name}: GM only!`)
}

// GET ACTIVE USERS & IDS
const users = {}
for (const user of game.users) {
    if (!user.active || user.id == game.userId) continue
    users[user.id] = user.name
}

// GET RECENT COLORS IF AVAILABLE
const styles = {
    bg: game.user.getFlag('world', 'RCD_messager_styles') ? game.user.getFlag('world', 'RCD_messager_styles').bg : '#000000',
    fg: game.user.getFlag('world', 'RCD_messager_styles') ? game.user.getFlag('world', 'RCD_messager_styles').fg : '#ffffff'
}

// BUILD FORM
let form = `<form name='RCD_m' class="dialog">
					<fieldset style="border: 1px solid black; border-radius: 3px">
					<legend><strong>MESSAGE</strong></legend>
						<textarea id="messageContent" name="messageContent" rows="12" maxlength="512" required placeholder="..." ></textarea>
						<div class="form-group">
							<label for="fgCol">FG COLOR</label>
							<input id="fgCol" name="fgCol" type="color" value="${styles.fg}" />
							<label for="bgCol">BG COLOR</label>
							<input id="bgCol" name="bgCol" type="color" value="${styles.bg}" />
						</div>
					</fieldset>
					<br>
					<fieldset style="border: 1px solid black; border-radius: 3px">
						<legend><strong>IMAGE</strong></legend>
						<div class="form-group">
							<button id="RCD_file-picker" class="file-picker" type="button" data-type="image" data-target="RCD_image" title="Browse Images">
								<i class="fas fa-file-import fa-fw"></i>
							</button>
	                 <input id="RCD_image" name="RCD_image" type="text"/>
						</div>
					</fieldset>
					<br>
					<fieldset style="border: 1px solid black; border-radius: 3px">
					<legend><strong>USERS</strong></legend>
					<div class="form-group">
						<input id="RCD_m_ALL" name="RCD_m_ALL" type="checkbox" checked />
						<label for="RCD_m_ALL">ALL_USERS</label>
					</div>
					<hr style="border-top: 1px solid black; border-bottom: none "/>
					<div class="form-group">`

// ADD TO FORM FROM ACTIVE USERS
for (const user in users) {
    form += `<input id="RCD_m_${user}" name="RCD_m_users" value="${user}" type="checkbox" />
				<label>${users[user]}</label>`
}

form += `</div>
			</fieldset>
			</form>
			<br>`

// MAKE DIALOG
function handleRender(html) {
    html.on('click', '#RCD_file-picker', () => new FilePicker({
        callback: (str) => $('#RCD_image')[0].value = str,
        type: 'image'
    }).browse())
}

const dialog = new Dialog({
    buttons: {
        submit: { label: 'submit', callback: () => confirmed = true },
        cancel: { label: 'cancel', callback: () => confirmed = false }
    },
    content: form,
    default: 'submit',
    title: 'RCD_MESSAGER',
    render: handleRender,

    close: html => {
        (async () => {
            if (confirmed) {
                const message = {
                    bgCol: html.find('#bgCol')[0].value,
                    content: html.find('#messageContent')[0].value,
                    ...(html.find('#RCD_image')[0].value.length > 0 && { image: html.find('#RCD_image')[0].value }),
                    fgCol: html.find('#fgCol')[0].value
                }

                if (message.content.length === 0) return

                game.user.setFlag('world', 'RCD_messager_styles', {
                    bg: html.find('#bgCol')[0].value,
                    fg: html.find('#fgCol')[0].value,
                })

                let recipients = []
                if ($('#RCD_m_ALL').is(':checked')) {
                    recipients = Object.keys(users)
                } else {
                    for (const user of html.find('[name="RCD_m_users"]')) {
                        if (user.checked) recipients.push(user.value)
                    }
                }

                // CALL triggerSocketMacro TO EMIT ON SOCKET AND SEND DATA TO PLAYERS
                await game.macros.get('x5ShsKu7C7JFqkXb').execute({
                    userArr: recipients,
                    macroId: 'T75PJ3xJ8P7sLWr7',
                    macroArgs: message
                })

            }
        })();
    }

})

dialog.options.classes.push('nlb-dialog')
dialog.render(true)
