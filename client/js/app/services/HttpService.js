export class HttpService {

    constructor() {
        this._headers = new Headers();
        this._headers.append('Accept', 'application/json')
        this._headers.append('Content-Type', 'application/json')
    }

    get(url, headers = {}) {
        return new Promise((resolve, reject) => {
            fetch(url, { 
                method: 'GET',
                headers: this._headers,
                mode: 'cors',
                cache: 'default' 
            })
            .then(this._handleErrors)
            .then(response => resolve(response))
            .catch((error) => reject(error.message));
        })
    }

    post(url, data, headers = {}) {
        return new Promise((resolve, reject) => {
            fetch(url, { 
                method: 'POST',
                headers: this._headers,
                mode: 'cors',
                body: JSON.stringify(data),
                cache: 'default' 
            })
            .then(this._handleErrors)
            .then(response => resolve(response))
            .catch((error) => reject(error.message));
        })
    }

    _handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);         
        }
        return response.json();          
    }

    // get(url) {

    //     fetch(url)
    //         .then(res => this._handleErrors(res))
    //         .then(res => res.json());
    // }

    // post(url, dado) {

    //     fetch(url, { 
    //         headers: { 'Content-Type': 'application/json' },
    //         method: 'post',
    //         body: JSON.stringify(dado)
    //     })
    //     .then(res => this._handleErrors(res)); 
    // }
}