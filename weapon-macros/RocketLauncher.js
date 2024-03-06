const macro = game.macros.get("tacUsVR6fAvLY0VQ")
// replace arguments with relevant ChatSpeaker macro uuid

const attack = await macro.execute({
    comment: `d4 targets. Ignores 2 points of armour. Fires once per combat. x2 damage vs vehicles, turrets and mechs`,
    img: "systems/cy-borg/assets/images/icons/weapons/rocket-launcher.svg",
    mode: { ranged: true, autofire: false },
    weaponName: "Rocket launcher",
    weaponDice: `1d12`
})

