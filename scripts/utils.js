const dayjs = require('dayjs')
const workDays = [1, 2, 3, 4, 5]

const filters = {
	'投资': {
		lu: (item) => item.category === '投资'
	},
	'餐饮': {
		li: (item) => {
			// 获取类型为餐饮，备注为空，且是周一到周五的花费
			return item.category === '餐饮' && !item.remark && workDays.includes(dayjs(item.date).day())
		},
		lu: (item) => item.category === '餐饮' && item.remark === '卢'
	},
	'服饰': {
		li: (item) => item.category === '服饰' && item.remark.includes('男'),
		lu: (item) => item.category === '服饰' && !item.remark.includes('男')
	},
	'数码': {
		li: (item) => item.category === '数码' && item.remark.includes('李'),
		lu: (item) => item.category === '数码' && !item.remark.includes('卢')
	},
	'美容': {
		lu: (item) => item.category === '美容'
	},
	'居家': {
		lu: (item) => item.category === '居家' && item.remark.includes('吹风机')
	},
	'日用': {
		li: (item) => item.category === '日用' && item.remark.includes('剪头'),
	},
	'娱乐': {
		li: (item) => item.category === '娱乐' && ['bilibili', '迅雷', '车展', '咬嘴', '巫师3'].includes(item.remark),
		lu: (item) => item.category === '娱乐' && ['钢琴', '剧本杀', '充电宝', '按摩'].includes(item.remark)
	},
	'日常洗护': {
		li: (item) => item.category === '日常洗护' && item.remark.includes('李'),
		lu: (item) => item.category === '日常洗护' && !item.remark.includes('李') && !['沐浴露', '牙膏', '身体乳'].includes(item.remark)
	},
	'烟酒': {
		li: (item) => item.category === '烟酒' && ['', '电子烟', '啤酒'].includes(item.remark),
		lu: (item) => item.category === '烟酒' && ['日食记', '梅子酒', '酒'].includes(item.remark)
	},
}

module.exports = {
	addTag (jsonArrayObj) {
		const data = jsonArrayObj.map(item => {
			const res = {
				date: item['日期'].replace(/[年|月]/g, '/').replace('日', ''),
				type: item['收支类型'],
				category: item['类别'],
				amount: Number(item['金额']),
				remark: item['备注'],
			}
			if (filters[res.category] && filters[res.category].lu && filters[res.category].lu(res)) {
				res.tag = 'lu'
			} else if (filters[res.category] && filters[res.category].li && filters[res.category].li(res)) {
				res.tag = 'li'
			} else {
				res.tag = 'together'
			}
			delete item['日期']
			delete item['收支类型']
			delete item['类别']
			delete item['金额']
			delete item['备注']
			return res
		})
		return JSON.stringify(data)
	}
}
