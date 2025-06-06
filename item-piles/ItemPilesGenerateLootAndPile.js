// CALL ON AN INDIVIDUAL OBJECT TO GENERATE LOOT AND MAKE A TOKEN AN ITEM PILE
// ARGS Object {actor}, Object {token}

if (actor.type != 'npc') return
if (!game.user.isGM) return
if (typeof token === 'undefined') return

// GENERATE LOOT BASED ON A TABLE
await game.itempiles.API.rollItemTable("randomLoot", {
    timesToRoll: "1d3-1",
    targetActor: actor,
    removeExistingActorItems: false
});

// TURN TOKEN INTO ITEM PILE
await game.itempiles.API.turnTokensIntoItemPiles(token, {
	pileSettings : {
		shareCurrenciesEnabled: false,
		displayOne: false,
		type: game.itempiles.pile_types.PILE,
	}
})

// GENERATE A LIST OF ITEMS FROM UUIDS IN NPC ACTORS DESCRIPTION
let inventory = []
let invalidTypes = ['class', 'feat', 'infestation', 'nanoPower']
for (const item of game.items) {
	if (invalidTypes.includes(item.type)) continue
	if (actor.system.description.includes(item.id)) {
		inventory.push(item)

		// MAKE NEW AMMO MAG FOR RANGED WEAPON AND ADD TO INVENTORY
		const ignoreUuids = [
			'Item.SZLbmYqf1bnVSpRq',
			'Item.14tZS1lVlPjxJeQQ',
			'Item.WonBH1UBSIBapQMT',
			'Item.cGmVdkw2n4vPHJsy',
			'Item.jWSoTacfvoYKF7OE'
		]
		if (item.type === 'weapon' && item.system.weaponType === 'ranged' && !ignoreUuids.includes(item.uuid)) {

			function genAmmo(quantity) {
				if (quantity === 0) return
				let mods = {
					name: `${item.name} ammo mag`,
					system: {
						price: item.system.price * 0.1,
						quantity: quantity
					}
				}
				const mag = game.items.get('6dNhRMhfc7A40uIb').clone(mods)
				inventory.push(mag)				
			}			
			const qt = Math.floor(Math.random() * 3)
			genAmmo(qt)
		}
	}
}
if (inventory.length) await game.itempiles.API.addItems(token, inventory)

// GENERATE WEIGHTED RANDOM AMOUNT OF CURRENCY AND GIVE TO TOKEN ITEM PILE
let limit = 5
const currency = (() => {
    let tens = (() => {
        let rand = Math.random()
        let num = 0
        for (i = 0; i < limit; i++) {
            const binnedProbability = 1 / ((i + 1) * 2)
            if (rand > binnedProbability) {
                num = i
                break;
            }
        }
        return num
    })()

    let noughts = Math.floor(Math.random() * 10)
    return parseInt("" + tens + noughts)
})()
if (currency > 0) await game.itempiles.API.addCurrencies(actor, `${currency}C`)
