import {BASE_URL} from "./constants";

export class ApiCaller {


    baseUrl = BASE_URL

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
            console.log(await response.json())
            const errorResponse = await response.json()
            throw new Error(errorResponse)
        }
        return  await response.json()
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

        return await response.json()
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
        return await response.json();
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
