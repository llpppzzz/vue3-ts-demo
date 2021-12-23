const fs = require('fs')
const path = require('path')
const csvtojsonV2 = require("csvtojson/v2")
const utils = require('./utils')
// const detectCharacterEncoding = require('detect-character-encoding');

const csvFilePath = path.resolve(__dirname, '../static/鲨鱼记账明细.csv')
const outputFilePath = path.resolve(__dirname, '../static/data2021.json')

function getJsonArray (csvFilePath) {
	return new Promise(resolve => {
		// const fileBuffer = fs.readFileSync(csvFilePath);
		// const charsetMatch = detectCharacterEncoding(fileBuffer);
		// console.log(charsetMatch);
		// // 文件如果不是utf8编码则转换成utf8
		// const content = fs.readFileSync(csvFilePath, {encoding: charsetMatch.encoding});
		// fs.writeFileSync(csvFilePath, content, {encoding:'utf8'});
		csvtojsonV2().fromFile(csvFilePath).then(function(jsonArrayObj){
			//when parse finished, result will be emitted here.
			resolve(jsonArrayObj)
		})
	})
}

getJsonArray(csvFilePath).then(jsonArrayObj => {
	const data = utils.addTag(jsonArrayObj)
	console.log(data)
	fs.writeFile(outputFilePath, JSON.stringify(data), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log("The file was saved!");
	});
})
