import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'


const router = express.Router()

router.post('/register', (req, res) =>{
    const { username, password } = req.body
    // hashed password
    const hashPassword = bcrypt.hashSync(password, 8)

    // save the new user and hashed password to the db 
    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`)
        const result = insertUser.run(username, hashPassword)

        // add thier first user todo for them 

        const defaultTodo = `Hello :) Add Your First todo !`
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
        insertTodo.run(result.lastInsertRowid, defaultTodo)

        // create a TOKEN JWT
        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })

    } catch (err){
        console.log(err.message)
        res.sendStatus(503)
    }


})

export default router


router.post('/login', (req, res) => {


    const { username, password } = req.body

    try{
        const getUser = db.prepare('SELECT  * FROM users WHERE username = ?')
        const user = getUser.get(username)
        // if user not associated logic
        if(!user) { return res.status(404).send( {message: "user not found"}) }
        // if the password doesn't match logic
        const passwordIsValid = bcrypt.compareSync(password, user.password)

        if (!passwordIsValid) { return res.status(401).send({ message: 'invalide password' }) }
        console.log(user)
        // then we have succ authentication 
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })

    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})