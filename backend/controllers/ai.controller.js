const {aiServices} = require('../services/ai.service');


const getResult = async(req,res)=>{
    try {
        const {prompt} = req.query;
        const result = await aiServices.generateResult(prompt);
        res.send(result);
    } catch (error) {
        res.status(500).send({message:error.message});
    }
}

const aiController = {getResult};

module.exports = {aiController};