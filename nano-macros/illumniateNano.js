// AUTOMATICALLY CALLED TO MAKE THE NANO INFECTED SPARKLE IN BLACKLIGHTS
// ARGS tokensArray = Array of [class tokenDocument]

// ARGUMENT AND MARCRO INPUT SANITISING //////////
if (typeof tokensArray === 'undefined') {
    if (canvas.tokens.controlled.length < 1) {
        return ui.notifications.warn(`${this.name}: You must either provide an array of tokenDocuments or select a token/s to effect`)
    } else {
        tokensArray = []
        for (const token of canvas.tokens.controlled) tokensArray.push(token.document)
    }
}

// NOT PROVIDED AN ARRY OF tokenDocuments WARN AND RETURN
if (tokensArray.constructor.name != 'Array') {
    return ui.notifications.warn(`${this.name}: You must provide an array of tokens or tokenDocuments`)
}

// IF PROVIDED ARRAY OF class Tokens EXTRACT class TokenDocument FROM THEM
if (tokensArray[0].constructor.name === 'Token') {
    let temptokenDoc = []
    for (const token of tokensArray) temptokenDoc.push(token.document)
    tokensArray = temptokenDoc
}


// GENERAL SETUP /////////////////////////////////

const glow = {
    alpha: 0.5,
    angle: 360,
    animation: {
        intensity: 10,
        reverse: false,
        speed: 10,
        type: 'ghost'
    },
    attenuation: 1,
    bright: 0,
    color: 'dc8add',
    coloration: 1,
    contrast: 1,
    dim: 0.25,
    luminosity: 1,
    saturation: 0,
    shadows: 0
}
const flagName = this.name

// GET ILLUMINATION STATE FROM TOKENS AND SET LIGHT AND FLAGS TO INVERSE
for await (const tk of tokensArray) {

    if (
        !tk.actor.getFlag('world', 'nanoInfected') &&
        !tk.getFlag('world', 'nanoInfected')
    ) continue

    const illuminated = tk.getFlag('world', flagName)?.state
    const unilluminatedLight = tk.getFlag('world', flagName)?.previous

    await tk.setFlag('world', flagName, {
        state: !illuminated,
        previous: illuminated ? unilluminatedLight : tk.light
    })
    tk.update({ light: illuminated ? unilluminatedLight : glow })

}

