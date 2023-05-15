const express = require('express');
let bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended:true }));

let equationHistory = [];

app.get('/thing', (req, res) => {
    console.log('Get /thing request received');
    res.send(equationHistory);
})

app.post('/thing', (req, res) => {
    console.log('POST /thing request received')
    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);
    let operation = req.body.operation;
    let answer = '';

    if (operation === '+'){
        answer = num1 + num2;
    } else if (operation === '-'){
        answer = num1 - num2;
    } else if (operation === '*'){
        answer = num1 * num2;
    } else if (operation === '/'){
        answer = num1 / num2;
    }

    let equation = {
        num1: num1,
        num2: num2,
        operation: operation,
        answer: answer
    }

    equationHistory.push(equation);

    let requestedThing = req.body;
    console.log('/thing request received')
    res.sendStatus(201);
})

app.listen(PORT, function() {
    console.log ('Server is running on port', PORT);
})
