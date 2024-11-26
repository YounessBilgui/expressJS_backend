const express = require('express')

const app = express()

const PORT = 8383

// METHOD 
app.get('/', (req, res) =>{
    console.log('yey i hit an endpoint' ,)
    res.sendStatus(200)
})

app.get('/dashboard', (req, res) =>{
    console.log('yey its a dashboard' ,)
    res.send('hi')
})


app.listen(PORT, () => console.log(`Server has started on : ${PORT}`))






