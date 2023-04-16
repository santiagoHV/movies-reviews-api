const express = require('express')
const router = express.Router()

router.use('/api/movies', require('./movies.routes'))
router.use('/api/auth', require('./auth.routes'))

router.get('/', (req, res) => {
    res.json({ response: 'working' })
})

module.exports = router