const macro = game.macros.get("tacUsVR6fAvLY0VQ")
// replace arguments with relevant ChatSpeaker macro uuid

const attack = await macro.execute({
    comment: `Hits up to d3 targets. For mounting on an assault rifle. x2 damage vs vehicles, turrets and mechs`,
    img: "systems/cy-borg/assets/images/icons/weapons/grenade-launcher.svg",
    mode: { ranged: true, autofire: false },
    weaponName: "Grenade launcher",
    weaponDice: `1d6`
})

