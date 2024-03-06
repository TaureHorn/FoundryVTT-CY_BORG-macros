const macro = game.macros.get("tacUsVR6fAvLY0VQ")
// replace arguments with relevant ChatSpeaker macro uuid

const attack = await macro.execute({
    comment: `ONLY autofire`,
    img: "systems/cy-borg/assets/images/icons/weapons/nailgun.svg",
    mode: { ranged: true, autofire: true },
    weaponName: "Nailgun",
    weaponDice: `1d6`
})

