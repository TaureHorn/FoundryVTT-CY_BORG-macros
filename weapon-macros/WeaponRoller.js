if (game.user.hasRole("GAMEMASTER") && canvas.tokens.controlled.length !== 1) {
    ui.notifications.warn(`You need to select a token that will make an attack`)
}

let actorData = actor || canvas.tokens.controlled[0].document.actor || game.user.character;

if (actorData.type !== "character") {
    ui.notifications.warn(`You need to select a token for a character. NPC tokens do not have the necessary stats`)
} else {


    let form =
        `<form class="dialog attack-dialog">
        <div class"form-group">
            <label for=DR">Attack DR</label>
            <input type="number" id="attack-dr" name="attack-dr" value="12" placeholder="12">
        </div>`

    mode.ranged && mode.autofire ? form +=
        `<div class="form-group">
        <label for="autofire">Autofire?</label>
        <input type="checkbox" id="autofire" name="autofire" value="1">
    </div>`
        : form += ``

    form += `</form>`

    const color = {
        "fumble": `#ff0055`,
        "normal": `#f3e600`,
        "crit": `#18f081`,
        "faded": `#999999`
    }

    function damageParser(attackRoll, damageRoll) {
        const min = damageRoll.terms[0].number
        const max = damageRoll.terms[0].faces * min
        const crit = attackRoll.terms[0].results[0].result === attackRoll.terms[0].faces ? true : false

        if (damageRoll.total === max) {
            return `<span style="color:${color.crit}">${crit ? damageRoll.total * 2 : damageRoll.total}</span>`
        } else if (damageRoll.total === min) {
            return `<span style="color:${color.fumble}">${crit ? damageRoll.total * 2 : damageRoll.total}</span>`
        } else {
            return `<span style="color:${color.normal}">${crit ? damageRoll.total * 2 : damageRoll.total}</span>`
        }
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


    function toHit(diceRoll, roll, DR) {
        if (diceRoll === 20) {
            return `CRIT!`
        } else if (diceRoll === 1) {
            return `FUMBLE!`
        } else if (roll >= DR) {
            return `Hit`
        } else {
            return `Miss`
        }
    }

    new Dialog({
        title: mode.ranged ? "Ranged Attack" : "Melee Attack",
        content: form,
        buttons: {
            attack: { label: "Attack", callback: () => confirmed = true },
            cancel: { label: "Cancel", callback: () => confirmed = false }
        },
        default: "attack",

        close: html => {
            (async () => {
                if (confirmed) {
                    const DR = Math.floor(Number(html.find('#attack-dr')[0].value))

                    let result_html = ""
                    let modifier = ""

                    // attack mode
                    if (mode.ranged && mode.autofire) {
                        if (html.find('#autofire')[0].checked) {
                            modifier = actorData.system.abilities.agility.value
                            result_html = `<span><strong>RANGED ATTACK: Autofire</strong></span>`
                        } else {
                            modifier = actorData.system.abilities.presence.value
                            result_html = `<span><strong>RANGED ATTACK</strong></span>`
                        }
                    } else if (mode.ranged) {
                        modifier = actorData.system.abilities.presence.value
                        result_html = `<span><strong>RANGED ATTACK</strong></span>`
                    } else {
                        modifier = actorData.system.abilities.strength.value
                        result_html += `<span><strong>MELEE ATTACK</strong></span>`
                    }

                    const roll = await new Roll(`1d20+${modifier}`).roll()
                    const diceRoll = roll.total - modifier

                    // roll information
                    result_html +=
                        `<div style="display:flex;flex-direction:row;align-items:center">
                        <img width="80" height="80" src=${img}/>
                        <div style="padding-left:3px">
                            <p><em>${weaponName}</em></p>
                            <p>${rollColor(diceRoll, roll)} vs DR${DR} 
                                <span style="color:${color.faded}">(${(roll.formula).replace(/\s/g, "")})</span>
                            </p>
                            <p><strong>${toHit(diceRoll, roll.total, DR)}</strong></p>
                        </div>
                    </div>
                    `
                    // output damage
                    if (roll.total >= DR) {
                        const damage = await new Roll(weaponDice).roll()
                        result_html +=
                            `<hr>
                        <p style="text-align:center"><strong>INFLICT ${damageParser(roll, damage)} DAMAGE </strong> 
                           <span style="color:${color.faded}">(${weaponDice})</span>
                        </p>`

                        // crit
                        if (diceRoll === roll.terms[0].faces) {
                            result_html +=
                                `<hr>
                            <p>CRIT: Damage has been doubled. Targets armour/cover also reduced by 1 tier</p>
                            `
                        }
                    }

                    //fumble
                    if (diceRoll === roll.terms[0].number) {
                        const fumble = await new Roll(`1d6`).roll()
                        result_html += `<hr><p>FUMBLE:`
                        switch (fumble.total) {
                            case 1:
                            case 2:
                            case 3:
                                result_html += `Out of ammo. You also drop the weapon or otherwise make it unusable until an action is spent fixing it</p>`
                                break;
                            case 4:
                            case 5:
                                result_html += `Your weapon misfires/breaks. It has to be repaired outside of combat</p>`
                                break;
                            case 6:
                                const explosion = await new Roll(`1d6`).roll()
                                result_html += `Your weapon explodes or otherwise hurts you for ${explosion.total} damage and is beyond repair</p>`
                                break;
                        }
                    }

                    // output result_html to macro to push to chat
                    const macro = game.macros.get("bsiTa8xf6eTMONFt")
                    const speak = await macro.execute({ message: result_html })
                }
            })();
        }
    }).render(true)
}
