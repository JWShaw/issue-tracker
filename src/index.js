const app = require('./app')
const path = require('path')

// If in production, serve up the frontend
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '..', 'pubic')))

//     app.get('*', (req, res) => res.sendFile('../public/index.html'))
// }

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server is up on Port ' + port)
})