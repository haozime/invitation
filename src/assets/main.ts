import './style.styl'
import { Base64 } from 'js-base64'

function decode (s) {
  try {
    s = decodeURIComponent(s)
  } catch (e) {/**/}
  return s
}

function parseQuery (queryStr) {
  let ret = {}
  queryStr.split('&').filter(Boolean).map(item => {
    let [key = '', value = ''] = item.split('=')
    ret[key.trim()] = decode(value.trim())
  })
  return ret
}

function escapeHtml (s) {
  return s.replace(/&/g, '&amp;')
          .replace(/'/g, '&#39;')
          .replace(/"/g, '&quot;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\//g, '&#x2f;')
}
function $ (s): HTMLElement | null {
  return document.getElementById(s)
}

// init
{
  let audio = $('bgm') as HTMLAudioElement
  audio.oncanplay = () => {
    audio.play()
  }

  document.addEventListener('touchstart', () => {
    audio.play()
  }, false)

  let name = parseQuery(location.search.slice(1))['id'] || ''
  if (!name) {
    if (process.env.NODE_ENV === 'production') {
      location.replace('http://forum.longquanzs.org/forum.php?mod=forumdisplay&fid=538&mobile=2')
    }
  }
  name = Base64.decode(name)
  name = escapeHtml(name)
  document.title = `邀请函 —— 送呈${name}`
  let $name = $('name') as HTMLElement
  $name.innerText = name
}
