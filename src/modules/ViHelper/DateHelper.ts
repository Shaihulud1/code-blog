import apolloClient from "@/apollo"

export const formatDateStr = (dateString: string): string => {
    const date = new Date(dateString)
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
}

export const timeSeparate = (time: string): string[] => {
    return time.split("-")
}

export const dateStrToJSDate = (dateString: string): Date => {
    const dateSplit = dateString.split('.')//24.8.2021
    const date = new Date()
    date.setDate(parseInt(dateSplit[0]))
    date.setMonth(parseInt(dateSplit[1]))
    date.setFullYear(parseInt(dateSplit[2]))
    return date
}

export const timeJoin = (timeAt: string | Date, timeTo: string | Date): string => {
    let dateJoined = timeAt instanceof Date ? `${timeAt.getHours()}:${timeAt.getMinutes()}` : timeAt
    dateJoined += "-"
    dateJoined += timeTo instanceof Date ? `${timeTo.getHours()}:${timeTo.getMinutes()}` : timeTo
    return dateJoined
}
