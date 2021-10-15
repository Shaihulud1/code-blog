export type UserScheduleType = {
    id: string,
    humanReadableId: string,
    pharm: {
        id: string,
        name: string,
    }
    serviceNumber: {
        id: string,
        position: string, 
        user: {
            id: string,
            fullName: string,
        }
    },
    orderDate: string,
    orderTo: string,
    time: string,
}
export type RefreshTokenResponse = {
    accessToken: string
}

export type UserListItem = {
    id: string,
    fullName: string,
    phone: string,
}