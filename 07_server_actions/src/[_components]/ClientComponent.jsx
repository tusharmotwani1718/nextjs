"use client";
import { fetchUsers } from '@/server_actions/fetchUsers'
import React from 'react'


function ClientComponent() {
  return (
    <div>
        <h2>Client Component</h2>
        <button onClick={fetchUsers}>Fetch Users and log in console</button>
    </div>

  )
}

export default ClientComponent