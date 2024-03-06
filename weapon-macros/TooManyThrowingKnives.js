const macro = game.macros.get("tacUsVR6fAvLY0VQ")
// replace arguments with relevant ChatSpeaker macro uuid

const attack = await macro.execute({
    comment: `Two attacks per round`,
    img: "systems/cy-borg/assets/images/icons/weapons/too-many-throwing-knives.svg",
    mode: { ranged: true, autofire: false},
    weaponName: "Too many throwing knives",
    weaponDice: `1d4`
})

