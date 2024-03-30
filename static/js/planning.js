document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("submit_button").addEventListener("click", function() {
        event.preventDefault();
        var formData = {};
        var formElements = document.getElementById("myForm").elements;
        for (var i = 0; i < formElements.length; i++) {
            if (formElements[i].tagName === "INPUT" || formElements[i].tagName === "TEXTAREA") {
                formData[formElements[i].name] = formElements[i].value;
            }
        }
        console.log(formData);   
        const params = {city: formData.city} 
        const url = '/get_data?' + new URLSearchParams(params);
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error('Error:', error));
    });
});

function fetchData() {
    return fetch('/get_data' + area)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error('Error:', error));
}