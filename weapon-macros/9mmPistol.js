const macro = game.macros.get("tacUsVR6fAvLY0VQ")
// replace arguments with relevant ChatSpeaker macro uuid

const attack = await macro.execute({
    img: "systems/cy-borg/assets/images/icons/weapons/9mm-pistol.svg",
    mode: { ranged: true, autofire: true },
    weaponName: "9mm pistol",
    weaponDice: `1d6`
})

