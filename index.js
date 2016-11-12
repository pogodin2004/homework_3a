var express = require('express');
var fetch = require('isomorphic-fetch');


const app = express();
let pc;

fetch('https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json').then(res=>res.json()).then(json=>pc=json)

app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/:par0?/:par1?/:par2?/:par3?/:par4?',(req,res) => {
	if(!req.params.par0) res.json(pc)
	if(req.params.par0 == 'volumes') res.send(volumes(pc.hdd))
	var paramsArr = Object.keys(req.params).filter(el=>!!req.params[el]).map(el=>req.params[el].toLowerCase().trim());
	res.json(getByParams(pc,paramsArr,res));
});

app.listen(3000, () => {
	console.log(`Ready? Go!!!`);
});

function volumes(arr){
	var out = arr.reduce((rez,{volume,size})=>(rez[volume] = !rez[volume]? size : rez[volume]+size , rez ),{});
	Object.keys(out).forEach(el=>out[el]+='B')
	return out
}

function getByParams(obj,params,res){
	var out = obj[params[0]];
	if(typeof out == 'undefined') return res.status(404).send('Not found')
	for(var i = 1 ; i< params.length ; i++){
		out = out[params[i]]
		if(typeof out == 'undefined') return res.status(404).send('Not found')
	}
	return out
}
