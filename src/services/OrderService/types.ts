export type OrderDrag = {
    id: string,
    from: Date,
    to: Date,
    orderDate: string
}

export type Order = {
    id: string, 
    serviceNumber: {
        id: string,
        position: string,
        user: {
            id: string,
            fullName: string,
        }
    }
    pharm: {
        id: string,
        name: string,
        address: string,
    }
    orderDate: string,
    orderTo: string,
}