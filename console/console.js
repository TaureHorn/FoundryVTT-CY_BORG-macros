class TTY extends FormApplication {

    static get defaultOptions() {
        const defaults = super.defaultOptions;
        const overrides = {
            closeOnSubmit: false,
            id: "CONSOLE",
            popOut: true,
            minimizable: true,
            resizable: false,
            submitOnChange: true,
            template: "0_CUSTOM/4_EXPORTS/console.hbs",
            title: "CONSOLE",
            userId: game.userId
        }
        return foundry.utils.mergeObject(defaults, overrides)
    }

    getData() {
        return {
            header: "Alliansen Inc. OMEGA CLASS SECURITY SYSTEM",
            src: game.items.get("vm5aj6Qkl20jwlgv"),
            style: {
                background: "url(0_CUSTOM/2_ASSETS/corp-logos/alliansen_console-bg.jpg)",
                col: "#ff0055"
            }
        }
    }

    async _updateObject(event, formData) {
        const src = this.getData().src
        const messageLog = [...src.system.chatLog]
        const name = game.user.character ? `${game.user.character.name}: ` : ""
        const message = `${name}${formData.consoleInputText}`
        messageLog.push(message)
        await src.update({ "system.chatLog": messageLog })
        this.render()
    }

}

let konsole = new TTY({}).render(true, { height: 700, width: 700 })

