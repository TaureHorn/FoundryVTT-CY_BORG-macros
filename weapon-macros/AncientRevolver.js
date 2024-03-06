const macro = game.macros.get("tacUsVR6fAvLY0VQ")
// replace arguments with relevant ChatSpeaker macro uuid

const attack = await macro.execute({
    img: "systems/cy-borg/assets/images/icons/weapons/ancient-revolver.svg",
    mode: { ranged: true, autofire: false },
    weaponName: "Ancient revolver",
    weaponDice: `1d8`
})

