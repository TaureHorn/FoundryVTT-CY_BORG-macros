const d66 = await new Roll(`1d36`).roll()
const d2 = await new Roll(`1d2`).roll()
const d4 = await new Roll(`1d4`).roll()
const d6 = await new Roll(`1d6`).roll()
const d10 = await new Roll(`1d10`).roll()

const nameSt = "<strong style='color: #f3e600'>"
let result_html = `<h3>${nameSt}pocket lint</strong></h3>`

let credstick = `A credstick containing `
switch (d66.total) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
        result_html += `<em>Nothing...</em>`
        break;
    case 7:
        result_html += `Broken shiv. Take 2 damage`
        break;
    case 8:
        result_html += `Idol of a horned god dipped in blood`
        break;
    case 9:
        result_html += `VIP card to an exclusive Ports club`
        break;
    case 10:
        result_html += `Keycard to a nearby door`
        break;
    case 11:
        result_html += `Dive-bar matchbox containing teeth from four different people`
        break;
    case 12:
        let data = `Stolen data. `
        let sell = `Sells for ${d6.total}kC to a data broker`
        let evidence = `Evidence of a moderately famous CEO's highly illegal activities`
        switch (d6.total) {
            case 1:
            case 2:
                data += sell
                break;
            case 3:
            case 4:
                data += evidence
                break;
            case 5:
                let encrypted = ``
                switch (d4.total) {
                    case 1:
                    case 2:
                        encrypted += `Encrypted. ${sell}`
                        break;
                    case 3:
                    case 4:
                        encrypted += `Encrypted. ${evidence}`
                        break;
                }
                data += encrypted
                break;
            case 6:
                let corrupted = ``
                switch (d4.total) {
                    case 1:
                    case 2:
                        corrupted += `Corrupted. ${sell}`
                        break;
                    case 3:
                    case 4:
                        corrupted += `Corrupted. ${evidence}`
                        break;
                }
                data += corrupted
                break;
        }
        result_html += data
        break;
    case 13:
        let mixtape = `A mixtape. Its `
        switch (d6.total) {
            case 1:
            case 2:
                mixtape += `absolute shite`
                break;
            case 3:
            case 4:
                mixtape += `oversampled`
                break;
            case 5:
                mixtape += `hot`
                break;
            case 6:
                mixtape += `truly hot`
                break;
        }
        result_html += mixtape
        break;
    case 14:
        result_html += `Snot stained napkin. Test Toughness DR12 or get sick. +2DR on all Strength, Toughness and Presence tests for ${d4.total} days starting tomorrow morning`
        break;
    case 15:
        result_html += `Promotional ad: '1 free taxi ride'`
        break;
    case 16:
        result_html += `Wrapped BugGrub burger`
        break;
    case 17:
        result_html += `Contract to kill an associate of the PCs`
        break;
    case 18:
        result_html += `Mirrorshades`
        break;
    case 19:
        let note = `Folded note with the address of an unmarked slums door leading to a `
        switch (d6.total) {
            case 1:
            case 2:
                note += `fetish club`
                break;
            case 3:
            case 4:
                note += `drug den`
                break;
            case 5:
            case 6:
                note += `temple of an anti-human death cult`
                break;
        }
        result_html += note
        break;
    case 20:
        let id = `Adaptable fake ID. `
        switch (d6.total) {
            case 1:
                id += `Its very well made`
                break;
            case 2:
            case 3:
            case 4:
            case 5:
                id += `Its decent but won't pass a thorough inspection`
                break;
            case 6:
                id += `A substanital reward is offered to bring in the person; mercs are already on the trail`
                break;
        }
        result_html += id
        break;
    case 21:
        result_html += `Viral memstick, test Knowledge DR14 or suffer:</br><strong>If read using an RCD</strong>, +2DR on sight-based skill tests until RCD is replaced or repaired</br><strong>If a deck was used</strong>, one slot and any loaded App therein is burned forever`
        break;
    case 22:
        result_html += `Superlube`
        break;
    case 23:
        result_html += `Pocket flask of booze spiked with Sunset Chalk`
        break;
    case 24:
        result_html += `Dime of pure, real tobacco`
        break;
    case 25:
        result_html += `3 doses of unmarked (random) drugs`
        break;
    case 26:
        result_html += `Coupon for 25% off at Citadel Ammo`
        break;
    case 27:
        result_html += `Severed finger in a plastic bag`
        break;
    case 28:
        result_html += `Crudely drawn map to a G0 location marked "cache"`
        break;
    case 29:
        result_html += `Synthetic snuff`
        break;
    case 30:
        result_html += `Cult pamphlet announcing a ritual celebration for the coming night`
        break;
    case 31:
        result_html += `${credstick} ${d2.total * 10}C`
        break;
    case 32:
        result_html += `${credstick} ${d6.total * 10}C`
        break;
    case 33:
        result_html += `${credstick} ${d10.total * 10}C`
        break;
    case 34:
        result_html += `${credstick} ${d2.total * 100}C`
        break;
    case 35:
        result_html += `${credstick} ${d6.total * 100}C`
        break;
    case 36:
        result_html += `${credstick} ${d10.total * 100}C`
        break;
}

game.user.hasRole("GAMEMASTER") ?
    ChatMessage.create({
        user: game.user._id,
        speaker: ChatMessage.getSpeaker({ token: actor }),
        content: result_html,
        whisper: game.users.filter(u => u.isGM)
    })
    :
    ChatMessage.create({
        user: game.user._id,
        speaker: ChatMessage.getSpeaker({ token: actor }),
        content: result_html,
    });

