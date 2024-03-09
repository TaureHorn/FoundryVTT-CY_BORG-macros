let tier1 = await new Roll(`1d2`).roll()
let tier2 = await new Roll(`1d4`).roll()
let tier3 = await new Roll(`1d6`).roll()
let tier4 = await new Roll(`1d8`).roll()
let tier5 = await new Roll(`1d10`).roll()
const damage = [tier1.total, tier2.total, tier3.total, tier4.total, tier5.total]

damage.forEach(async (result, index) => {
    let total = incoming - result
    if (total < 0) { total = 0 }
    damage[index] = total
})

const resultSt = "<strong style='color: #f3e600'>"
const faded = "<span style='color: #999999'>"

let result_html =
    `<span>Target(s): ${targets}</span>
    <br>
    <table style="line-height:0.75">
        <thead>
            <tr>
                <th scope="col">ARMOR TIER</th>
                <th scope="col">DAMAGE</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td scope="row">1 ${faded}(d2)</span></td>
                <td>${resultSt}${damage[0]}</strong> ${faded}(${incoming}-${tier1.total})</span></td>
            </tr>
            <tr>
                <td scope="row">2 ${faded}(d4)</span></td>
                <td>${resultSt}${damage[1]}</strong> ${faded}(${incoming}-${tier2.total})</span></td>
            </tr>
            <tr>
                <td scope="row">3 ${faded}(d6)</span></td>
                <td>${resultSt}${damage[2]}</strong> ${faded}(${incoming}-${tier5.total})</span></td>
            </tr>
            <tr>
                <td scope="row">4 ${faded}(d8)</span></td>
                <td>${resultSt}${damage[3]}</strong> ${faded}(${incoming}-${tier4.total})</span></td>
            </tr>
            <tr>
                <td scope="row">5 ${faded}(d10)</span></td>
                <td>${resultSt}${damage[4]}</strong> ${faded}(${incoming}-${tier5.total})</span></td>
            </tr>
        </tbody>
    </table>`

const macro = game.macros.get("Ar7m9Ovo3SwVFhiJ")
const speak = await macro.execute({ message: result_html })

