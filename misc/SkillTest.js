if (game.user.hasRole("GAMEMASTER") && canvas.tokens.controlled.length !== 1) {
    ui.notifications.warn(`You need to select a token that is making a skill check`)
}

let actorData = actor || canvas.tokens.controlled[0].document.actor || game.user.character;

if (actorData.type !== "character") {
    ui.notifications.warn(`You need to select a token for a character. NPC tokens do not have the necessary stats`)
} else {

    const color = {
        "fumble": `#ff0055`,
        "normal": `#f3e600`,
        "crit": `#18f081`,
        "faded": `#999999`
    }

    function rollColor(diceRoll, roll) {
        const min = roll.terms[0].number
        const max = roll.terms[0].faces * min
        if (diceRoll === max) {
            return `<span style="color:${color.crit}">${roll.total}</span>`
        } else if (diceRoll === min) {
            return `<span style="color:${color.fumble}">${roll.total}</span>`
        } else {
            return `<span style="color:${color.normal}">${roll.total}</span>`
        }
    }

    let skill = ""

    let form = `
        <form class="dialog">
        <label for="DR">DR?</label>
        <input type="number" id="DR" name="DR" max="20" min="1" value="12" placeholder="12"/>
        </form> `

    new Dialog({
        title: "SKILL TEST",
        content: form,
        buttons: {
            strength: { label: "STR", callback: () => skill = "strength" },
            agility: { label: "AGI", callback: () => skill = "agility" },
            presence: { label: "PRE", callback: () => skill = "presence" },
            toughness: { label: "TOU", callback: () => skill = "toughness" },
            knowledge: { label: "KNO", callback: () => skill = "knowledge" }
        },
        default: "submit",

        close: html => {
            (async () => {
                if (skill !== "") {
                    const DR = html.find('#DR')[0].value
                    const modifier = actorData.system.abilities[skill].value
                    const roll = await new Roll(`1d20+${modifier}`).roll()
                    const diceRoll = roll.total - modifier

                    let result_html = ""
                    result_html += `<span style="text-transform:uppercase"><strong style="color:${color.normal}">${skill}</strong> Skill Check:</span>
                        <div style="border:1px solid ${color.faded};border-radius:5px;padding:5px">
                            <div style="text-align:center">
                                <span>${rollColor(diceRoll, roll)} vs DR ${DR} </span><span style="color:${color.faded}">(1d20+${modifier})</span>
                            </div>`

                    if (diceRoll === 20) {
                        result_html += `<div style="text-align:center"><span style="color:${color.crit}">CRIT SUCCESS</span></div>`
                    } else if (diceRoll === 1) {
                        result_html += `<div style="text-align:center"><span style="color:${color.fumble}">FUMBLE</span></div>`
                    } else if (roll.total >= DR) {
                        result_html += `<div style="text-align:center"><span style="color:${color.normal}">SUCCESS</span></div>`
                    } else if (roll.total < DR) {
                        result_html += `<div style="text-align:center"><span style="color:${color.normal}">FAILURE</span></div>`
                    }
                    result_html += `</div>`

                    console.log(result_html)

                    // output result_html to macro to push to chat
                    const macro = game.macros.get("bsiTa8xf6eTMONFt")
                    // replace arguments with relevant ChatSpeaker macro uuid
                    const speak = await macro.execute({ message: result_html })
                }
            })();
        }
    }).render(true)
}

