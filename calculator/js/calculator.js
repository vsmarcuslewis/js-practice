/*jshint browser: true, evil: true*/
/*global console*/


var content = document.getElementById('content'),
    calculatorHolder = document.createElement('section'),
    calculated = document.createElement('div'),
    preview = document.createElement('input'),
    hidden = document.createElement('input'),
    quickView = document.createElement('input'),

    multiplication = document.createElement('input'),
    decimal = document.createElement('input'),
    clear = document.createElement('input'),
    equals = document.createElement('input'),
    deleteInput = document.createElement('input');

function Numbers(value) {
    this.input = document.createElement('input');
    this.input.type = 'button';
    this.input.value = value;

    this.input.addEventListener('click', function() {
        calculated.textContent = '';
        preview.value += value;
        hidden.value += value;

        rightParenth.input.removeAttribute('disabled');
        addition.input.removeAttribute('disabled');
        subtraction.input.removeAttribute('disabled');
        multiplication.removeAttribute('disabled');
        division.input.removeAttribute('disabled');

        quickView.value = eval(hidden.value);

    });
}

function Operators(value) {
    this.input = document.createElement('input');
    this.input.type = 'button';
    this.input.value = value;

    this.input.addEventListener('click', function() {

        // If preview value is not empty or is not an open parenthesis
        if (preview.value !== '' && value !== '(') {
            // Check if operators exist
            switch (hidden.value.charAt(hidden.value.length - 1)) {
                case '+':
                case '-':
                case '/':
                case '*':
                    break;
                default:
                    preview.value += value;
                    hidden.value += value;
            }
        } else {
            switch (value) {
                case '(':
                    preview.value += value;
                    hidden.value += value;
                    rightParenth.input.setAttribute('disabled', 'true');
                    addition.input.setAttribute('disabled', 'true');
                    subtraction.input.setAttribute('disabled', 'true');
                    multiplication.setAttribute('disabled', 'true');
                    division.input.setAttribute('disabled', 'true');
                    break;
            }
        }
        switch (value) {
            case '(':
                rightParenth.input.setAttribute('disabled', 'true');
                addition.input.setAttribute('disabled', 'true');
                subtraction.input.setAttribute('disabled', 'true');
                multiplication.setAttribute('disabled', 'true');
                division.input.setAttribute('disabled', 'true');
                break;
        }

    });
}

var one = new Numbers(1),
    two = new Numbers(2),
    three = new Numbers(3),
    four = new Numbers(4),
    five = new Numbers(5),
    six = new Numbers(6),
    seven = new Numbers(7),
    eight = new Numbers(8),
    nine = new Numbers(9),
    zero = new Numbers(0),

    addition = new Operators('+'),
    subtraction = new Operators('-'),
    division = new Operators('/'),

    leftParenth = new Operators('('),
    rightParenth = new Operators(')');


// Add in components
content.prepend(calculatorHolder);

calculated.className = 'calculated';
calculatorHolder.className = 'calc';

preview.className = 'preview';
preview.style.display = 'block';
preview.style.border = '0';

hidden.className = 'hidden';
hidden.style.display = 'none';

quickView.className = 'quickView';
quickView.placeholder = 'Quick View';

calculatorHolder.append(calculated);
calculatorHolder.append(preview);
calculatorHolder.append(hidden);
calculatorHolder.append(quickView);

calculatorHolder.append(one.input);
calculatorHolder.append(two.input);
calculatorHolder.append(three.input);
calculatorHolder.append(addition.input);
calculatorHolder.append(four.input);
calculatorHolder.append(five.input);
calculatorHolder.append(six.input);
calculatorHolder.append(subtraction.input);
calculatorHolder.append(seven.input);
calculatorHolder.append(eight.input);
calculatorHolder.append(nine.input);
calculatorHolder.append(multiplication);
calculatorHolder.append(zero.input);
calculatorHolder.append(division.input);
calculatorHolder.append(leftParenth.input);
calculatorHolder.append(rightParenth.input);

multiplication.type = 'button';
multiplication.value = 'x';

multiplication.addEventListener('click', function() {
    if (preview.value !== '') {
        if (hidden.value.charAt(hidden.value.length - 1) !== '*') {
            preview.value += 'x';
            hidden.value += '*';
        }
    }
});

decimal.type = 'button';
decimal.value = '.';
calculatorHolder.append(decimal);

decimal.addEventListener('click', function() {
    if (preview.value !== '') {
        preview.value += '.';
        hidden.value += '.';
    }
});


deleteInput.type = 'button';
deleteInput.value = 'DEL';
calculatorHolder.append(deleteInput);

deleteInput.addEventListener('click', function() {
    preview.value = preview.value.substring(0, preview.value.length - 1);
    hidden.value = hidden.value.substring(0, hidden.value.length - 1);

    switch (hidden.value.charAt(hidden.value.length - 1)) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '(':
            preview.value = preview.value.substring(0, preview.value.length - 1);
            hidden.value = hidden.value.substring(0, hidden.value.length - 1);
            break;
                                                        }
    quickView.value = eval(hidden.value);
});


// Clear Inputs
clear.type = 'button';
clear.value = 'CLR';
calculatorHolder.append(clear);

clear.addEventListener('click', function() {
    calculated.textContent = '';
    preview.value = '';
    hidden.value = '';
    quickView.value = '';
});


// Evaluate
equals.type = 'button';
equals.value = '=';
calculatorHolder.append(equals);

equals.addEventListener('click', function() {

    switch (hidden.value.charAt(hidden.value.length - 1)) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '(':
            preview.value = preview.value.substring(0, preview.value.length - 1);
            hidden.value = hidden.value.substring(0, hidden.value.length - 1);
            break;
    }

    calculated.textContent = eval(hidden.value);
    preview.value = '';
    hidden.value = '';
    quickView.value = '';

});
