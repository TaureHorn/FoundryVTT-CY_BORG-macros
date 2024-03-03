const fate = await new Roll(`1d8`).roll()
const rounds = await new Roll(`1d4`).roll()
const hp = await new Roll(`1d4`).roll()
const bodypart = await new Roll(`1d20`).roll()
const death = await new Roll(`1d2`).roll()
const cyrage = await new Roll(`1d8`).roll()

const resultSt = "<strong style='color: white'>"

let bodypartDestroyed = ""
switch (bodypart.total) {
    case 1:
        bodypartDestroyed = "Forehead"
        break;
    case 2:
        bodypartDestroyed = "Eye"
        break;
    case 3:
        bodypartDestroyed = "Ear"
        break;
    case 4:
        bodypartDestroyed = "Jaw"
        break;
    case 5:
        bodypartDestroyed = "Throat"
        break;
    case 6:
        bodypartDestroyed = "Shoulder"
        break;
    case 7:
        bodypartDestroyed = "Upper arm"
        break;
    case 8:
        bodypartDestroyed = "Elbow"
        break;
    case 9:
        bodypartDestroyed = "Lower arm"
        break;
    case 10:
        bodypartDestroyed = "Hand"
        break;
    case 11:
        bodypartDestroyed = "Chest"
        break;
    case 12:
        bodypartDestroyed = "Spine"
        break;
    case 13:
        bodypartDestroyed = "Abdomen"
        break;
    case 14:
        bodypartDestroyed = "Hip"
        break;
    case 15:
        bodypartDestroyed = "Groin"
        break;
    case 16:
        bodypartDestroyed = "Thigh"
        break;
    case 17:
        bodypartDestroyed = "Knee"
        break;
    case 18:
        bodypartDestroyed = "Shin"
        break;
    case 19:
        bodypartDestroyed = "Foot"
        break;
    case 20:
        bodypartDestroyed = "Finger/toe"
        break;
}

let result_html = "<h1><strong>ZERO HP</strong></h1>"
switch (fate.total) {
    case 1:
    case 2:
        result_html += `You fall <strong>Unconscious</strong> for ${resultSt}${rounds.total}</strong> rounds, after which you will awaken with ${resultSt}${hp.total}</strong> hp.`
        break;
    case 3:
    case 4:
        result_html += `Test ${resultSt}Presence DR10</strong> with +1DR for every cybertech installed.
            </br></br>
            <strong>Success</strong> You fall unconscious for ${resultSt}${rounds.total}</strong> rounds, after which you will awaken with ${resultSt}${hp.total}</strong> hp.
            </br></br>
            <strong>Failure</strong> CY-RAGE!!! Temporarily gain ${resultSt}${cyrage.total}</strong> hp and attack random targets twice per round. Attacks DR10, defence DR14.`
        break;
    case 5:
    case 6:
        result_html += `Your ${resultSt}${bodypartDestroyed}</strong> is destroyed (<em>your choice of left or right if applicable</em>).
            </br></br>
            You are unable to act for ${resultSt}${rounds.total}</strong> rounds, after which you will awaken with ${resultSt}${hp.total}</strong> hp.`
        break;
    case 7:
        result_html += `You will be <strong>dead</strong> within ${resultSt}${death.total}</strong> hour(s) unless treated!</br></br>All tests are D16 in the first hour, DR18 in the second hour - if you can last that long.`
        break;
    case 8:
        result_html += `<h1 style="text-align: center">${resultSt}DEAD*</strong></h1><em>Unless you can pay</em>`
        break;
}

ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({ token: actor }),
    content: result_html
});
