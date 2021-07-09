var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

const moduleSchema = new mongoose.Schema({
  name: String,
  fields: {
    type: Array,
    required: true
  }
});
const Module = mongoose.model('Module', moduleSchema, 'modules');
/* GET users listing. */
router.get('/', function(req, res, next) {
  Module.find({})
      .then(data=>{
        res.json(data);
      })
  // res.send('respond with a resource');
});
router.get('/module', function(req, res, next) {
  Module.findOne({name:{$eq:req.query['mod']}})
      .then(async data=>{
        fields = {}
        data['fields'].forEach(item=>{
          fields[item['name']] = {}
          for(let key of Object.keys(item)){
            if(key!=='name'){
              fields[item['name']][key] = item[key]
            }
          }

        })
        console.log(mongoose.models[data['name']]);
          let model = null;
          if(data['name'] in mongoose.models){
              model = mongoose.models[data['name']]
          }else {

              const schema = new mongoose.Schema(fields);
              model = mongoose.model(data['name'], schema);
          }

        let response = await model.find({})
          res.json(response)
        // res.json(data);
      })
  // res.send('respond with a resource');
});
router.post('/module', async function(req, res, next) {
    // console.log(req.body)
    fields = {}
    if('data' in req.body){
        for(let field of Object.keys(req.body.data)){
            if(typeof  req.body.data[field]==='object'){
                fields[field] = Array.isArray(req.body.data[field])?'Array':'Map'
            }else {
                fields[field] = typeof req.body.data[field]
            }
        }
    }
    console.log(mongoose.models[req.body['module']]);
    let model = null;
    if(req.body['module'] in mongoose.models){
        model = mongoose.models[req.body['module']]
    }else {
        await Module.create({name:req.body['module'],fields})
        const schema = new mongoose.Schema(fields);
        model = mongoose.model(req.body['module'], schema);
    }
    let response = await model.create(req.body['data'])
    res.json(response)
    // res.send('respond with a resource');
});
router.post('/', async function(req, res, next) {
  await Module.create(req.body);
  res.json({'message':'respond with a resource'});
});
router.delete('/:id', async function(req, res, next) {

  const module = await Module.findOne({_id:req.params['id']});
  await module.delete()
  res.json({'message':'respond with a resource'});
});

module.exports = router;
