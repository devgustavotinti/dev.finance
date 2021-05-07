// Nova Transação
const Modal = {
  open() {
    let claseModal = document.querySelector('.modal-overlay')
    let addClasse = claseModal.classList.add('active')
  }, 
  close() {
    let cancel = document.querySelector('.modal-overlay')
    let removeClasse = cancel.classList.remove('active')
  }
}

// tentando de outra maneira
// const classModal = document.querySelector('.modal-overlay')
// function openClose() {
//   // let addClasse = claseModal.classList.toggle('active')
//   console.log('oi')
// }

// classModal.addEventListener('click', openClose)

const transactions = [
  {
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021'
  },
  {
    description: 'Website',
    amount: 50000,
    date: '23/01/2021'
  },
  {
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021'
  },
]


// função para fazer o calculo matematico
const Transaction = {
  all: transactions,

  add(transaction){
    Transaction.all.push(transaction)

    App.init()
  },

  remove(index) {
    Transaction.all.splice(index, 1)

    App.reload()
  },

  incomes() {
    let income = 0

    Transaction.all.forEach((transaction) => {
      if( transaction.amount > 0) {
        income += transaction.amount
      }
    })
    return income
  },
    
  expenses() {
    let expense = 0

    Transaction.all.forEach((transaction) => {
      if( transaction.amount < 0) {
        expense += transaction.amount
      }
    })
    return expense
  },
  total() {
    return Transaction.incomes() + Transaction.expenses()
  }
}

// manipulaçao do Dom
const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransacton(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)

    DOM.transactionsContainer.appendChild(tr)
  },

  innerHTMLTransaction (transaction) {
    const cssClass = transaction.amount > 0 ? 'income' : 'expense'

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${cssClass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img src="assets/minus.svg" alt="Remover transação">
      </td>
      `
    return html
  },

  updateBalance() {
    document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
    document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
    document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
  },

  // limpar conteúdo
   clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

// transforma em negativo e em moeda
const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? '-' : ''

    value = String(value).replace(/\D/g, "")

    value = Number(value) / 100

    value = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })


    return signal + value
  }
}


const App = {
  init() {

// adiciona as linhas
    Transaction.all.forEach((transaction) => {
      DOM.addTransacton(transaction)
    })
    
    DOM.updateBalance()

  },
  reload() {
    // limpar e aparecer conteúdo sem repetir 
    DOM.clearTransactions()
    App.init()
  },
}

App.init()

Transaction.remove(0)
