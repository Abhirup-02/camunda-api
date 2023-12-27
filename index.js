const app = require('express')()
const morgan = require('morgan');
const { default: axios } = require('axios')

app.use(morgan('tiny'))

axios.defaults.baseURL = 'http://localhost:8080'



app.get('/number', async (req, res) => res.json(1))
app.get('/letter', async (req, res) => res.json('a'))
app.get('/word', async (req, res) => res.json('Hello'))


app.get('/final', async (req, res) => {
    const res1 = axios.get('/number')
    const res2 = axios.get('/letter')
    const res3 = axios.get('/word')

    const [{ data: number }, { data: letter }, { data: word }] = await Promise.all([res1, res2, res3])

    res.status(200).json(number + " " + letter + " " + word)
})



app.listen(8080, () => {
    console.log('Server PORT -> 8080');
})