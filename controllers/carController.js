const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

const jwt = require('jsonwebtoken')

const showCars = (req,res) => {
   prisma.cars.findMany({}).then(result => {
        res.json(result)
    })
}

const registerNewCar = (req,res) => {

    console.log(req.headers.authorization)

    const token = req.headers.authorization

    if(!token) res.json({message:"You are not authorized!"}, 403)

    const auth = jwt.verify(token.split(' ')[1], 'superSecret1!@')

    if(!auth) res.json({message:"Token is not valid!"}, 401)

    const managerToken = auth.result

    if(managerToken.role !== 'Manager') res.json({message:"You are not authorized as a Manager to take this action!"}, 401)
    
    prisma.cars.create({
        data:{...req.body}
    }).then(result =>{
        res.json({message:'New car has been registered in showroom!'})
    }).catch(error=>{
        console.log(error)
        res.send('Error', 500)
    })
}

const buyCar = (req,res)=>{

    console.log(req.headers.authorization)

    const token = req.headers.authorization

    if(!token)  res.json({message:"You are not authorized!"}, 403)

    const auth = jwt.verify(token.split(' ')[1], 'superSecret1!@')

    if(!auth)  res.json({message:"Token is not valid!"}, 401)

    const id = req.params.id; 
    prisma.cars.delete({
        where: {id: Number(id)},
    }).then(result=>{
        res.json({message:'Car has been sold!'})
    })
}


module.exports = {showCars, registerNewCar, buyCar}