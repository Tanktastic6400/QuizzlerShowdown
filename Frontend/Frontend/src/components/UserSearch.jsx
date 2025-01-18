import React, { useState } from 'react';

function UserSearch() {
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);

    function usersSearch() {
        fetch(`http://localhost:8080/search/users?username=${username}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                setUsers(data);
            })
            .catch(function(error) {
                console.error('Error fetching data:', error);
            });
        }

        function handleChange(event) {
            setUsername(event.target.value);
        }

        return (
            <div>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={username}
                    onChange={handleChange}
                />
                <button onClick={usersSearch}>Search</button>
                <ul>
                    {users.map(function(user) {
                        return <li key={user.id}>{user.username}</li>;
                    })}
                </ul>
            </div>
        );
    }
    
    export default UserSearch;