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

const stepperChange = (item, value) => {
    const minus_btn = item.querySelector('.stepper__minus');
    const plus_btn = item.querySelector('.stepper__plus');
    const stepper_value = item.querySelector('.stepper__value');

    const max = item.dataset.max;
    stepper_value.textContent = value;

    if (checkMinDisabled(stepper_value)){
        minus_btn.disabled = true;
        stepper_value.textContent = "1";
    }else {
        minus_btn.disabled = false;
    }
    if (checkMaxDisabled(stepper_value, max)){
        plus_btn.disabled = true;
        stepper_value.textContent = max;
    }else {
        plus_btn.disabled = false;
    }
}

const change_parameter = document.querySelector("#change_parameter");
console.log(change_parameter);
change_parameter.addEventListener("click", (e) => {
    stepperChange(document.querySelector("#type"), 10);
})
