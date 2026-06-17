export default async function handler(req, res) {
  try {
    const url = process.env.SHEET_URL
    if (!url) return res.status(500).send('SHEET_URL not configured')

    const r = await fetch(url, { redirect: 'follow' })
    if (!r.ok) return res.status(502).send('upstream error')

    const text = await r.text()
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.setHeader('Cache-Control', 'no-store, max-age=0')
    res.status(200).send(text)
  } catch (e) {
    res.status(500).send('fetch error')
  }
}
