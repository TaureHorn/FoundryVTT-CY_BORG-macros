const macro = game.macros.get("tacUsVR6fAvLY0VQ")
// replace arguments with relevant ChatSpeaker macro uuid

const attack = await macro.execute({
    comment: `to up to d3 tech targets or people with 2+ cybertech. x2 damage vs. vehicles, turrets and mechs`,
    img: "systems/cy-borg/assets/images/icons/weapons/pulse-grenade.svg",
    mode: { ranged: true, autofire: false},
    weaponName: "ePulse grenade",
    weaponDice: `1d8`
})

