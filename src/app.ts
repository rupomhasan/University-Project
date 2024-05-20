import express, { Application, Request, Response } from 'express'
import { StudentRoutes } from './app/Modules/Student/student.router';
import cors from 'cors'

const app: Application = express()


// parser
app.use(express.json())
app.use(cors())

// query
app.use('/api/v1/students', StudentRoutes)

app.get('/', (req, res) => {

    res.send('hello')
})



export default app; 