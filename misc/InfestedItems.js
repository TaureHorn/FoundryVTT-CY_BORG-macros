const item = await new Roll(`1d10`).roll()
const d2 = await new Roll(`1d2`).roll()
const d3 = await new Roll(`1d3`).roll()
const d4 = await new Roll(`1d4`).roll()
const d6 = await new Roll(`1d6`).roll()

const nameSt = "<strong style='color:#f3e600'>"
const resultSt = "<strong style='color: white'>"

let result_html = `<h3>${nameSt}infested item</strong></h3>`

switch (item.total) {
    case 1:
        result_html += `This blood crechip sinks into your hand. Your fingers stretch and grow tendon-like tentacles that wrap around your throat. You are choked for ${resultSt}${d4.total}</strong> damage per round until you, or someone helping out, pass a DR14 Strength test. YOU can now manifest these tentacles at will`
        break;
    case 2:
        result_html += `A truly symmetric jelly fungus that smells of autumn forests and neon lights. Eat it adn experience perfect harmony lasting an hour, during which all tests are -4DR. Any damage taken is dealt again when the hour ends`
        break;
    case 3:
        result_html += `A dusty grenade vibrating at a low frequence. Creates a void upon detonation, sucking in every nearby item and ${resultSt}${d2.total}</strong>. People 10+ metres away may test Strength DR14 to grab onto something. Everything else is obliterated`
        break;
    case 4:
        result_html += `Put these mirrorshades on and they will burn your skin and fuse with your skull. They make it possbile to see large quantities of data travelling through the air but increase the difficulty (+2DR) of any ranged attack in high-data-traffic areas`
        break;
    case 5:
        result_html += `A filament knife covered in pink algae. It deals d6 additional damage on a hit if the target does not pass a Toughness DR14 test. If it kills the target, their body is semi-liquified, and the attacker's body rejects one piece of cybertech, replacing it with an organic equivalent made from the victims body matter. if the attacker fails a Presence DR12 test, the bio-augment causes one random Nano infestation`
        break;
    case 6:
        result_html += `An audio recording of a madmans mutterings and ramblings on a voice recorder pen scarred by flame. When played loudly all tests are +2DR for everyone within the room even if they can't hear it`
        break;
    case 7:
        result_html += `A keychain memstick with 'Machine Ghost' handwritten on an elegant label. Causes the first piece of tech it is slotted into to malfunction for ${resultSt}${d6.total}</strong> rounds. The item is now host to a sentient AI until the device is rebooted. If the device can interface with other items, the AI can escape. Use appropriate data tables to detemine its persona and behaviour`
        break;
    case 8:
        result_html += `Pollen-stained bulletproof vest. Grants -d4 protection. Whenever damage is reduced by 4, the wearers skin is warped to a bark-like texture around the would-be wound site`
        break;
    case 9:
        result_html += `Smartgun with its RCD-link cable ripped out and a crude carving of a crossed-out eye on the handle. Replacing the link cable and jacking in places a voice in your head. The voice offers you advice on the most direct approach to your goal but has no consideration for consequences or morality. If you listen to the guns advice, it shoots with -1DR ${resultSt}${d3.total}</strong> times per day`
        break;
    case 10:
        result_html += `A wrapped burger that glows faintly purple and hums at a low frquencey. Eat it and you fall into an agonised pain for a week, your digestive system now coloniseb by alien bacteria. After this week, you no longer need food to live. You take d8 damage when you consume anything other than water. Your body will shrivel, wither and die if you go 3 days without sunlight`
        break;
}

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

