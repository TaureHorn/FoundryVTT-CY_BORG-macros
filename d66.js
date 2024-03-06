const tens = await new Roll(`1d6`).roll()
const ones = await new Roll(`1d6`).roll()

const result_html =
    `<div class="dice-roll"> 
        <div class="dice-result">
            <div class="dice-formula">D66</div>
            <div class="dice-total">${tens.total}${ones.total}</div>
        </div>
    </div>`


const macro = game.macros.get("bsiTa8xf6eTMONFt")
const speak = await macro.execute({ message: result_html })

