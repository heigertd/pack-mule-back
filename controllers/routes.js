const express = require("express");
const router = express.Router();
const db = require("../models")
const sequelize = require("sequelize");

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
    db.Hikers.findAll().then(hikers => res.json(hikers))
})

router.post('/api/hikers', (req,res) =>{
    db.Hikers.create(req.body).then(hiker => {
        res.json(hiker)
    })
})

module.exports = router;