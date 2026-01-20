import Link from 'next/link'
import React from 'react'

function Dashboard() {
  return (
    <div>
        Dashboard: 
        <Link href={'/profile'}>View Profile</Link>
    </div>
  )
}

export default Dashboard;