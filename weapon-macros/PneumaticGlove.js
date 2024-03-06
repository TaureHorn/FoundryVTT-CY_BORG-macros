const macro = game.macros.get("tacUsVR6fAvLY0VQ")
// replace arguments with relevant ChatSpeaker macro uuid

const attack = await macro.execute({
    comment: `Ignores armour on a crit`,
    img: "systems/cy-borg/assets/images/icons/weapons/pneumatic-glove.svg",
    mode: { ranged: false, autofire: false },
    weaponName: "Pneumatic glove",
    weaponDice: `1d6`
})

