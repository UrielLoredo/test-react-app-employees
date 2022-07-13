export interface MenuProps {
    id: number,
    name: string,
    path: string,
    private: boolean
}
export interface HeaderProps {
    menu: MenuProps[]
}