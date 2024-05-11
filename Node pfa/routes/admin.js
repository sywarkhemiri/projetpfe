const express = require('express');
const router = express.Router();
const Admin = require("../models/admin");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



//////////////////////SIGNUP
router.post('/registeradmin',async (req,res)=>{
    data=req.body;
    adm=new Admin(data);
    salt = bcrypt.genSaltSync(10);
    cryptedPass = await bcrypt.hashSync(data.pwd , salt);
    adm.pwd=cryptedPass;
    adm.save()
    .then(
        (saved)=>{
            res.status(200).send(saved)
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }

    )


})

/////////////////////////LOGIN
router.post('/loginadmin', async (req, res) => {
    try {
        const data = req.body;
        const admin = await Admin.findOne({ adress: data.adress });

        if (!admin) {
            return res.status(404).send('email or password invalid !');
        }

        const validPass = bcrypt.compareSync(data.pwd, admin.pwd);

        if (!validPass) {
            return res.status(401).send('email or password invalid !');
        }

        const payload = {
            _id: admin._id,
            adress: admin.adress,
            nom: admin.nom
        
        };

        const token = jwt.sign(payload, '123456789');
        return res.status(200).send({ mytoken: token });
    } catch (err) {
        return res.status(500).send(err);
    }
});


///////////////////
router.delete('/delad/:id',async(req,res)=>{
    
    try{
        id= req.params.id;
        deletedUser =await Admin.findByIdAndDelete({_id: id})
                res.send(deletedAdmin);
            
        }
    
        catch
            (err){
                res.send(err)
            }
         } )

module.exports = router;

