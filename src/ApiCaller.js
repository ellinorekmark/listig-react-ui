

export class ApiCaller {
    userStore = useUserStore()

    //baseUrl = "/api/"
    baseUrl = "http://localhost:8080/api/"

    constructor() {

    }



    async sendPost(path, data) {
      console.log(JSON.stringify(data))
      const response = await fetch(this.baseUrl + path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(this.userStore.loginDetails())
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

    async sendGet(path) {
      const response = await fetch(this.baseUrl + path, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(this.userStore.loginDetails())
        }
      })
      if (!response.ok) {
        throw new Error(await response.json())
      }
      return await response.json()
    }
    async  sendDelete(path, data){
      const response = await fetch(this.baseUrl + path, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(this.userStore.loginDetails())
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        throw new Error(await response.json())
      }
      return await response.json()
    }




    loginDetails(){
        return userStore.username+":"+userStore.password;
    }
  }
