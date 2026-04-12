import http from 'http'

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/products?category=tshirts',
  method: 'GET'
}

const req = http.request(options, res => {
  let data = ''
  res.on('data', chunk => {
    data += chunk
  })
  res.on('end', () => {
    console.log('Response:', JSON.stringify(JSON.parse(data), null, 2))
  })
})

req.on('error', error => {
  console.error('Error:', error.message)
})

req.end()
