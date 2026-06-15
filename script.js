const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')
const saveEl = document.getElementById('save')
const toggleEl = document.getElementById('toggle')

let actualPassword = ''
let passwordVisible = true

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

// Copy Password
clipboardEl.addEventListener('click', () => {
    if (!actualPassword) {
        return
    }

    navigator.clipboard.writeText(actualPassword)
    alert('Password copied to clipboard!')
})

// Generate Password
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked

    // Length Validation
    if (length < 5 || length > 15) {
        resultEl.innerText = ''
        actualPassword = ''
        alert('Password cannot be generated. Length must be between 5 and 15 characters.')
        return
    }

    actualPassword = generatePassword(
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        length
    )

    passwordVisible = true
    resultEl.innerText = actualPassword
    toggleEl.innerHTML = '<i class="fas fa-eye"></i>'
})

// Show / Hide Password
toggleEl.addEventListener('click', () => {
    if (!actualPassword) {
        return
    }

    if (passwordVisible) {
        resultEl.innerText = '*'.repeat(actualPassword.length)
        toggleEl.innerHTML = '<i class="fas fa-eye-slash"></i>'
        passwordVisible = false
    } else {
        resultEl.innerText = actualPassword
        toggleEl.innerHTML = '<i class="fas fa-eye"></i>'
        passwordVisible = true
    }
})

// Save Password
saveEl.addEventListener('click', () => {
    if (!actualPassword) {
        alert('No password to save!')
        return
    }

    const blob = new Blob([actualPassword], {
        type: 'text/plain'
    })

    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = 'password.txt'
    link.click()

    alert('Password saved as password.txt')
})

// Generate Password Logic
function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ''

    const typesCount = lower + upper + number + symbol

    const typesArr = [
        { lower },
        { upper },
        { number },
        { symbol }
    ].filter(item => Object.values(item)[0])

    if (typesCount === 0) {
        alert('Please select at least one character type.')
        return ''
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }

    return generatedPassword.slice(0, length)
}

// Random Lowercase
function getRandomLower() {
    return String.fromCharCode(
        Math.floor(Math.random() * 26) + 97
    )
}

// Random Uppercase
function getRandomUpper() {
    return String.fromCharCode(
        Math.floor(Math.random() * 26) + 65
    )
}

// Random Number
function getRandomNumber() {
    return String.fromCharCode(
        Math.floor(Math.random() * 10) + 48
    )
}

// Random Symbol
function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[
        Math.floor(Math.random() * symbols.length)
    ]
}