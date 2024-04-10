import React from 'react'
import { MagnifyingGlass, RotatingTriangles } from  'react-loader-spinner'

export const SearchLoader = () => {
  return (
    <MagnifyingGlass
  visible={true}
  height="80"
  width="80"
  ariaLabel="MagnifyingGlass-loading"
  wrapperStyle={{}}
  wrapperClass="MagnifyingGlass-wrapper"
  glassColor = '#CFCFCF'
  color = '#9BD1E7'
/>
  )
}


export const LoginLoader = () => {
  return(
    <RotatingTriangles
    visible={true}
    height="80"
    width="80"
    ariaLabel="rotating-triangels-loading"
    wrapperStyle={{}}
    wrapperClass="rotating-triangels-wrapper"
/>
  )
}