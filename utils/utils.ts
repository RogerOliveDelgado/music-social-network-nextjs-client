export const getRating = (number: number) : number => {
    return Math.round(number/20)
}

export const getToken = (cookies: string) => {
    let userToken = undefined
    cookies.split(";").forEach(item => {
        const [key, value] = item.split("=")
        if(key === 'userToken') {
          userToken = value
    }})
    if(!userToken) return ''
    return userToken
    } 