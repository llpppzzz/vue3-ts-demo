import dayjs from "dayjs";

const workDays = [1, 2, 3, 4, 5]

interface BillItem {
  date: string,
  type: string,
  category: string,
  amount: number,
  remark: string
}

const filters: {[key: string]: { [key: string]: any }} = {
  '住房': {},
  '汽车': {},
  '交通': {},
  '长辈': {},
  '保险': {},
  '服饰': {},
  '投资': {
    lu: (item: BillItem) => item.category === '投资'
  },
  '餐饮': {
    li: (item: BillItem) => {
      // 获取类型为餐饮，备注为空，且是周一到周五的花费
      return item.category === '餐饮' && !item.remark && workDays.includes(dayjs(item.date).day())
    },
    lu: (item: BillItem) => item.category === '餐饮' && item.remark === '卢'
  }
}

export function getSumByCategory (data: BillItem[], category: string) {
  let sumLu = 0, sumLi = 0
  if (filters[category].lu) {
    const coastLu = data.filter(filters[category].lu)
    sumLu = coastLu.reduce((pre: number, cur: BillItem) => pre + cur.amount, 0)
  }
  if (filters[category].li) {
    const coastLi = data.filter(filters[category].li)
    sumLi = coastLi.reduce((pre: number, cur: BillItem) => pre + cur.amount, 0)
  }
  const coastToTal = data.filter((item: BillItem) => item.category === category)
  const sumTotal = coastToTal.reduce((pre: number, cur: BillItem) => pre + cur.amount, 0)
  return [{
    label: 'lpz',
    category,
    value: sumLi
  }, {
    label: 'ly',
    category,
    value: sumLu
  }, {
    label: 'together',
    category,
    value: sumTotal - sumLu - sumLi
  }]
}

export function getSumByCategories (data: BillItem[], category: string[]) {
  const obj: { [key: string]: any } = {}
  category.forEach((item) => {
    if (filters[item]) {
      obj[item] = getSumByCategory(data, item)
    }
  })
  return obj
}
