const macro = game.macros.get("tacUsVR6fAvLY0VQ")
// replace arguments with relevant ChatSpeaker macro uuid

const attack = await macro.execute({
    comment: `enhanced by SmartJack cybertech`,
    img: "systems/cy-borg/assets/images/icons/weapons/smartgun.svg",
    mode: { ranged: true, autofire: true },
    weaponName: "SmartGun [SmartJack]",
    weaponDice: `1d10`
})

