if (game.user.hasRole("GAMEMASTER") && canvas.tokens.controlled.length !== 1) {
    ui.notifications.warn(`You need to select a token that is defending an attack`)
}

let actorData = actor || canvas.tokens.controlled[0].document.actor || game.user.character;

if (actorData.type !== "character") {
    ui.notifications.warn(`You need to select a token for a character. NPC tokens do not have the necessary stats`)
} else {
    let armour = {
        "img": "systems/cy-borg/assets/images/icons/equipment/cheap-clothes.png",
        "name": "No armour",
        "tier": 0
    }

    const item = (actorData.items._source).find(({ type }) => type === "armor")

    if (typeof item !== 'undefined') {
        armour = {
            "img": item.img,
            "name": item.name,
            "tier": item.system.tier.value
        }
    }

    let form =
        `<form class="dialog">
            <div class="form-group">
                <label for="DR">Defence DR:</label>
                <input type="number" id="defence-dr" name="defence-dr" value="12" placeholder="12">
            </div>
            <div class="form-group">
                <label for="attack-die">Incoming attack die</label>
                <input type="text" id="incoming-attack-die" name="incoming-attack-die" value="d6" placeholder="d6">
            </div>
        </form>
        `
    const color = {
        "fumble": `#ff0055`,
        "normal": `#f3e600`,
        "crit": `#18f081`,
        "faded": `#999999`
    }

    async function damageParser(attackRoll, damageRoll) {
        let damageMitigation = 0
        if (armour.tier > 0) {
            let mitigationDice = ""
            switch (armour.tier) {
                case 1:
                    mitigationDice = `1d2`
                    break;
                case 2:
                    mitigationDice = `1d4`
                    break;
                case 3:
                    mitigationDice = `1d6`
                    break;
                case 4:
                    mitigationDice = `1d8`
                    break;
            }
            const dmgReduction = await new Roll(mitigationDice).roll()
            damageMitigation = dmgReduction.total
        }
        const crit = attackRoll.terms[0].results[0].result === attackRoll.terms[0].number ? true : false
        const rawDmg = crit ? damageRoll.total * 2 : damageRoll.total
        let damage = rawDmg - damageMitigation
        if (damage < 0) { damage = 0 }

        const min = damageRoll.terms[0].number
        const max = damageRoll.terms[0].faces * min

        if (damageRoll.total === max) {
            return `<span style="color:${color.crit}">${damage}</span></strong><span style="color:${color.faded}"> (${rawDmg}-${damageMitigation})</span><strong>`
        } else if (damageRoll.total === min) {
            return `<span style="color:${color.fumble}">${damage}</span></strong><span style="color:${color.faded}"> (${rawDmg}-${damageMitigation})</span><strong>`
        } else {
            return `<span style="color:${color.normal}">${damage}</span></strong><span style="color:${color.faded}"> (${rawDmg}-${damageMitigation})</span><strong>`
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

    function toDefend(diceRoll, roll, DR) {
        if (diceRoll === roll.terms[0].faces) {
            return `CRIT!`
        } else if (diceRoll === roll.terms[0].number) {
            return `FUMBLE`
        } else if (roll.total >= DR) {
            return `Dodge`
        } else {
            return `Hit`
        }
    }

    new Dialog({
        title: "Defend",
        content: form,
        buttons: {
            defend: { label: "Defend", callback: () => confirmed = true },
            cancel: { label: "Cancel", callback: () => confirmed = false }
        },
        default: "defend",

        close: html => {
            (async () => {
                if (confirmed) {
                    const DR = Math.floor(Number(html.find('#defence-dr')[0].value))
                    const modifier = actorData.system.abilities.agility.value
                    const defenceRoll = await new Roll(`1d20+${modifier}`).roll()
                    const diceRoll = defenceRoll.total - modifier

                    // roll information
                    let result_html =
                        `<span><strong>DEFEND</strong></span>
                        <div style="display:flex";flex-direction:row;align-items:center">
                            <img width="80" height="80" src=${armour.img}/>
                            <div style="padding-left:3px">
                                <p><em>${armour.name}</em></p>
                                <p>${rollColor(diceRoll, defenceRoll)} vs DR${DR}
                                    <span style="color:${color.faded}">(${defenceRoll.formula.replace(/\s/g, "")})</span>
                                </p>
                                <p><strong>${toDefend(diceRoll, defenceRoll, DR)}</strong></p>
                            </div >
                        </div >
                        `
                    // output damage
                    if (defenceRoll.total < DR) {
                        const dmgDice = html.find('#incoming-attack-die')[0].value
                        const incDamage = await new Roll(dmgDice).roll()
                        result_html +=
                            `<hr>
                            <p style="text-align:center"><strong> YOU TAKE ${await damageParser(defenceRoll, incDamage)} DAMAGE</strong>
                                <span style="color:${color.faded}">(${dmgDice})</span>
                            </p>
                            `

                        // fumble
                        if (diceRoll === defenceRoll.terms[0].number) {
                            result_html += `<hr>
                                <p>FUMBLE: Damage has been doubled. Reduce your armour/cover by one tier</p>
                                `
                        }

                    }
                    // crit
                    if (diceRoll === defenceRoll.terms[0].faces) {
                        result_html += `<hr><p>CRIT: You gain a free counter-attack</p>`
                    }

                    // output result_html to macro to push to chat
                    const macro = game.macros.get("bsiTa8xf6eTMONFt")
                    // replace arguments with relevant ChatSpeaker macro uuid
                    const speak = await macro.execute({ message: result_html })
                }
            })();
        }
    }).render(true)
}

