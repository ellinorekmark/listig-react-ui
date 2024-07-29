import {useContext} from "react";
import {AuthContext} from "./AuthContext";





export class ApiCaller {


    //baseUrl = "/api/"
    baseUrl = "http://localhost:8080/api/"

    constructor() {

    }


    async sendPost(path, data, loginDetails) {
      console.log(JSON.stringify(data))
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
        console.log(errorResponse)
        throw new Error(errorResponse)
      }
      const result = await response.json()
      console.log(result)
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
      console.log(res)
      return res
    }
    async  sendDelete(path, data, loginDetails){
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
