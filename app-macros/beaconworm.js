const weeks = await new Roll(`1d4`).roll()

const nameSt = "<strong style='color:#28ffff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>beaconworm</strong></br>Place a tracker into a device or cybertech, enabling you to track its movements in real-time for the coming ${resultSt}${weeks.total}</strong> weeks.`

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

