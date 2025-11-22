// AUTOMATICALLY CALLED TO MAKE THE NANO INFECTED SPARKLE IN BLACKLIGHTS

// EXIT IF NO TOKEN PROVIDED
if (typeof token === 'undefined') return
if (typeof token.actor === 'undefined') return

// GET NANO INFECTION STATE FROM TOKEN ACTOR FLAGS AND RETURN IF NOT INFECTED
const infected = token.actor.getFlag('world', 'nanoInfected')
if (!infected) return

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

// GET STATE ILLUMINATION STATE FROM TOKEN AND SET LIGHT AND FLAGS TO INVERSE
const flagName = this.name
const illuminated = token.document.getFlag('world', flagName)?.state
const unilluminatedLight = token.document.getFlag('world', flagName)?.previous

await token.document.setFlag('world', flagName, { 
	state: !illuminated, 
	previous: illuminated ? unilluminatedLight : token.light
})
await token.document.update({ light: illuminated ? unilluminatedLight : glow })
