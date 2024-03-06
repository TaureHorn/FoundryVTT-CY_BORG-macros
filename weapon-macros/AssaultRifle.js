const macro = game.macros.get("tacUsVR6fAvLY0VQ")
// replace arguments with relevant ChatSpeaker macro uuid

const attack = await macro.execute({
    img: "systems/cy-borg/assets/images/icons/weapons/assault-rifle.svg",
    mode: { ranged: true, autofire: true },
    weaponName: "Assault rifle",
    weaponDice: `1d8`
})

