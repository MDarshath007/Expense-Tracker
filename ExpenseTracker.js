const tr_name = document.getElementById("tr-name")
const tr_amount = document.getElementById("tr-amount")
const add_btn = document.querySelector(".add-btn")
const list = document.querySelector('.list')

const balanceEl = document.getElementById('balance')
const incomeEl = document.getElementById('income')
const expenseEl = document.getElementById('expense')
let transactions = []

add_btn.addEventListener('click', () => {
    const name = tr_name.value.trim()
    const amount = Number(tr_amount.value)

    if (name === "" || isNaN((amount))) {
        alert("Write Something!")
        return
    }

    const transaction = {
        id: Date.now(),
        name,
        amount
    }

    transactions.push(transaction)
    appendTransactions()
    updateSummary()
})
function appendTransactions() {
    list.innerHTML = " "

    transactions.forEach(tx => {
        const li = document.createElement('li')
        li.className = 'transactions'

        const nameP = document.createElement('p')
        nameP.textContent = tx.name

        const amountP = document.createElement('p')
        amountP.className = 'amount'
        amountP.textContent = `${tx.amount > 0 ? "+" : ""}${tx.amount}`
        amountP.classList.add(tx.amount > 0 ? "plus" : "minus")

        const dlt_btn = document.createElement('button')
        dlt_btn.className = 'dlt-button'
        dlt_btn.textContent = 'X'

        dlt_btn.addEventListener('click', () => {
            transactions = transactions.filter((t) => t.id !== tx.id)
            appendTransactions()
            updateSummary()
        })

        amountP.appendChild(dlt_btn)
        li.appendChild(nameP)
        li.appendChild(amountP)
        list.appendChild(li)
    })

    tr_name.value = ""
    tr_amount.value = ""
}

function updateSummary() {
    const amounts = transactions.map(t => t.amount)

    const income = amounts
        .filter(n => n > 0)
        .reduce((acc, val) => acc + val, 0)

    const expense = amounts
        .filter(n => n < 0)
        .reduce((acc, val) => acc + val, 0)

    const balance = income + expense

    incomeEl.textContent = "+₹" + income 
    expenseEl.textContent = "-₹" + Math.abs(expense) 
    balanceEl.textContent = "₹" + balance 
}


