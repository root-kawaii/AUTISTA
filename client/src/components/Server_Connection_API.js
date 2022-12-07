import { useState, useEffect} from "react";

export default class APIService{
    // Insert an article
    static OpenSession(body){
        return fetch(`http://localhost:5000/add`,{
            'method':'POST',
             headers : {
            'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    }


    //TODO check if it is works once the server sends back the game page
    static GetPlayerSession(code){
        fetch(`http://localhost:5000/get?code=${code}`)
            .then(response => response.json())
            .catch((error) => {
                console.error('problem with the fetch')
            })
    }


}