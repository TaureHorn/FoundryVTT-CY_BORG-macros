
let form =
    `<form class="dialog"
        <div clas="form-group">
            <label for="splash-text">Chapter title</label>
                <input type="text" id="splash-text" name="splash-text" placeholder="...">
        </div>
    </form> `

new Dialog({
    title: "SPLASH TEXT",
    content: form,
    buttons: {
        submit: { label: "SUBMIT", callback: () => confirmed = true },
        cancel: { label: "CANCEL", callback: () => confirmed = false }
    },
    default: "submit",

    close: html => {
        (() => {
            if (confirmed) {

                console.log(html)

                let options = {
                    actor: game.actors.get('SbgN0j3susgYioC5'),
                    sound: null,
                    colorFirst: '#000000',
                    colorSecond: '#000000',
                    colorThird: '#000000',
                    colorFont: '#ffffff',
                    subColorFont: null,
                    colorShadow: null,
                    subColorShadow: null,
                    message: html.find('#splash-text')[0].value,
                    subText: null,
                    fontFamily: 'PPM Extended Black',
                    fontSize: '48px',
                    subFontSize: null,
                    actorImg: null,
                    timer: 5000,
                    animationDuration: 5000,
                    animationDelay: 0,
                    video: null,
                    fill: false,
                    close: null
                };

                game.bossSplash.splashBoss(options);

            }
        })();
    }

}).render(true)

