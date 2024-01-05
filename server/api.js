const express = require('express')
const app = express.Router()
const {client} = require('./db')

app.put('/things/:id', async(req, res, next) => {
    try {
        const SQL = `
            UPDATE things
            SET user_id = $1, name = $2
            WHERE id = $3
            RETURNING *
        `
        const response = await client.query(SQL, [req.body.user_id, req.body.name, req.params.id])
        res.send(response.rows[0])
    } catch (error) {
        next(error)
    }
})

app.get('/users', async(req, res, next) => {
    try {
        const SQL = `
            SELECT *
            FROM users
        `
        const response = await client.query(SQL)
        res.send(response.rows)

    } catch (error) {
        next(error)
    }
})

app.get('/things', async(req, res, next) => {
    try {
        const SQL = `
            SELECT *
            FROM things
            ORDER BY name
        `
        const response = await client.query(SQL)
        res.send(response.rows)

    } catch (error) {
        next(error)
    }
})

module.exports = app