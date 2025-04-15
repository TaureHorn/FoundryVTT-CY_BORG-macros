game.socket.on('macro.sendPayment', async (data) => {
    console.log(data)
})

class BuildPayment extends FormApplication {

    static get defaultOptions() {
        const defaults = super.defaultOptions
        const customs = {
            classes: ['BuildPayemnt-app'],
            id: `BuildPayemnt-app-${game.userId}`,
            template: '0_CUSTOM/2_ASSETS/_code/macros/sendPayment/buildPayment.hbs',
            title: "BUILD PAYMENT"
        }
        return foundry.utils.mergeObject(defaults, customs)
    }

    getData() {
        return this.data = {
            users: game.users.filter(user => user.active === true && user.id !== game.userId)
        }
    }

    sendPayment(data) {
        return game.socket.emit('macro.sendPayment', {
            event: 'module.sendPayment',
            id: foundry.utils.randomID(8),
            users: data.recipients
        })
    }

    _updateObject(event, formData) {
        const paymentData = {
            payAmout: formData.payAmount.value,
            payee: formData.payeeName.value,
            recipients: []
        }
        if (typeof formData.recipient === 'object') {
          formData.recipient.forEach(user => paymentData.recipients.push(user))
        } else if (typeof formData.recipient === 'string') {
            formData.recipients.push(formData.recipient)
        }
        console.log(paymentData)
    }

}

const payBuilder = new BuildPayment()
payBuilder.render(true)

// const payBuilder = new Dialog({
//     buttons: {
//         submit: { 
//             label: "SUBMIT PAYMENT", 
//             callback: () => confirm() 
//         },
//         close: { 
//             label: "CANCEL",
//             callback: () => close()
//         }
//     },
//     content: game.users.filter(user => user.active === true),
//     default: "submit",
//     title: "BUILD PAYMENT",
//
//     close: (html, event) => {
//         (async () => {
//             event.preventDefault()
//             console.log('this is fine...')
//         })
//     }
// })

// const newOptions = {
//     closeOnSubmit: false,
//     template: '0_CUSTOM/2_ASSETS/_code/macros/sendPayment/buildPayment.hbs'
// }
//
// payBuilder.options = foundry.utils.mergeObject(payBuilder.options, newOptions)
// payBuilder.render(true)

globalThis.BuildPayemnt = BuildPayemnt

class SendPayment extends FormApplication {

    TEMPLATE = '0_CUSTOM/2_ASSETS/_code/macros/sendPayment/sendPayment.hbs'

    constructor(users, payInfo) {
        super()
        this._users = users
        this._payInfo = payInfo
    }

    static get defaultOptions() {
        const defaults = super.defaultOptions
        const customs = {
            classes: ['SendPayment-app'],
            closeOnSubmit: true,
            height: canvas.app.screen.width * 0.25,
            id: `SendPayment-app-${game.userId}`,
            popOut: false,
            minimizable: false,
            resizable: false,
            template: this.TEMPLATE,

            width: canvas.app.screen.width * 0.33
        }
        return foundry.utils.mergeObject(defaults, customs)
    }

    getData() {

    }

    _getHeaderButtons() {
        return []
    }

    render(...args) {
        super.render(...args)
        this.updateAppClasses()
    }

    updateAppClasses() {

    }


}

globalThis.SendPayment = SendPayment
