import React from 'react'
import * as S from './Footer.styles'

export const Footer = () => {
  return (
    <S.Footer>
      <S.Text>
        Coded by
        <S.Link target="_blank" id='link' href="https://github.com/LSzpilowski">
          LucAround
        </S.Link>
      </S.Text>
      
    </S.Footer>
  )
}