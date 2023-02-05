const express = require('express')
const app = express()

const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

app.use(express.json())

const carRouters = require('./Routers/cars');
const userRouters = require('./Routers/users');

app.use('/api/cars', carRouters);
app.use('/api/users', userRouters);

app.listen(3320);