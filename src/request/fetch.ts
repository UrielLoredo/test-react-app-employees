import axios from "axios"

//const apiUrl = process.env.PUBLIC_API_URL ? process.env.PUBLIC_API_URL : ''
export const apiUrl = `https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/uriel_loredo`

export const fetchApi = async (): Promise<any> => {
    await axios.get(apiUrl)
    .then(res => {
        return res.data
    })
    .catch((error) => error)
}

export const createEmpoyee = async (params: object): Promise<any> => {
    await axios.post(apiUrl, params)
    .then((res: any) => {
        if (res.status >= 200 && res.status < 300) {
            return res
        }else{
            throw new Error(res)
        }
    })
    .catch((error) => error)
}
