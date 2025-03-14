import React, { memo } from 'react'
import { APP_NAME } from '@/constants'
const Name = () => {
  return (
    <span className="text-xl font-bold">
        {APP_NAME}
    </span>
  )
}

export default memo(Name)