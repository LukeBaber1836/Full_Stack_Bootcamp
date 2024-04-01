import { dbank } from "../../declarations/dbank"

window.addEventListener("load", async function(){
  update();  // Update balance when front end page loads
})

document.querySelector("form").addEventListener("submit", async function(event){
  event.preventDefault()

  const button = event.target.querySelector("#submit-btn");

  const inputAmount =  parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true); // Disable button to prevent multiple clicks

  // Top up bank account by input amount
  if (document.getElementById("input-amount").value.length != 0) {
    await dbank.topUp(inputAmount);
  }

  // Withdrawal from bank acount by outputAmount
  if (document.getElementById("withdrawal-amount").value.length != 0) {
    await dbank.withdrawal(outputAmount);
  }

  // Get new balance
  update();

  // Reset values and unfreeze button
  document.getElementById("input-amount").value = "";
  document.getElementById("input-amount").value = "";
  button.removeAttribute("disabled");

})

async function update(){
  const currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100)/100;
}