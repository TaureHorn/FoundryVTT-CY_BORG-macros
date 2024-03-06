const macro = game.macros.get("tacUsVR6fAvLY0VQ")
// replace arguments with relevant ChatSpeaker macro uuid

const attack = await macro.execute({
    comment: `1-in-4 to hit yourself on a miss`,
    img: "systems/cy-borg/assets/images/icons/weapons/chainsaw.svg",
    mode: { ranged: false, autofire: false },
    weaponName: "Chainsaw",
    weaponDice: `1d6+1`
})

