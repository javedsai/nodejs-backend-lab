const apiUrl = 'http://localhost:3000/api/users'

const loginForm = document.getElementById('loginForm')
const registerForm = document.getElementById('registerForm')

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault()

        const username = document.querySelector('#username').value
        const password = document.querySelector('#password').value

        const res = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        const data = await res.json()
        if (res.ok) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.user.username)
            alert("Login Successful")
            window.location.href = "students.html"
        } else {
            alert(data.message || "Login Failed")
        }
    })
}

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault()

        const username = document.querySelector('#username').value
        const email = document.querySelector('#email').value
        const password = document.querySelector('#password').value        

        const res = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })

        const data = await res.json()
        if (res.ok) {
            alert("Registeration Succesful, You can now login")
            window.location.href = "index.html"
        } else {
            alert(data.message || "Registration Failed")
        }

    } )
}