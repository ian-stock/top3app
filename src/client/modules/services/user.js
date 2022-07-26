export function userRegistration(username, pwd) {
    const userInfo = { username, pwd };
    return fetch('/api/user/register', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    .then(function(response) {
        return response.json();
    })
}

export function userLogin(username, pwd) {
    const userInfo = { username, pwd };
    return fetch('/api/user/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    .then(response=>response.json())
    .then(data=>{ 
        return (data)
    })
}



