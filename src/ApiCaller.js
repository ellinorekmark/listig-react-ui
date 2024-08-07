export class ApiCaller {

    //baseUrl = "/api/"
    baseUrl = "http://localhost:8080/api/"

    constructor() {

    }

    async sendPost(path, data, loginDetails) {
        const response = await fetch(this.baseUrl + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + loginDetails
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            const errorResponse = await response.json()
            throw new Error(errorResponse)
        }
        const result = await response.json()
        return result
    }
    async sendPostNoLogin(path, data) {
        const response = await fetch(this.baseUrl + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            const errorResponse = await response.json()
            throw new Error(errorResponse)
        }
        const result = await response.json()
        return result
    }

    async sendGet(path, loginDetails) {
        const response = await fetch(this.baseUrl + path, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + loginDetails
            }
        })
        if (!response.ok) {
            throw new Error(await response.json())
        }
        let res = await response.json();
        return res
    }

    async sendDelete(path, data, loginDetails) {
        const response = await fetch(this.baseUrl + path, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + loginDetails
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error(await response.json())
        }
        return await response.json()
    }


}
