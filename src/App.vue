<template>
  <Header/>
  <div class="container">
    <Balance :total="total"/>
    <IncomeExpenses :income="+income" :expenses="+expenses"/>
    <TransactionList :transactions="transactions" @transactionId="handleDeleteTransaction"/>
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted"/>
  </div>
</template>

<script setup>
  import Header from './components/Header.vue';
  import Balance from './components/Balance.vue';
  import IncomeExpenses from './components/IncomeExpenses.vue';
  import TransactionList from './components/TransactionList.vue';
  import AddTransaction from './components/AddTransaction.vue';
  import { ref, computed } from 'vue';
import { useToast } from 'vue-toastification';
  
  const toast = useToast();
  const transactions = ref([
          {id: 1, text: 'Cake', amount: -100.00},
          {id: 2, text: 'Milk', amount: -90.00},
          {id: 3, text: 'Game', amount: 40.90},
        ]);
        
  const total = computed(() => {
    return transactions.value.reduce((acc, transaction)=>{
      return acc+transaction.amount;
    }, 0);
  })

const income = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2);
});

const expenses = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2);
});

const generateUniqueId = () =>{
  return Math.floor(Math.random() * 100000);
}

const handleTransactionSubmitted = (transactionData) => {
  transactions.value.push({
    id: generateUniqueId(),
    text: transactionData.text,
    amount: transactionData.amount
  })
  toast.success("Transaction added successfully!!!");
}

const handleDeleteTransaction = (transactionId) => {
  console.log(transactionId);
  transactions.value = transactions.value.filter(
    (transaction) => transaction.id !== transactionId
  );
  toast.success("Transaction deleted successfully!!!");
}
</script>