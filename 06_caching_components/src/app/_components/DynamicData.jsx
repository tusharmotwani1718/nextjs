import { cacheLife, cacheTag } from "next/cache";


async function getUsers() {
    'use cache';

    cacheLife({
        stale: 300,
        revalidate: 600,
    })

    const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
        next: { tags: ['users'] }
    },  {
        headers: {
            "Content-Type": "application/json"
        }
    },)

    const data = await response.json();

    return data;
}

async function updateUser() {
    // db query to update user...


}

export default async function DynamicData() {
    'use server';
    const users = await getUsers();


    return (
        <div className="my-3">
            <h2>Dynamic Data handling</h2>
            <p>Dynamic data would be loaded here.</p>
            {
                users.map((user) => (
                    <div key={user.id}>
                        UserName: {user.username}
                        Name: {user.name}
                    </div>
                ))
            }
        </div>
    )
}