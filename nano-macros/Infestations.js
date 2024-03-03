const fate = await new Roll(`1d20`).roll()
const d3 = await new Roll(`1d3`).roll()
const d4 = await new Roll(`1d4`).roll()
const d6 = await new Roll(`1d6`).roll()
const d6_2 = await new Roll(`1d6`).roll()
const d8 = await new Roll(`1d8`).roll()
const d10 = await new Roll(`1d10`).roll()
const d12 = await new Roll(`1d12`).roll()

const nameSt = "<strong style='color:#B861ff'>"
const resultSt = "<strong style='color: white'>"

let result_html = `<h1><strong>NANO INFESTATION</strong></h1>`
switch (fate.total) {
    case 1:
        result_html += `${nameSt}Alien Crabs</strong></br><strong>Bugs crawl beneath your skin.</strong></br></br>They burrow deeper, sending you to the ground, shaking with pain for ${resultSt}${d6.total}</strong> rounds.`
        break;
    case 2:
        result_html += `${nameSt}Rot</strong></br><strong>Skin and flesh slowly rot</strong></br></br>Large chunks of skin fall off. You take ${resultSt}${d6.total}</strong> damage and for the rest of the day an extra +2 damage from physical sources`
        break;
    case 3:
        result_html += `${nameSt}Flora</strong></br><strong>Your skin is tinted green or purple. Plant matter grows over your wounds.</strong></br></br> Flowers bloom from your mouth and scream violently for 10 minutes, after which they wither and die. During this time you cannot speak and add +2DR to all your actions.`
        break;
    case 4:
        result_html += `${nameSt}Third Eye</strong></br><strong>It does not look human, that eye in the middle of your forehead.</strong></br></br> Your sight shifts to the alien eye, revealing endless spectra of colours incomprehensible to the human mind. For ${resultSt}${d6.total}</strong> rounds, you have -4DR on all Presence and Knowledge tests but +4DR on everything else.`
        break;
    case 5:
        result_html += `${nameSt}Gills</strong></br><strong>You can breathe underwater.</strong></br></br>For ${resultSt}${d6.total}</strong> rounds, you cannot breathe air - test Toughness DR12 each round or suffer ${resultSt}${d4.total}</strong> damage.`
        break;
    case 6:
        result_html += `${nameSt}Tubes</strong></br><strong>Thick, rubber-like hair that moves against the wind.</strong></br></br>It starts to twist and turn around your face and arms, constraining you and ${resultSt}${d3.total}</strong> other nearby targets. +4DR to any attack or defence tests until either they break free by testing Strength DR12 or someone helps them struggle loose.`
        break;
    case 7:
        result_html += `${nameSt}Brittle Bones</strong></br><strong>Your Strength counts as one less for calculating carrying capacity.</strong></br></br>A sudden vibration. The sound of shattering glass. Extreme pain. You take 1 point of damage for each item you are carrying.`
        break;
    case 8:
        result_html += `${nameSt}Bloodthirst</strong></br><strong>You have to eat raw meat every 2-3 hours to survive</strong></br></br>You can't control it anymore. It.Must.FEED. For ${resultSt}${d3.total}</strong> rounds, you can do nothing but attempt to bite or claw your way to the nearest person's main artery.`
        break;
    case 9:
        result_html += `${nameSt}Barbed Skeleton</strong></br><strong>Sharp pieces of bone pierce the skin around your joints. You need to grind them down every two weeks, or the hinder your movements</strong></br></br>A growth spurt occurs, causing ${resultSt}${d4.total}</strong> damage, bleeding wounds and for the next hour, you have +2DR on all actions that require moving your limbs.`
        break;
    case 10:
        result_html += `${nameSt}Radiance</strong></br><strong>A faint, eerie glow surrounds you. Geiger counters malfunction in your presence.</strong></br></br>You flash brightly and deal ${resultSt}${d6.total}</strong> damage to yourself and up to ${resultSt}${d6_2.total}</strong> others in your close proximity.`
        break;
    case 11:
        result_html += `${nameSt}Fading</strong></br><strong>You seem to face in and out of existence.</strong></br></br>You seem to disappear from sight and all sensors, but you are stuck in complete darkness for ${resultSt}${d4.total}</strong> rounds, after which you appear in a random location up to 50m from where you were.`
        break;
    case 12:
        result_html += `${nameSt}Seed pods</strong></br><strong>Pea-sized seed pockets cover most of your body.</strong></br></br>Seeds shoot out of your body, weakening you for the next hour as the seeds rapidly grow back. All physical tests are +4DR for this hour.`
        break;
    case 13:
        result_html += `${nameSt}Crystalline</strong></br><strong>Small buds of crystal cover your body.</strong></br></br>They expand, immobilising you as the crystal covers your entire body. You are unable to move for ${resultSt}${d3.total}</strong> rounds, and any damage taken during this time is tripled.`
        break;
    case 14:
        result_html += `${nameSt}Nanite echo</strong></br><strong>Your eyes are yellow and red.</strong></br></br>A semi-physical copy of yourself appears behind you and attempts to kill you or a nearby ally, whoeever is weakest. The echo has d12 HP and deals d6 damage with its ghastly grasp.`
        break;
    case 15:
        result_html += `${nameSt}Elongated fingers</strong></br><strong>Twice the length they used to be.</strong></br></br>They painfully twist and bend. You are unable to use weapons or other items requiring a firm grip for the next ${resultSt}${d10.total * 10}</strong> minutes.`
        break;
    case 16:
        result_html += `${nameSt}Cold</strong></br><strong>Humidity turns to frost on your cold skin.</strong></br></br>Your body temperature drops, and the air around you seems to freeze. You and everyone close to you act with +2DR for the next minute.`
        break;
    case 17:
        result_html += `${nameSt}Rage</strong></br><strong>Skin pulled tight, your blood is boiling.</strong></br></br>You lose control of your senses and attack anyone near you for ${resultSt}${d4.total}</strong> rounds. Whatever controls you prefers to use offensive Nano powers first and your fists second.`
        break;
    case 18:
        result_html += `${nameSt}Bloated and moist</strong></br></br>You swell up even more, and a greyish liquid seeps from you orifices. +4DR on every test form 10 minutes.`
        break;
    case 19:
        result_html += `${nameSt}Bestial, enlarged maw</strong></br></br>It splits in two and grows even larger when triggered. You take ${resultSt}${d8.total}</strong> damage but can bite for d6 damage for the next hour.`
        break;
    case 20:
        result_html += `${nameSt}Magnetic</strong></br><strong>You attract metal objects. Usually only noticeable at a few centimetres distance from your skin.</strong></br></br>Small metal objects come flying towards you. Defend against metal melee weapons or bullets at +4DR for the next ${resultSt}${d6.total}</strong> rounds.`
        break;
}

ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({token: actor}),
    content: result_html
});
