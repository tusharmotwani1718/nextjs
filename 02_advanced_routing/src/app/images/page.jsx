import Link from 'next/link'
import React from 'react'

function Images() {
  return (
    <div>Images List: 
        <Link href={'/images/list'} className='text-blue-500 underline'>View here</Link>
    </div>
  )
}

export default Images;