import retrieveContent from './query.js'
import '../scss/app.scss'

async function showContent () {
  try {
    const content = await retrieveContent()

    const elt = document.createElement('div')
    elt.innerHTML = content.join('<br />')

    document.getElementsByTagName('body')[0].appendChild(elt)
  } catch (e) {
    console.log('Error', e)
  }
}

showContent()
