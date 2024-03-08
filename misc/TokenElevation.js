if (game.user.hasRole("GAMEMASTER") && canvas.tokens.controlled.length === 0) {
    ui.notifications.warn(`You need to select a token`)
}

let actorData = [canvas.tokens.controlled[0].document]
if (canvas.tokens.controlled.length > 1) {
    const docData = []
    canvas.tokens.controlled.forEach((token) => {
        docData.push(token.document)
    })
    actorData = docData
}


if (actorData.length === 0 || typeof actorData[0] === 'undefined') {
    ui.notifications.warn(`You need to select at least one token`)

} else {

    let form =
        `<form class="dialog"
            <div clas="form-group">
                <label for="elevation">ELEVATION? (m)</label>
                <input type="number" min="0" max="1000" id="elevation" name="elevation" value=${actorData[0].elevation} placeholder=${actorData[0].elevation}>
                </select>
            </div>
        </form> `

    new Dialog({
        title: "ELEVATION PICKER",
        content: form,
        buttons: {
            submit: { label: "SUBMIT", callback: () => confirmed = true },
            cancel: { label: "CANCEL", callback: () => confirmed = false }
        },
        default: "submit",

        close: html => {
            (async () => {
                if (confirmed) {
                    const elevation = html.find('#elevation')[0].value

                    actorData.forEach(async (token) => {
                        token.update({ elevation: elevation })
                    })
                }
            })();
        }
    }).render(true)
}

