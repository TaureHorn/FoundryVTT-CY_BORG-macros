// call on an individual object to generate a loot and make a token an Item Pile
// ARGS Object {actor}, Object {token}

if (!game.modules.get('item-piles') {
	return ui.notifications.warn(`${this.name}: Item Piles modules is not enabled`)
}
if (actor.type != 'npc') return
if (!game.user.isGM) return
if (typeof token === 'undefined') return

// generate loot based on table
await game.itempiles.API.rollItemTable("randomLoot", {
    timesToRoll: "1d3-1",
    targetActor: actor,
    removeExistingActorItems: false
});

// turn token into item pile
await game.itempiles.API.turnTokensIntoItemPiles(token, {
	pileSettings : {
		shareCurrenciesEnabled: false,
		displayOne: false,
		type: game.itempiles.pile_types.PILE,
	}
})

// generate a list of items from strings in actors sheet
let inventory = []
let invalidTypes = ['class', 'feat', 'infestation', 'nanoPower']
for (const item of game.items) {
	if (invalidTypes.includes(item.type)) continue
	if (actor.system.description.includes(item.id)) inventory.push(item)
}
if (inventory.length) await game.itempiles.API.addItems(token, inventory)

// generate random amount of currency and give to token actor
const value = Math.floor(Math.random() * 50)
await game.itempiles.API.addCurrencies(actor, `${value}C`)
