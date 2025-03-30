import React from 'react'

const MySkeleton = ({ className, children }: { className: string; children?: React.ReactNode }) => {
  return <div className={`skeleton-loading ${className}`}>{children}</div>
}

export default MySkeleton
