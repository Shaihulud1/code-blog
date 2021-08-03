export const formatDateStr = (dateString: string) => {
    const date = new Date(dateString)
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
}

export const timeSeparate = (time: string): string[] => {
    return time.split("-")
}

