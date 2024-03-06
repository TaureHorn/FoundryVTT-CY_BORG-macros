const macro = game.macros.get("tacUsVR6fAvLY0VQ")
// replace arguments with relevant ChatSpeaker macro uuid

const attack = await macro.execute({
    img: "systems/cy-borg/assets/images/icons/weapons/brick.svg",
    mode: { ranged: false, autofire: false },
    weaponName: "Brick",
    weaponDice: `1d3`
})

