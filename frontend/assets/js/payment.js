



let token=localStorage.getItem("token")
if(!token){
    location.href="index.html"
}
const fee=document.getElementById("fee")
const feeData=localStorage.getItem("fee")
const discount=document.getElementById("discount")
const amount=document.getElementById("amount")
fee.innerHTML=`&#8377; ${feeData}/-`
amount.innerHTML=`&#8377; ${feeData}/-`
