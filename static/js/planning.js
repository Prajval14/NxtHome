document.addEventListener('DOMContentLoaded', function() {
    let formPages = $('#plan_form').find('.form-group');
    let formElements = document.getElementById('plan_form').elements;
    let formData = {};
    let currentFormPage = 0;
    
    toggleFormPage(currentFormPage);    

    $('#next_btn').click(() => toggleFormPage(++currentFormPage));
    $('#previous_btn').click(() => toggleFormPage(--currentFormPage));

    function toggleFormPage(n) {
        // debugger        
        formPages.removeClass('active').eq(n).addClass('active');
        if (n === 0) {
            $('#previous_btn').prop('disabled', true);
        } else {
            $('#previous_btn').prop('disabled', false);
        }
        if (n === formPages.length - 1) {
            // debugger
            $('#next_btn').text('Submit');
            $('#next_btn').addClass('submit_button');
            document.querySelector('.submit_button').addEventListener('click', () => submitForm(formElements, formData));            
        } else {
            $('#next_btn').text('Next');
        }        
    }
});

function submitForm(formElements, formData){
    for (var i = 0; i < formElements.length; i++) {
        if (formElements[i].tagName === 'INPUT' || formElements[i].tagName === 'SELECT') {
            if (formElements[i].type === 'radio') {
                var selectedOption = document.querySelector('input[name="' + formElements[i].name + '"]:checked');
                if (selectedOption) {
                    formData[selectedOption.name] = selectedOption.value;
                }
            }
            else {
                formData[formElements[i].name] = formElements[i].value;
            }
        }
    }    
    postFormData(formData);
} 

function postFormData(formData) {
    fetch('/post_form_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })    
    .then(response => (response.json()))
    .then(data => {        
        getReportData(data);
    }) 
    .catch(error => {
        console.error('Error:', error);
    });
}

function getReportData(formData) {
    const params = {city: formData.city_location} 
    const url = '/get_data?' + new URLSearchParams(params);
    fetch(url)
    .then(response => {
        if(response.ok) {
            window.alert('data fetched')
        }
        return response.json()
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error('Error:', error));    
}