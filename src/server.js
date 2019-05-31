const express = require('express')
const cors = require('cors')
const _ = require('lodash')
const app = express()

const { users } = require('./../mock/users.json')

app.use(cors())

app.get('/api/users', (req, res) => {
    const { id, name, limit = 5 } = req.query

    if (_.every([id, name], item => item === undefined)) {
        return res.json({ users: users.slice(0, limit) })
    }

    res.json({
        users: _.filter(users, user => {
            const id = _.toUpper(_.get(req, 'query.id', ''))
            const name = _.toUpper(_.get(req, 'query.name', ''))
            const checkId = _.includes(_.toUpper(user.id), id)
            const checkName = _.includes(_.toUpper(user.name), name)
            return checkId && checkName
        })
    })
})

app.listen(3030, () => console.log('app start @ port 3030'))