const macro = game.macros.get("tacUsVR6fAvLY0VQ")
// replace arguments with relevant ChatSpeaker macro uuid

const attack = await macro.execute({
    comment: `x3 damage on crit. -4DR, +3 damage when aiming 2 rounds`,
    img: "systems/cy-borg/assets/images/icons/weapons/sniper-rifle.svg",
    mode: { ranged: true, autofire: false },
    weaponName: "Sniper rifle",
    weaponDice: `2d10`
})

