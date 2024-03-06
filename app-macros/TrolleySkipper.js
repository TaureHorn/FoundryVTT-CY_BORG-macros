const nameSt = "<strong style='color:#28ffff'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>TrolleySkipper</strong></br>Automated defences have trouble tracking a person of your choice and prioritise other available targets.`

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

