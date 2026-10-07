const baseUrl = "https://api.frankfurter.dev/v2/rates?base=";
let amount = document.querySelector(".amount input");

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");

const msg = document.querySelector(".msg")

const toCurr = document.querySelector(".to select");
let courrencyRate = 0;
// let from1 = fromCurr.value;
// let to1 = toCurr.value;




const getCourencyRate = (data) => {
    for (let i in data) {
        let tocourrency = data[i].quote;
        if (tocourrency === toCurr.value) {
            courrencyRate = data[i].rate;
            printRate();

        }


    }
}





let icon = document.querySelector("#icon");

    icon.addEventListener("click", () => {
    // 1. Swap the selected values
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;

    // 2. Update the flags for both dropdowns
    changeFlag(fromCurr);
    changeFlag(toCurr);

});




let printRate = () => {
    let fromcurrName = fromCurr.value

    let tocurrName = toCurr.value



    amountval = amountval * courrencyRate;
    msg.innerText = ` ${amount.value} (${fromcurrName}) = ${amountval} (${tocurrName})`


}









let i = 0;
let countryCode;
for (let select of dropdowns) {
    for (countcode in countryList) {
        let option = document.createElement("option");
        option.innerText = countcode;
        option.value = countcode;

        select.append(option);
        if (select.name == "from" && countcode == "USD") {
            option.selected = "selected";
            
        }
        else if (select.name == "to" && countcode == "INR") {
            option.selected = "selected";
           
        }
        select.append(option);
     
    }
    select.addEventListener("change", (evt) => {
        changeFlag(evt.target);
        
    })
}

let changeFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newSrc;

}
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    amountval = amount.value

    if (amountval == "" || amountval < 1) {
        amountval = 1;
        amount.value = "1";
    }
    var URL = `${baseUrl}${fromCurr.value.toLowerCase()}`;
    const getcuurency = async () => {
        let response = await fetch(URL);
        let data = await response.json();


        getCourencyRate(data);
    }

    getcuurency();


})






