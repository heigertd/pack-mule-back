const express = require("express");
const router = express.Router();
const db = require("../models")
const sequelize = require("sequelize");
const bcrypt = require('bcrypt');
const session = require('express-session')

router.get('/', (req, res)=>{
    res.send('controllers working')
});

router.get('/fakehikers', (req,res)=>{
    res.json(
        [
            {
                id:1,
                name: 'Travis Cox',
                hiker_type: 'Mule',
                fav_hikes: 'Lake 22',
                experience: 'Expert',
                fun_fact: 'I run a lot',
                email: 'cox69@asdf.com',
                username:'TravisC',
                password: '1234567890'
            },
            {
                id:2,
                name: 'Devin Heigert',
                hiker_type: 'Basic',
                fav_hikes: 'Lake 22',
                experience: 'Beginner',
                fun_fact: 'I dont run a lot',
                email: 'heigert69@asdf.com',
                username:'DevinH',
                password: '1234567890'
            },
            {
                id:3,
                name: 'James Evans',
                hiker_type: 'Basic',
                fav_hikes: 'Lake 22',
                experience: 'Beginner',
                fun_fact: 'I code a lot',
                email: 'evans69@asdf.com',
                username:'JamesE',
                password: '1234567890'
            },
        ]
    )
});

// router.route('/hikers').get((req, res)=>{
//     db.Hikers.findAll()
// }).then(res => {return res})

router.get('/api/hikers', (req,res)=>{
    if(req.session.user){
        db.Hikers.findAll({
            where:{
                hiker_type:'Mule'
            }
        }).then(hikers => res.json(hikers))
    }else{
        res.send('log in')
    }
})

router.get('/specifichiker/:id', (req,res) =>{
    db.Hikers.findOne({
        where:{
            id: req.params.id
        }
    }).then(hiker => res.json(hiker))
})

// router.get('/api/search', (req,res)=>{
//     console.log(req.body)
//     db.Hikers.find({
//         where:{
//             name: 'James'
//         }
//     }).then(hikers => res.json(hikers))
// })

router.post('/api/hikers', (req,res) =>{
    db.Hikers.create(req.body).then(hiker => {
        res.json(hiker)
    })
});

router.delete('/deletehiker/:id', (req,res) =>{
    // console.log(req)
    db.Hikers.destroy({
        where:{
            id: req.params.id
        }
    }).then(user =>{
        res.send('deleted')
    })
})

router.post('/login', (req,res)=>{
    db.Hikers.findOne({
        where:{
            username: req.body.username
        }
    }).then(dbHiker =>{
        if(!dbHiker){
            req.session.user = false;
            res.send('username')
        }else if(bcrypt.compareSync(req.body.password, dbHiker.password)){
            req.session.user = {
                id: dbHiker.id,
                name: dbHiker.name,
                hiker_type: dbHiker.hiker_type,
                fav_hikes: dbHiker.fav_hikes,
                experience: dbHiker.experience,
                fun_fact: dbHiker.fun_fact,
                email: dbHiker.email,
                username: dbHiker.username,
                password: dbHiker.password
            }
            res.json(req.session)
            // res.send('logged in')
        }else{
            req.session.user = false;
            res.send('password')
        }
    })
})

router.get('/signout', (req,res) =>{
    if(req.session){
        req.session.user = false
    }
    res.json(req.session)
})

router.put('/updatehiker/:id', (req,res)=>{
    console.log(req.body)
    db.Hikers.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(result =>{
        res.json(result)
    })
})

router.get('/readsessions', (req,res)=>{
    res.json(req.session)
})

module.exports = router;