document.addEventListener('DOMContentLoaded', function() {
    let formPages = $('#plan_form').find('.form-group');
    let currentIndex = 0;
    showTab(currentIndex);    

    $('#next_btn').on('click', function() {    
        currentIndex++;
        showTab(currentIndex);
    });

    $('#previous_btn').on('click', function() {                
        currentIndex--;
        showTab(currentIndex);
    });

    function showTab(n) {
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
            addClickEventToSubmitButton();
        } else {
            $('#next_btn').text('Next');
        }
    }
});

function addClickEventToSubmitButton() {
    $('.submit_button').on('click', function() {                
        postFormData();
    });
}

function postFormData() {
    // debugger
    event.preventDefault();
    var formData = {};
    var formElements = document.getElementById('plan_form').elements;
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
    console.log(formData);   

    //Send this data to python backend

    // const params = {city: formData.city} 
    // const url = '/get_data?' + new URLSearchParams(params);
    // fetch(url)
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    // })
    // .catch(error => console.error('Error:', error));
}