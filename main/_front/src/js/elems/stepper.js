const steppers = document.querySelectorAll('.stepper');
const checkMinDisabled = (element) => {
    return Number(element.textContent) <= 1;
}
const checkMaxDisabled = (element, maxValue) => {
    return Number(element.textContent) >= Number(maxValue);
}
const writeDataValue = (element, value) => {
    element.dataset.value = value;
}

steppers.forEach(stepper => {


    const minus_btn = stepper.querySelector('.stepper__minus');
    const plus_btn = stepper.querySelector('.stepper__plus');
    const value = stepper.querySelector('.stepper__value');
    if (value.textContent) writeDataValue(stepper, value.textContent);

    const max = stepper.dataset.max;

    if (checkMinDisabled(value)){
        minus_btn.disabled = true;
        value.textContent = "1";
    }
    if (checkMaxDisabled(value, max)){
        plus_btn.disabled = true;
        value.textContent = max;
    }

    minus_btn.addEventListener('click', (e) => {
        let count = Number(value.textContent);
        if (count > 1) {
            count--;
            value.textContent = count;
            plus_btn.disabled = false;
            writeDataValue(stepper, value.textContent);
            if (checkMinDisabled(value)){
                minus_btn.disabled = true;
                value.textContent = "1";
            }
        }
    })

    plus_btn.addEventListener('click', (e) => {
        let count = Number(value.textContent);
        if (count < max) {
            count++;
            value.textContent = count;
            minus_btn.disabled = false;
            writeDataValue(stepper, value.textContent);
            if (checkMaxDisabled(value, max)){
                plus_btn.disabled = true;
                value.textContent = max;
            }
        }
    })
})