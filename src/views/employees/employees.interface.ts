export interface SingleEmployeeProps {
    id?: number
    name?: string
    last_name?: string
    birthday?: number
}

export interface EmployeesProps {
    list?: SingleEmployeeProps
}