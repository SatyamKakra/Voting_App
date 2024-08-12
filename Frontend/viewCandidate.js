// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // const token = localStorage.getItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWY3ODJlODVmMjdmYjZhNzI0NDBjZiIsImlhdCI6MTcyMzAyMTI0NywiZXhwIjoxNzIzMDUxMjQ3fQ.T1Qz32KqO1ZKwp2F83hDXO_DpaDPRh1Ck8xCo-T6Wno');
    const table = document.querySelector('table tbody');

    fetch('http://192.168.1.6:3000/candidate/allCandidate', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWY3ODJlODVmMjdmYjZhNzI0NDBjZiIsImlhdCI6MTcyMzAyMTI0NywiZXhwIjoxNzIzMDUxMjQ3fQ.T1Qz32KqO1ZKwp2F83hDXO_DpaDPRh1Ck8xCo-T6Wno'}`,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        data.forEach(candidate => {
            const row = table.insertRow();
            row.insertCell(0).textContent = candidate._id;
            row.insertCell(1).textContent = candidate.name;
            row.insertCell(2).textContent = candidate.age;
            row.insertCell(3).textContent = candidate.party;
            row.insertCell(4).textContent = candidate.voteCount;

            const updateCell = row.insertCell(5);
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.addEventListener('click', () => {
                window.location.href = `Update.html?id=${candidate._id}`;
            });
            updateCell.appendChild(updateButton);

            const deleteCell = row.insertCell(6);
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this candidate?')) {
                    fetch(`http://192.168.1.6:3000/candidate/${candidate._id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWY3ODJlODVmMjdmYjZhNzI0NDBjZiIsImlhdCI6MTcyMzAyMTI0NywiZXhwIjoxNzIzMDUxMjQ3fQ.T1Qz32KqO1ZKwp2F83hDXO_DpaDPRh1Ck8xCo-T6Wno'}`,
                        },
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        // Reload the page to refresh the candidate list
                        location.reload();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }
            });
            deleteCell.appendChild(deleteButton);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
