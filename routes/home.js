const express= require('express');
const router= express.Router();
const football= require('../models/club');


////////////////// for read and display get and post routes///////////////////
router.get('/', (req, res)=>{
    football.find((err, docs)=>{
        res.render('home',{clubs:docs});
    });
});

router.post('/add', (req, res, next)=>{
    const club= req.body.name;
    const players= req.body.players;
    const coach= req.body.coach;

    const uclclub= new football({
        name:club,
        players:players,
        coach:coach,
    });
    uclclub.save((err)=>{
        if(err)
        {
            console.log('error in saving data');
        }
        else{
            console.log('data recorded successfully');
        }
        res.redirect('/');
    });
})
/////////////////////////////////////////////////////////////////

//////////// for edit get and post routes//////////////////////
router.get('/edit/:id', (req, res)=>{
    football.findOneAndUpdate({_id:req.params.id}, req.body, {new:true}, (err, docs)=>{
        if(err){
            console.log('error in updating data');
        }
        else{
            res.render('edit', {clubs:docs});
        }
    })
});

router.post('/edit/:id', (req,res)=>{
    football.findByIdAndUpdate({_id:req.params.id}, req.body, {new:true}, (err, docs)=>{
        if(err){
            console.log('error in updating data');
        }
        else{
            res.redirect('/');
        }
    });
});
//////////////////////////////////////////////////////////////

/////////////////for delete routes//////////////////

router.get('/delete/:id', (req, res)=>{
    football.findByIdAndDelete({_id: req.params.id}, (err)=>{
        if(err){
            console.log('error in deleting data');
        }
        else{
            res.redirect('/');
        }
    });
});

module.exports= router;