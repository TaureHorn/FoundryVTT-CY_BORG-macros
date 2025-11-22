// AUTOMATICALLY CALLED TO MAKE THE NANO INFECTED SPARKLE IN BLACKLIGHTS
// ARGS tokenDoc = class tokenDocument

// EXIT IF NO TOKEN PROVIDED
if (typeof tokenDoc === 'undefined') return
if (typeof tokenDoc.actor === 'undefined') return

// GET NANO INFECTION STATE FROM TOKEN ACTOR FLAGS AND RETURN IF NOT INFECTED
if (
    !tokenDoc.actor.getFlag('world', 'nanoInfected') &&
    !tokenDoc.getFlag('world', 'nanoInfected')
) return

// GLOW EFFECT JSON
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

// GET ILLUMINATION STATE FROM TOKEN AND SET LIGHT AND FLAGS TO INVERSE
const flagName = this.name
const illuminated = tokenDoc.getFlag('world', flagName)?.state
const unilluminatedLight = tokenDoc.getFlag('world', flagName)?.previous

await tokenDoc.setFlag('world', flagName, {
	state: !illuminated,
	previous: illuminated ? unilluminatedLight : tokenDoc.light
})
tokenDoc.update({ light: illuminated ? unilluminatedLight : glow })

