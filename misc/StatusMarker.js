// REQUIRES MODULE COMBAT-UTILITY-BELT
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
                <label for="condition">CONDITION?</label>
                <select id="condition" name="condition">
                    <option value="0 Misc">0 Misc</option>
                    <option value="1 Misc">1 Misc</option>
                    <option value="2 Misc">2 Misc</option>
                    <option value="3 Misc">3 Misc</option>
                    <option value="AIMING">AIMING</option>
                    <option selected value="COVERED">COVERED</option>
                    <option value="DEAD">DEAD</option>
                    <option value="DYING">DYING</option>
                    <option value="FLASHLIGHT">FLASHLIGHT</option>
                    <option value="FLYING">FLYING</option>
                    <option value="HIGH">HIGH</option>
                    <option value="INFESTED">INFESTED</option>
                    <option value="INVISIBLE">INVISIBLE</option>
                    <option value="LOCKED IN">LOCKED IN</option>
                    <option value="POSSESSED">POSSESSED</option>
                    <option value="PRONE">PRONE</option>
                    <option value="RESTRAINED">RESTRAINED</option>
                    <option value="STONED">STONED</option>
                    <option value="SURRENDER">SURRENDER</option>
                    <option value="UNCONSCIOUS">UNCONSCIOUS</option>
                    <option value="WIRED IN">WIRED IN</option>
                </select>
            </div>
        </form> `

    new Dialog({
        title: "CONDITION PICKER",
        content: form,
        buttons: {
            submit: { label: "SUBMIT", callback: () => confirmed = true },
            cancel: { label: "CANCEL", callback: () => confirmed = false }
        },
        default: "submit",

        close: html => {
            (async () => {
                if (confirmed) {
                    const condition = html.find('#condition')[0].value

                    actorData.forEach(async (token) => {
                        const toggle = await game.cub.hasCondition(condition, token.actor) ? await game.cub.removeCondition(condition, token.actor) : await game.cub.addCondition(condition, token.actor)
                    })
                }
            })();
        }
    }).render(true)
}

