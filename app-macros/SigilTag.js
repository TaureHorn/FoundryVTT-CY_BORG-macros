const nameSt = "<strong style='color:#28ffff'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>SigilTag</strong></br>This location and nearby systems are tagged with your invisible sigil, enabling you to remotely activate Apps as if you were present. Only two locations can be tagged at the same time.`

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

