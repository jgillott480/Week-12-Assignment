$(function() {
    // Function to fetch and display entities from the JSON Server API
    function getAndDisplayEntities() {
        $.ajax({
            url: 'http://localhost:3000/icecreamflavors',  // JSON Server API endpoint for ice cream flavors
            method: 'GET',
            success: function(data) {
                // Handle the API response here
                console.log('Entities from JSON Server API:', data);
                // You can process and display the data in your application as needed
                data.forEach(function(entity) {
                    console.log('Ice Cream Flavor:', entity.text);
                });
            },
            error: function(xhr, status, error) {
                // Handle any errors from the API request
                console.error('Error fetching entities:', error);
            }
        });
    }

    // Submit form to create new entity
    $('#postForm').submit(function(event) {
        event.preventDefault();
        var title = $('#title').val();
        var completed = $('#completed').prop('checked');
        
        var postData = {
            title: title,
            completed: completed
        };

        // Make a POST request to create a new entity
        $.ajax({
            type: 'POST',
            url: 'https://jsonplaceholder.typicode.com/todos',
            data: postData,
            success: function(response) {
                console.log('New entity created:', response);
                
                // Refresh the entities list after posting a new entity
                getAndDisplayEntities();
            },
            error: function(xhr, status, error) {
                console.error('Error creating entity:', error);
            }
        });

        $('#title').val('');
        $('#completed').prop('checked', false);

        return false; // Prevent default form submission
    });

    // Initial call to get and display entities when the document is ready
    getAndDisplayEntities();

   
});