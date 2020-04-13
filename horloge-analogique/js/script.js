const hourHand  = document.querySelector("#hour");
const minuteHand = document.querySelector("#minute");
const secondHand = document.querySelector("#second");

function demarrerLaMontre() {
    const hourActual = new Date();

    let hr = hourActual.getHours();
    let min = hourActual.getMinutes();
    let sec = hourActual.getSeconds();

    let secDeg = sec * 6;  // pour terminer la tour de 360 deg dans 60 step il doit passer 6 Deg pour chaque step
    let minDeg = (min * 6) + (0.1 * sec); //==> 6 / 60 = 0.1 --- chaque step de laguille sec, laguille min il doit passer 0.1 deg
    let hrDeg = (hr * 30) + (0.5 * min);  // ==> 30 / 60 = 0.5 --- chaque step de laguille min , laguille heur doit passer 0.5 deg 

    secondHand.style.transform = 'rotate(' + secDeg + 'deg)';
    minuteHand.style.transform = 'rotate(' + minDeg + 'deg)';
    hourHand.style.transform = 'rotate(' + hrDeg + 'deg)';
}
demarrerLaMontre();

// Exercuter la fonction chaque second

var interval = setInterval(demarrerLaMontre, 1000);