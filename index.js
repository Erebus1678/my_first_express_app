import express from 'express';
import chalk from 'chalk';
import { addNote, getNotes, removeNote } from './notes.controller.js'
import path from 'node:path'


const port = 5000;

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('./public'))

app.get('/', async (req, res) => {
    res.render('index', {
        title: 'Express app',
        notes: await getNotes(),
        created: false
    })
})
app.post('/', async (req, res) => {
    await addNote(req.body.title)
    res.render('index', {
        title: 'Express app',
        notes: await getNotes(),
        created: true
    })
})
app.delete('/:id', async (req, res) => {
    await removeNote(req.params.id)
    res.render('index', {
        title: 'Express app',
        notes: await getNotes(),
        created: false
    })
})

app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port - ${port}`))
})