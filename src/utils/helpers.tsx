export const fixDateFormat = (date: any) => {
    const dateSelected = new Date(date)
    const dd = String(dateSelected.getDate()).padStart(2, '0')
    const mm = String(dateSelected.getMonth() + 1).padStart(2, '0')
    const yyyy = dateSelected.getFullYear()
    const fixValue = yyyy + '/' + mm + '/' + dd
    return fixValue
}