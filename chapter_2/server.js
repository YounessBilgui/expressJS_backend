const express = require('express')

const app = express()

const PORT = 8383

let data = {
    name: 'james',
    age : 12,
}

// METHOD WEB SITE END POINT
app.get('/', (req, res) =>{
    res.send('<h1>Home</h1>')
})

app.get('/dashboard', (req, res) =>{

    res.send('<h1>Dashboard</h1>')
})


// METHOD API END POINTS


app.get('/api/data', (req, res) => {
    res.send(data)
})

app.listen(PORT, () => console.log(`Server has started on : ${PORT}`))






