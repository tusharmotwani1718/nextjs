"use server";

export async function fetchUsers() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    const users = await response.json();

    console.log(users);

}