
// Displays a prompt which asks how much to reduce a tokens resource by
// Reduce the resource and updates the actor

let content = `
  <form>
    <div class="form-group">
      <label for="id="reduction-amount">Damage</label>
      <input id="reduction-amount" type="number" name="inputField" autofocus>
    </div>
  </form>`

new Dialog({
    title: 'How much would you like to reduce the tokens resource?',
    content: content,
    buttons: {
        yes: {
            icon: "<i class='fas fa-check'></i>",
            label: `Reduce resource`
        }
    },

    default: 'yes',

    close: html => {
        let result = html.find('input[name=\'inputField\']');
        if (result.val() !== '') {
            let reduction = result.val();
            let allSelected = canvas.tokens.controlled

            allSelected.forEach(selected => {

                let actor = selected.actor
                let ref = selected.document.bar2?.attribute.replace('.', '').split('.')
                const newItems = [...actor.items._source]

                let newResource = newItems.find((item) => item._id === ref[1])
                let newVal = newResource.system.uses.value - reduction
                let max = parseInt(newResource.system.uses.max)
                if (newVal < 0 ) {
                    newVal = 0
                }
                if (newVal > max) {
                    newVal = max
                }
                newResource.system.uses.value = newVal

                actor.update({'items._source': newItems})
            })
        }
    }
}).render(true);

(async () => {
    await new Promise(resolve => setTimeout(resolve, 20));
    let input = $('#damage-amount')
    input.focus();
})();

