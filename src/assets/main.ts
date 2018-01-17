import './style.styl'

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

// init
{
  let name = parseQuery(location.search.slice(1))['name'] || ''
  if (!name) {
    if (process.env.NODE_ENV === 'production') {
      location.href = 'http://forum.longquanzs.org/forum.php?mod=forumdisplay&fid=538&mobile=2'
    }
  }
  name = escapeHtml(name.substr(0, 15))
  console.log(name)
}
