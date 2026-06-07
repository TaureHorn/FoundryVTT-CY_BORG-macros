// SETOPTS
const colorOpts = [
	"#000000",
	"#aa0000",
	"#ff5c00",
	"#00ff00",
	"#0000ff",
]
const timeInterval = 500

// ADD TRACKER FOR ACTIVE INTERVAL
if (typeof activeBgChanger === 'undefined') globalThis.activeBgChanger = false

// EXECUTE
if (activeBgChanger) {
	activeBgChanger = false
	clearInterval(bgChanger)
} else {
	activeBgChanger = true
	globalThis.bgChanger = setInterval(async () => {
		await game.scenes.current.update({
			backgroundColor: colorOpts[Math.floor(Math.random() * colorOpts.length)]
		})
	}, timeInterval)
}
