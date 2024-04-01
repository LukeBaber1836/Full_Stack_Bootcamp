import { useState, useEffect } from 'react';
import { dBank_App_backend } from 'declarations/dBank_App_backend';
import { Unknown } from '@dfinity/candid/lib/cjs/idl';

function App() {
  const [balance, setBalance] = useState("");
  const [inputs, setInputs] = useState({topup: "", withdrawal: ""})


  window.addEventListener("load", async function(){
    update();  // Update balance when front end page loads
  });

  async function update(){
    const currentAmount = await dBank_App_backend.checkBalance();
    setBalance(Math.round(currentAmount * 100)/100);
  }

  function handleTopUp(event){
    setInputs({
      topup: event.target.value,
      withdrawal: ""
    });
  }

  function handleWithdrawal(event){
    setInputs({
      topup: "",
      withdrawal: event.target.value
    });
  }

  async function handleSubmit(event){
    event.preventDefault();
    const button = event.target.querySelector("#submit-btn");
    
    button.setAttribute("disabled", true); // Disable button to prevent multiple clicks

    console.log(inputs.topup.length);

    // Top up bank account by input amount
    if (inputs.topup.length != 0) {
      await dBank_App_backend.topUp(parseFloat(inputs.topup));
    }
    // Withdrawal from bank acount by outputAmount
    if (inputs.withdrawal.length != 0) {
      await dBank_App_backend.withdrawal(parseFloat(inputs.withdrawal));
    }

    // Get new balance
    update();

    // Reset values and unfreeze button
    setInputs({topup: "", withdrawal: ""})
    button.removeAttribute("disabled");

    console.log("Submit");
  }

  return(
    <div className="container">
      <img src="dbank_cover.png" alt="DBank logo" width="300"/>
      <h1>Current Balance: $<span id="value">{balance}</span></h1>
      <div className="divider"></div>

      <form action="#" onSubmit={handleSubmit}>
        <h2>Amount to Top Up</h2>
        <input id="input-amount" type="number" step="0.01" min="0" name="topUp" onChange={handleTopUp} value={inputs.topup}/>
        <h2>Amount to Withdraw</h2>
        <input id="withdrawal-amount" type="number" name="withdraw" step="0.01" min="0" onChange={handleWithdrawal} value={inputs.withdrawal}/>
        <input id="submit-btn" type="submit" value="Finalise Transaction" />
      </form>
    </div>
  );
}

export default App;
