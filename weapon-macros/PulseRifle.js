const macro = game.macros.get("tacUsVR6fAvLY0VQ")
// replace arguments with relevant ChatSpeaker macro uuid

const attack = await macro.execute({
    comment: `x2 damage vs vehicles, turrets and mechs`,
    img: "systems/cy-borg/assets/images/icons/weapons/pulse-rifle.svg",
    mode: { ranged: true, autofire: true },
    weaponName: "Pulse rifle",
    weaponDice: `1d10`
})

