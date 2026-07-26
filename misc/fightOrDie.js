// MACRO TO SEND HTML FOR FINAL CHOICE TO SELECT PLAYER RECIPIENTS

if (!game.user.isGM) {
    return ui.notifications.warn(`${this.name}: GM only!`)
}

let form = ` 
    <form name="fightOrDie" class="dialog"
        <fieldset style="border: 1px solid black; border-radius: 3px">
            <legend><strong>USERS</strong></legend>`

for (const user of game.users) {
    if (!user.active) continue
    if (user.isGM) continue
    form += `<input id="fightOrDie_${user.id}" name="fightOrDie_users" value="${user.id}" type="checkbox" />
        <label>${user.name}</label>`
}

form += `
        </fieldset>
    </form>`


const shownElement = `
    <div id="fightOrDie_box"
    style="
        backdrop-filter: blur(10px);
        background-color: rgba(0,0,0,0.8);
        cursor: not-allowed;
        height: 100vh;
        position: absolute;
        width: 100vw;
        z-index: 9999;
    ">
    <p id="fightOrDie_question"
    style="
        color: #444;
        font-size: 4em;
        left: 50%;
        position: absolute;
        left: 50%;
        text-align: center;
        top: 10%;
        transform: translate(-50%, -50%);
    ">HOW DO YOU RESPOND TO A DYING WORLD?</p>
        <div id="fightOrDie_buttons"
        style="
            align-items: center;
            display: flex;
            flex-direction: column;
            gap: 5em;
            left: 50%;
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
        ">
            <button
            class="fightOrDie"
            id="fight"
            style="
                background-color:rgba(0,0,0,0);
                border:none;
                color: #ff0055;
                font-size:8em;
                font-weight:900;
                height: 20vh;
                width: 35vw;
            ">FIGHT</button>

            <button
            class="fightOrDie"
            id="die"
            style="
                background-color:rgba(0,0,0,0);
                border:none;
                color: #222;
                font-size:8em;
                font-weight:900;
                height: 20vh;
                width: 35vw;
            ">SURRENDER</button>
        </div>
    </div>
`

function choseLife() {
    $('#fightOrDie_box').remove()
    if (!game.user.isGM) {
        game.socket.emit('module.n1ght0wls_little_bits', {
            event: 'alertDM',
            users: [game.users.activeGM.id],
            alertString: `MACRO:fightOrDie: USER ${game.user.character.name} HAS CHOSEN TO FIGHT`
        })
    }
}

function giveUp() {
    $('#fightOrDie_box').remove()
    if (!game.user.isGM) {
        game.socket.emit('module.n1ght0wls_little_bits', {
            event: 'alertDM',
            users: [game.users.activeGM.id],
            alertString: `MACRO:fightOrDie: USER ${game.user.character.name} HAS CHOSEN TO SURRENDER`
        })
    }
}

const triggers = {
    fight: choseLife.toString(),
    die: giveUp.toString()
}

const dialog = new Dialog({
    buttons: {
        submit: { label: 'submit', callback: () => confirmed = true },
        cancel: { label: 'cancel', callback: () => confirmed = false }
    },
    content: form,
    default: 'submit',
    title: 'FIGHT OR DIE USER SELECT',
    close: html => {
        (async () => {
            if (confirmed) {
                let recipients = []
                for (const user of html.find('[name="fightOrDie_users"]')) {

                    if (user.checked) recipients.push(user.value)
                }

                const showHTMLID = "3DYpZy7hgECvqAGF"
                // CALL triggerSocketMacro TO EMIT ON SOCKET AND SEND DATA TO PLAYERS
                await game.macros.get('x5ShsKu7C7JFqkXb').execute({
                    userArr: recipients,
                    macroId: showHTMLID,
                    macroArgs: {
                        elements: [shownElement],
                        events: triggers
                    }
                })

                await game.macros.get(showHTMLID).execute({
                    elements: [shownElement],
                    events: triggers
                })
            }
        })();
    }
})
dialog.options.classes.push('nlb-dialog')
dialog.render(true)
