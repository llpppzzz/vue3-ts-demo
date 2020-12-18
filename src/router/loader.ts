export default (page: string) => () => import(`views/${page}.vue`)
