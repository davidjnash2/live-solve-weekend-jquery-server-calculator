$(document).ready(onReady);

function onReady(){
    console.log('client side js')
    $('#calculate').on('click', sendToServer); // event listener for calculate button
    $('#equation-form').on('click', updateCurrentOperation);
    $('#clear').on('click', clearInput);
    getEquationsAndAddToPage();
}

let currentOperation;
console.log(currentOperation);

function clearInput(event){
    event.preventdefault();
    $('#number-one').val('');
    $('#number-two').val('');
}

function updateCurrentOperation(event){
    event.PreventDefault();
    currentOperation = $(this).text;
    console.log('updated currentOperation:', currentOperation);
}

function sendToServer(event){
    event.PreventDefault();

    let equation = {
        num1: $('#number-one').val(),
        num2: $('#number-two').val(),
        operation: currentOperation
    }

    $.ajax({
        method: 'POST',
        url: '/thing'
    }).then(
        function(response){
            console.log('Get /thing call successful!')
            console.log('response:', response)
        }).catch(
            function(error){
                console.log('GET /thing call failed.');
                console.log('error:', error);
            }
        )
}

function getEquationsAndAddToPage() {
   $.ajax({
        method: 'GET',
        url: '/thing',
    }).then(
        function(response){
            $('#equation-history').empty();
            let newestAnswer = response[response.length-1].answer;
            $('#newest-answer').text(`${newestAnswer}`);

            for (let equation of repsonse){
                let equationString = `${equation.num1} ${equation.operator}${equation.num2} = ${equation.answer}`
                $('#equation-history').append(`<li>${equationString}</li>`)
            }

            console.log('POST /thing call successful');
            console.log('response:', response);
        }
    ).catch(
        function(error){
            console.log('Post /thing call failed');
            console.log('error:', error);
        }
    )
}

