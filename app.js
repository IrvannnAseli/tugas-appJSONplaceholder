// Function to fetch and display users in a table
async function fetchUsers(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        alert('Failed to fetch data. Please check the URL and try again.');
    }
}

// Function to generate table rows and inject into the table
function displayUsers(users) {
    const usersBody = document.getElementById('users-body');
    usersBody.innerHTML = '';  // Clear previous data if any

    users.forEach(user => {
        const row = document.createElement('tr');

        const address = `${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`;

        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${address}</td>
            <td>
                <button class="view-details" onclick="handleDetails(${user.id})">View Details</button>
                <button class="view-posts" onclick="handlePosts(${user.id})">View Posts</button>
                <button class="view-comments" onclick="handleComments(${user.id})">View Comments</button>
                <button class="delete-user" onclick="handleDelete(${user.id}, this)">Delete</button>
            </td>
        `;

        usersBody.appendChild(row);
    });
}

// Function to handle View Details
async function handleDetails(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await response.json();
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Address:</strong> ${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
        `;
        showModal('User Details');
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
}

// Function to handle View Posts
async function handlePosts(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        const posts = await response.json();
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = posts.map(post => `
            <p><strong>${post.title}</strong></p>
            <p>${post.body}</p>
        `).join('<hr>');
        showModal('User Posts');
    } catch (error) {
        console.error('Error fetching user posts:', error);
    }
}

// Function to handle View Comments
async function handleComments(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${userId}`);
        const comments = await response.json();
        const modalBody = document.getElementById('modal-body');
       
        // Populate the modal body with the comments for the user
        modalBody.innerHTML = comments.map(comment => `
            <p><strong>${comment.name}:</strong> ${comment.body}</p>
        `).join('<hr>');
        showModal('User Comments');
    } catch (error) {
        console.error('Error fetching user comments:', error);
    }
}

// Function to handle Delete (simulated)
function handleDelete(userId, buttonElement) {
    const row = buttonElement.closest('tr');
    row.remove();
    alert(`User with ID ${userId} has been deleted (simulated).`);
}

// Function to show the modal with a title
function showModal(title) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerText = title;
    modal.style.display = 'block';
}

// Function to close the modal
document.getElementById('close-modal').onclick = function() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Event listener for fetch button click
document.getElementById('fetch-button').addEventListener('click', () => {
    const apiUrl = document.getElementById('api-url').value;
    if (apiUrl) {
        fetchUsers(apiUrl);
    } else {
        alert('Please enter a valid API URL.');
    }
});
