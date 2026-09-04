const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message')

form.addEventListener('submit', (e) => {
    let errors = []

    if (firstname_input) {
        // if firstname input exists, then we in the signip page
        errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value);
    }
    else {
        //if it does not exist, we in the login page
        errors = getLoginFormErrors(email_input.value, password_input.value);
    }

    // if errors exist
    if(errors.length > 0){
        e.preventDefault()
        error_message.innerText = errors.join('. ')
    }
});

// create the getSignupFormErrors function

function getSignupFormErrors(firstname, email, password, repeatPassword) {
    let errors = []
    if(firstname === '' || firstname === null ){
        errors.push("Name is required")
        firstname_input.parentElement.classList.add('incorrect') // to display to the user
    }

    if(email === '' || email === null){
        errors.push("Email is required")
        email_input.parentElement.classList.add('incorrect')
    }

    if(password === '' || password === null){
        errors.push("Password is required")
        password_input.parentElement.classList.add('incorrect')
    } else if (password.length < 8){
        errors.push('Password must have at least 8 characters')
        password_input.parentElement.classList.add('incorrect')
    }


    // to check if repeated passed is the original password
    if (repeatPassword === ''){
        errors.push('Please confirm password')
        repeat_password_input.parentElement.classList.add('incorrect')
    }
    else if(password !== repeatPassword){
        errors.push('Password does not match')
        password_input.parentElement.classList.add('incorrect')
        repeat_password_input.parentElement.classList.add('incorrect')
    }

    return errors;  // will be returned into the errors in the eventlistener where you call the function
}

// create the getLoginFormErrors function

function getLoginFormErrors(email, password){
    let errors = []

    if(email === '' || email === null){
        errors.push("Email is required")
        email_input.parentElement.classList.add('incorrect')
    }

    if(password === '' || password === null){
        errors.push("Password is required")
        password_input.parentElement.classList.add('incorrect')
    }

    return errors;
}


//create an all inputs array

const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null)
allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')){
            input.parentElement.classList.remove('incorrect')
            error_message.innerText = ''
        }
    })
})
