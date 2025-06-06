// MACRO TO ACCEPT DR AND DAMAGE DICE, AUTO ROLL A CHARACTERS DODGE AND DEAL DAMAGE IF FAILED THEN OUTPUT RESULT TO CHAT

// GET ACTOR
if (!actor) {
    return ui.notifications.warn(`${this.name}: Unable to get an actor to make a defence roll. Have you selected a token, or set a character as a representative in the user config?`)
}

// GET ARMOR
function getArmor(actor) {
    let itemDoc = false
    switch (actor.type) {
        case 'character':
        case 'vehicle':
            const item = actor.items.find(item => item.type === 'armor')
            if (item) itemDoc = item
            break;
        case 'npc':
            for (const item of game.items) {
                if (item.type != 'armor') continue
                if (actor.system.description.includes(item.uuid)) itemDoc = item
            }
            break;
        default:
            break;
    }

    return {
        img: itemDoc ? itemDoc.img : "0_CUSTOM/2_ASSETS/items/equipment/cheap-clothes.webp",
        name: itemDoc ? itemDoc.name : "No armour",
        tier: itemDoc ? itemDoc.system.tier.value : 0,
        ...(itemDoc && { id: itemDoc.id })
    }

}
const armour = getArmor(actor)

let form =
    `<form class="dialog">
            <div class="form-group">
                <label for="DR">DEFENCE DR:</label>
                <input type="number" min="1" max="20" id="defence-dr" name="defence-dr" value="12" placeholder="12">
            </div>
            <div class="form-group">
                <label for="attack-die">DAMAGE DIE:</label>
                <select id="incoming-attack-die" name="incoming-attack-die">
                    <option value="d2">d2</option>
                    <option value="d3">d3</option>
                    <option value="d4">d4</option>
                    <option value="d6" selected>d6</option>
                    <option value="d8">d8</option>
                    <option value="d10">d10</option>
                    <option value="d12">d12</option>
                    <option value="2d10">2d10</option>
                </select>
            </div>
        </form>
        `

const color = {
    "fumble": `#ff0055`,
    "normal": `#f3e600`,
    "crit": `#18f081`,
    "faded": `#999999`
}

let damage = ""
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
    damage = rawDmg - damageMitigation
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

const dialog = new Dialog({
    title: "DEFEND",
    content: form,
    buttons: {
        defend: { label: "DEFEND", callback: () => confirmed = true },
        cancel: { label: "CANCEL", callback: () => confirmed = false }
    },
    default: "defend",

    close: html => {
        (async () => {
            if (confirmed) {
                const DR = Math.floor(Number(html.find('#defence-dr')[0].value))
                const modifier = actor.type === 'character' ? actor.system.abilities.agility.value : 0
                const defenceRoll = await new Roll(`1d20+${modifier}`).roll()
                const diceRoll = defenceRoll.total - modifier

                // roll information
                let result_html =
                    `<span><strong>DEFEND</strong></span>
                        <div style="display:flex";flex-direction:row;align-items:center">
                            <img width="80" height="80" src=${armour.img}>
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
                    // auto deal damage
                    let HP = actor.system.hitPoints.value
                    HP = HP - damage
                    actor.update({ 'system.hitPoints.value': HP })

                    if (token) {
                        const position = {
                            x: token.document.x + ((canvas.grid.size * token.document.width) * 0.5),
                            y: token.document.y + ((canvas.grid.size * token.document.height) * 0.5)
                        }

                        canvas.interface.createScrollingText(position, `-${damage}`, {
                            direction: 1,
                            fill: '#ff0055',
                            fontSize: '32px'
                        })
                    }

                    // fumble
                    if (diceRoll === defenceRoll.terms[0].number) {
                        result_html += `<hr>
                                <p>FUMBLE: Damage has been doubled and your armour has been reduced by one tier</p>
                                `

                        if (actor.type != 'npc' && armour.id) {
                            // auto decrement armour tier if not npc and have armour
                            const changedItems = structuredClone(actor.items._source)
                            const armourReduced = changedItems.find(item => item._id === armour.id)
                            armourReduced.system.tier.value = armourReduced.system.tier.value >= 1
                                ? armourReduced.system.tier.value - 1
                                : 0
                            actor.update({ items: changedItems })
                        }
                    }

                }
                // crit
                if (diceRoll === defenceRoll.terms[0].faces) {
                    result_html += `<hr><p>CRIT: You gain a free counter-attack</p>`
                }

                // output result_html to macro to push to chat
                const macro = game.macros.get("bsiTa8xf6eTMONFt")
                // replace arguments with relevant ChatSpeaker macro uuid
                await macro.execute({ message: result_html })
            }
        })();
    }
})

dialog.options.classes.push('nlb-dialog')
dialog.render(true)

