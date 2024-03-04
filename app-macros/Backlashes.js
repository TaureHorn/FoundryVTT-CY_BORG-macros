const fate = await new Roll(`1d20`).roll()
const blackIce = await new Roll(`2d10`).roll()
const minorBlackIce = await new Roll(`2d6`).roll()
const d3 = await new Roll(`1d3`).roll()
const d3_2 = await new Roll(`1d3`).roll()
const d4 = await new Roll(`1d4`).roll()
const d6 = await new Roll(`1d6`).roll()
const d10 = await new Roll(`1d10`).roll()
const d12 = await new Roll(`1d12`).roll()

const nameSt = "<strong style='color:#28ffff'>"
const resultSt = "<strong style='color: white'>"

let result_html = `<h1>${nameSt}APP BACKLASH</strong></h1>`
switch (fate.total) {
    case 1:
        result_html += `Black ice left behind by an unidentified entity hits you for ${resultSt}${blackIce.total}</strong> damage and burns your deck. It requires a workshop and a <strong>Knowledge DR14</strong> test to fix.`
        break;
    case 2:
        result_html += `An unknown hacker begins tracing and interfering with you; +3 risk of App fumble and +2DR on all App activities or use of other connected technology for ${resultSt}${d6.total}</strong> days.`
        break;
    case 3:
        result_html += `The App you were trying to activate explodes, destroying both the App and a slot in your deck.`
        break;
    case 4:
        result_html += `A SecCorp activates a Ghost targeting you. It arrives in ${resultSt}${d4.total}</strong> minutes.`
        break;
    case 5:
        result_html += `A minor EMP triggers, and all tech within 15m malfunctions for ${resultSt}${d4.total}</strong> rounds.`
        break;
    case 6:
        result_html += `You're flagged for suspicious activity. All further tests to use Apps or get through a security check are +2DR unitl you either get rid of it yourself by spending ${resultSt}${d6.total * 10}</strong> minutes and pass a DR14 Knowledge test, or by waiting 48 hours without using any App or other suspicious Net activity.`
        break;
    case 7:
        result_html += `A power surge causes all lights within 30m to flicker and then explode. Everyone nearby takes ${resultSt}${d4.total}</strong> damage.`
        break;
    case 8:
        result_html += `You run into a booby trap, triggering an alarm and shorting out your deck. You take ${resultSt}${d6.total}</strong> damage and need to reboot and rejack to be able to use any tech again.`
        break;
    case 9:
        result_html += `A mistake causes a loopback, and you successfully use the App but with the wrong target or a reverse effect. The exact details are up to the GM.`
        break;
    case 10:
        result_html += `You are ID'd by a hacker collective. They ask for ${resultSt}${d10.total}kC</strong> in 72 hours or they will post real or fabricated incriminating data of you and your friends for everyone to see.`
        break;
    case 11:
        result_html += `A feedback buzz hits you for ${resultSt}${d6.total}</strong> damage, blinding you for ${resultSt}${d4.total}</strong> rounds as one of your eyeballs boils in its socket.`
        break;
    case 12:
        result_html += `Feedback hits you for ${resultSt}${d3.total}</strong> damage. Unknown to you, dangerous data is also copied to your deck, and several people or organisations are willing to kill to get hold of that data. They will know who you are when you next use an App.`
        break;
    case 13:
        result_html += `Your RCD is corrupted. Real and unreal items glitch in and out of existence. Any test relying on sight is +4DR for ${resultSt}${d4.total}</strong> hours or until you can get 10 minutes of uninterrupted concentration.`
        break;
    case 14:
        result_html += `A virus gets inside your deck and destroys 2 empty slots in it. If no slots are empty, a random App is destroyed instead.`
        break;
    case 15:
        result_html += `Your deck and RCD both freeze, and you are unable to act for one round. Millions of spam messages have been sent out in your name. You are blocked from all communication channels until you replace you deck and pay a ${resultSt}${d6.total}kC</strong> fine.`
        break;
    case 16:
        result_html += `${resultSt}${d4.total}</strong> sleeper Doppels are activated with you are their target. The will strike in hours, days or maybe even weeks from now.`
        break;
    case 17:
        result_html += `Nearby devices shoot bolts of electricity, dealing ${resultSt}${d12.total}</strong> damage to anyone in the room who fails a Toughness DR14 test. This goes on for ${resultSt}${d6.total}</strong> minutes.`
        break;
    case 18:
        result_html += `Everything your RCD has picked up in the last 2.3 seconds is broadcasted to all monitors, screens, RCDs, etc within 500m.`
        break;
    case 19:
        result_html += `Black ice hits you for ${resultSt}${minorBlackIce.total}</strong> damage, sending you into convulsions for ${resultSt}${d6.total}</strong> rounds. Test Presence DR14 or lower your Presence by -1.`
        break;
    case 20:
        switch (d3.total) {
            case 1:
                result_html += `You stumble upon an extrinsic presence, perhaps an AI or something worse. It speaks to you in a language you cannot understand or record; you are unable to act for ${resultSt}${d4.total}</strong> rounds.`
                break;
            case 2:
                result_html += `You stumble upon an extrinsic presence, perhaps an AI or something worse. It shrieks, and your deck explodes, dealing ${resultSt}${d6.total}</strong> damage to you and ${resultSt}${d3_2.total}</strong> nearby targets.`
                break;
            case 3:
                result_html += `You stumble upon an extrinsic presence, perhaps an AI or something worse. It possess you and your deck. All tech/App-related rolls are -2DR for ${resultSt}${d6.total}</strong> rounds. From this moment, you and it are one. You see the sidewalk cracks connect into strange symbols, the ads flicker in repeating patterns and the Net artifacts spell out cyphered code. It is a countdown. You're not supposed to see it.`
                break;
        }
        break;
}

ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({token: actor}),
    content: result_html
});
