if (!game.user.hasRole("GAMEMASTER")) {
    ui.notifications.error("Only a GM is allowed to use this macro")
} else {
    if (canvas.lighting.placeables < 1) {
        ui.notifications.warn("There are no lights placed in this scene to change")
    } else {

        let form =
            `<form class="dialog"
                <div clas="form-group">
                    <label for="hex">HEX:</label>
                    <input type="text" id="hex" name="hex" minlength="6" maxlength="6" placeholder="ffffff"/>
                    </br>
                    </br>
                    <label for="color">COLOR:</label>
                    <input type="color" id="color" name="color" value="#ff0055"/>
                </div>
            </form> `

        new Dialog({
            title: "COLOR PICKER",
            content: form,
            buttons: {
                submit: { label: "SUBMIT", callback: () => confirmed = true },
                cancel: { label: "CANCEL", callback: () => confirmed = false }
            },
            default: "submit",

            close: html => {
                (async () => {
                    if (confirmed) {
                        const hex = html.find('#hex')[0].value
                        const picker = html.find('#color')[0].value
                        const color = hex === "" ? picker : `#${hex}`

                        canvas.lighting.updateAll({
                            "config.color": color
                        });
                    }
                })();
            }
        }).render(true)
    }
}

