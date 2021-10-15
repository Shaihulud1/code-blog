import { utcToZonedTime, format } from 'date-fns-tz'

const timeZoneLib = new Map([
    [0, 'Accra'],
    [2, 'Europe/Kaliningrad'],
    [3, 'Europe/Moscow'],
    [4, 'Europe/Samara'],
    [5, 'Europe/Yekaterinburg'],
    [6, 'Europe/Omsk'],
    [7, 'Europe/Krasnoyarsk'],
    [8, 'Europe/Irkutsk'],
    [9, 'Europe/Chita'],
    [10, 'Europe/Vladivostok'],
    [11, 'Europe/Srednekolymsk'],
    [12, 'Europe/Anadyr'],
])


export const date2TimeZone = (date: string | Date, gmt: number, pattern: string | undefined = undefined ): string => {
    const timeZone = timeZoneLib.get(gmt) ?? 'Europe/Moscow'
    const zonedDate = utcToZonedTime(date, timeZone)
    if (!pattern) {
        const gmtPlus = (gmt.toString().split('').length < 2 ? '0' : '') + gmt.toString()
        pattern = "yyyy-MM-dd\'T\'HH:mm:ss+"+gmtPlus+":00'"
    }
    const output = format(zonedDate, pattern, { timeZone })
    return output
}



