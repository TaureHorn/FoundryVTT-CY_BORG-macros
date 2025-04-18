// ARGS: 1: path String, selector String.

if (typeof path === 'undefined') {
    return ui.notifications.error(`${this.name}: did not receive a path as one of its arguments`)
}

if (typeof selector === 'undefined') {
    return ui.notifications.error(`${this.name}: did not recieve a selector as one of its arguments`)
}

console.log(this.name, 'path', path, 'selector', selector)

// DEFINE STYLES
const styles = {
    [selector]: $(`<style>${selector} {
			backdrop-filter:blur(5px);
			background-color:rgba(0,0,0,0.5);
			border:none;
			cursor:zoom-out;
			display:flex;
			height:100vh;
			position:absolute;
			width:100vw;
			z-index:998;
		}
	</style>`),
    [`${selector}-video`]: $(`<style>${selector}-video {
			border: 1px solid #cccccc;
			cursor: pointer;
			height:80vh;
			margin:auto;
			z-index:999;
		}
	</style>`)
}

function cssClassExists(selector) {
    let exists = false
    const styles = document.styleSheets
    for (const sheet of styles) {
        for (const rule of sheet.rules) {
            if (rule.selectorText === selector) {
                exists = true
                break
            }
        }
    }
    return exists
}

for (const style in styles) {
    const alreadyExists = cssClassExists(style)
    if (!alreadyExists) $(styles[style]).appendTo('head')
}

// DEFINE HTML
const id = selector.replace('.', '')
$(`<div id=${id} class="${id}">
		<video class="${id}-video" src="${path}" controls="">
		</video>
	</div>
`).appendTo('body')
$(`#${id}`).on('click', () => $(`#${id}`).remove())

