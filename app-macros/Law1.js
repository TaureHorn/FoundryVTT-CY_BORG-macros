const nameSt = "<strong style='color:#28ffff'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>Law1</strong></br>Parallaxes imagery around you, making you invisible to all tech (except true AI) for 10 minutes.`

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

