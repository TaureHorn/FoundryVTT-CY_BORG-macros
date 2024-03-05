const targets = await new Roll(`1d4`).roll()
const r1_dmg = await new Roll(`1d4`).roll()
const r2_dmg = await new Roll(`1d8`).roll()
const r3_dmg = await new Roll(`2d10`).roll()
const r4_dmg = await new Roll(`2d10`).roll()

const nameSt = "<strong style='color:#B861ff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `${nameSt}NANO POWER:</br>
    Chill of the Void.</strong></br>
    Frost covers the area, snowflakes hang in the air. ${resultSt}${targets.total}</strong> targets are bitten by the cold over the next 4 rounds, taking damage if they do not pass a Toughness test.
    </br>
    <table>
        <thead>
            <tr>
                <th scope="col">ROUND</th>
                <th scope="col">TEST DR</th>
                <th scope="col">DMG</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td scope="row">1</td>
                <td>14</td> 
                <td>${resultSt}${r1_dmg.total}</strong></td>
            </tr>
            <tr>
                <td scope="row">2</td>
                <td>16</td> 
                <td>${resultSt}${r2_dmg.total}</strong></td>
            </tr>
            <tr>
                <td scope="row">3</td>
                <td>18</td> 
                <td>${resultSt}${r3_dmg.total}</strong></td>
            </tr>
            <tr>
                <td scope="row">4</td>
                <td>18</td> 
                <td>${resultSt}${r4_dmg.total}</strong></td>
            </tr>
        </tbody>
    </table>
`

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

