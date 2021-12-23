const fs = require('fs')
const path = require('path')
const csvtojsonV2 = require("csvtojson/v2")

const detectCharacterEncoding = require('detect-character-encoding');


const csvFilePath = path.resolve(__dirname, '../static/鲨鱼记账明细.csv')
const outputFilePath = path.resolve(__dirname, '../static/data2021.json')


const fileBuffer = fs.readFileSync(csvFilePath);
const charsetMatch = detectCharacterEncoding(fileBuffer);
console.log(charsetMatch);

function getJsonArray (csvFilePath) {
	return new Promise(resolve => {
		//Use async / await
		csvtojsonV2().fromFile(csvFilePath).then(function(jsonArrayObj){
			//when parse finished, result will be emitted here.
			resolve(jsonArrayObj)
		})
	})
}

getJsonArray(csvFilePath).then(jsonArrayObj => {
	console.log(jsonArrayObj)
	const data = jsonArrayObj.map(item => {
		const res = {
			date: item['日期'].replace(/[年|月]/g, '/').replace('日', ''),
			type: item['收支类型'],
			category: item['类别'],
			amount: Number(item['金额']),
			remark: item['备注'],
		}
		delete item['日期']
		delete item['收支类型']
		delete item['类别']
		delete item['金额']
		delete item['备注']
		return res
	})
	fs.writeFile(outputFilePath, JSON.stringify(data), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log("The file was saved!");
	});
})
