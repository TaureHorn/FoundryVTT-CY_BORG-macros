const macro = game.macros.get("tacUsVR6fAvLY0VQ")
// replace arguments with relevant ChatSpeaker macro uuid

const attack = await macro.execute({
    img: "systems/cy-borg/assets/images/icons/weapons/filament-knife.svg",
    mode: { ranged: false, autofire: false },
    weaponName: "Filament knife",
    weaponDice: `1d6`
})

