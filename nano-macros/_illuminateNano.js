// AUTOMATICALLY CALLED TO MAKE THE NANO INFECTED SPARKLE IN BLACKLIGHTS
// ARGS tokenDoc = class tokenDocument

// EXIT IF NO TOKEN PROVIDED
if (typeof tokenDoc === 'undefined') return
if (typeof tokenDoc.actor === 'undefined') return

// GET NANO INFECTION STATE FROM TOKEN ACTOR FLAGS AND RETURN IF NOT INFECTED
if (!tokenDoc.actor.getFlag('world', 'nanoInfected')) return

// GLOW EFFECT JSON
const glow = {
	alpha: 0.5,
	angle: 360,
	animation: {
		intensity: 5,
		reverse: false,
		speed: 4,
		type: 'fairy'
	},
	attenuation: 1,
	bright: 0.25,
	coloration: 1,
	contrast: 0,
	dim: 0.5,
	luminosity: 0.75,
	saturation: 1,
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

