const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

const showUsers = (req,res) => {
    prisma.users.findMany().then(result=>{
        res.json(result)
    })
}

const registerNewUsers = (req,res) => {
    console.log(req.headers.authorization)

    const token = req.headers.authorization;

    if(!token) res.json({message:"You are not authorized to register new Users!"}, 403);

    const auth = jwt.verify(token.split(' ')[1], 'superSecret1!@');

    if(!auth) res.json({message:"Token is not valid!"}, 401);

    const managerToken = auth.result

    if(managerToken.role !== 'Manager') res.json({message:"You are not authorized to take this action!"});
    
    prisma.users.create({
        data:{...req.body}
    }).then(result =>{
        res.json({message:'New user has been registered in showroom!'})
    }).catch(error=>{
        console.log(error)
        res.send('Error', 500)
    })
}

const deleteUser = (req,res) => {
    console.log(req.headers.authorization)

    const token = req.headers.authorization

    if(!token) res.json({message:'You are not authorized to delete Users!'}, 403);

    const auth = jwt.verify(token.split(' ')[1], 'superSecret1!@')

    if(!auth) res.json({message:'Token is not valid!'}, 401)

    const managerToken = auth.result;

    if(managerToken.role !== 'Manager') res.json({message:'You are not authorized as a Manager to delete users!'})
    
    const id = req.params.id;
    prisma.users.delete({
        where: {id: Number(id)},
    }).then(result=>{
        res.json({message:'User has been deleted!'})
    })
}

const loginUser = (req,res)=>{
    prisma.users.findUnique({ where: {email: req.body.email}}).then(result=>{
        if(result === null) res.json({message:"There is no user with this email address registered!"}, 404)
        const token = jwt.sign({result}, 'superSecret1!@',{expiresIn:'1h'})
        res.json(token)
    }).catch(err=>{
        console.log(err)
        res.json(err, 501)
    })
}

module.exports = {showUsers, registerNewUsers, deleteUser, loginUser}