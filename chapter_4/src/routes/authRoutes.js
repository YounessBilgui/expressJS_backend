import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'


const router = express.Router()

router.post('/register', async (req, res) =>{
    const { username, password } = req.body
    // hashed password
    const hashPassword = bcrypt.hashSync(password, 8)

    // save the new user and hashed password to the db 
    try {
        const user = await prisma.user.create({
            data:{
                username,
                password: hashPassword
            }
        })

        // add thier first user todo for them 

        const defaultTodo = `Hello :) Add Your First todo !`
        await prisma.todo.create({
            data:{
                task: defaultTodo,
                userId : user.id
            }
        })

        // create a TOKEN JWT
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })

    } catch (err){
        console.log(err.message)
        res.sendStatus(503)
    }


})
router.post('/login', async(req, res) => {


    const { username, password } = req.body

    try{
        const user = await prisma.user.findUnique({
            where:{
                username: username
            }
        })
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

export default router