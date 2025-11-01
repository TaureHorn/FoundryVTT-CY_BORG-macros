// RENDER INCOMING RCD MESSAGE FROM SOCKET

if (typeof content === 'undefined' || typeof bgCol === 'undefined' || typeof fgCol === 'undefined') {
	return ui.notifications.warn(`${this.name}: missing macro argument`)
}

const id = foundry.utils.randomID(8)

// MAKE CONTENT BOX
let box = `<div name="RCD_m_boundingBox" id="${id}" style="
					backdrop-filter: blur(5px);
					background-color: rgb(from ${bgCol} r g b / 15%);
					cursor: not-allowed;
					height: 100vh;
					position: absolute;
					width: 100vw;
				">
					<div name="RCD_m_contentBox" style="
						align-items: center;
						display: flex;
						flex-direction: column;
						left: 50%;
						position: absolute;
						top: 50%;
						transform: translate(-50%, -50%)
				  ">`


// IF IMAGE ADD TO TOP
if (typeof image === 'string') {
	box += `<img src="${image}" style="
					background-color: ${bgCol};
					border: 1px solid ${fgCol};
					cursor: auto;
					margin-bottom: -1px;
					max-height: 20em;
					max-width: 20em;
				" />`
}

// MAKE HTML FOR TEXT BOX
box +=	`<div style="
				border: 1px solid ${fgCol};
				background-color: ${bgCol};
				color: ${fgCol};
				cursor: auto;
				display: flex;
				flex-direction: row;
				gap: 1rem;
				font-size: 2em;
				padding: 0.5rem;
			">
				<span style="
                    text-align: justify
                ">${content}</span>
				<button id="${id}_close" style="
					background-color: ${fgCol};
					border: none;
					border-radius: 0px;
					line-height: inherit;
					width: fit-content;
				">
					<i class="fas fa-times" style="
						color: ${bgCol};
						font-size: 2em;
						font-weight: bold;
						line-height: inherit;
						margin: 0;
					"></i>
				</button>
				
			</div>
			</div>`


// ADD HTML TO DOM && ADD EVENT LISTENER FOR CLOSE BUTTON
$('body').append(box)
$(`#${id}_close`).on('click', ()=> {
	$(`#${id}`).remove()
})
