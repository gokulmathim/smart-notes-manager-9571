import React from 'react'
import bg from '../assets/background.svg'

/**
 * PUBLIC_INTERFACE
 * BackgroundBlur - Visual background blur image.
 */
export default function BackgroundBlur(): JSX.Element {
  return (
    <>
      <img
        src={bg}
        alt=""
        style={{
          position: 'fixed',
          top: 0, left: 0, width: '100%', height: '100%',
          zIndex: -1, filter: 'blur(100px)', opacity: '0.7', objectFit: 'cover'
        }}
      />
      <style>{`body.dark-theme img[alt=""]{ opacity: 0.3; }`}</style>
    </>
  )
}
