const macro = game.macros.get("tacUsVR6fAvLY0VQ")
// replace arguments with relevant ChatSpeaker macro uuid

const attack = await macro.execute({
    comment: `ONLY autofire`,
    img: "systems/cy-borg/assets/images/icons/weapons/two-smgs.svg",
    mode: { ranged: true, autofire: true },
    weaponName: "Pair of small SMGs",
    weaponDice: `1d6`
})

