console.log('Client side javascript loaded');

const form = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    message1.innerHTML = 'Loading...';
    message2.innerHTML = '';
    fetch('/weather?address='+search.value).then((response) => {
        response.json().then((data) => {
            if(data.error){
                // console.log(data.error);
                message1.innerHTML = data.error;
            }else{
                search.value = '';
                message1.innerHTML = data.location;
                message2.innerHTML = data.forecast;
                // console.log(data);
            }
        });
    });
});

