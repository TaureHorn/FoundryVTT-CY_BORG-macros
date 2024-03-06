const macro = game.macros.get("tacUsVR6fAvLY0VQ")
// replace arguments with relevant ChatSpeaker macro uuid

const attack = await macro.execute({
    comment: `Test Toughness or fall down`,
    img: "systems/cy-borg/assets/images/icons/weapons/taser.svg",
    mode: { ranged: true, autofire: false },
    weaponName: "Taser",
    weaponDice: `1d2`
})

