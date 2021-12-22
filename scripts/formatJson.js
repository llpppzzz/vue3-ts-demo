const fs = require('fs')

let data = require('../static/2021.json')

data.map(item => {
	return {
		date: item['日期'].replace(/[年|月|日]/g, '/'),

	}
})
