const nameSt = "<strong style='color:#28ffff'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>Borgtrigga-0.5</strong></br>Provoke a Cy-rage test for one nearby target.`

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

