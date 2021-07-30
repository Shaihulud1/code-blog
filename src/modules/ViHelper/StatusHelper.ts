export const getRusStatus = (status: string) => {
    let rusStatus = 'Неизвестно'
    switch (status)
    {
        case 'BOOKED': 
            rusStatus = 'Забронирован'
            break
        case 'CREATED': 
            rusStatus = 'Создан'
            break
        case 'CONFIRMED': 
            rusStatus = 'Подтвержден'
            break
        case 'IN_PLACE': 
            rusStatus = 'На месте'
            break
        case 'CANCELED': 
            rusStatus = 'Отменено'
            break
        case 'DONE': 
            rusStatus = 'Закрыт'
            break
        case 'DRAFT':
            rusStatus = 'Подвешен'
            break
    }
    return rusStatus
}
