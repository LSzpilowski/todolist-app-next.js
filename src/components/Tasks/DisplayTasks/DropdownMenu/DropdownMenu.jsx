import React, { useState, useRef, useEffect } from 'react';
import * as S from './DropdownMenu.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

export const DropdownMenu = ({ onEdit, onDone, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref]);

  return (
    <S.MenuContainer ref={ref}>
      <S.DotsButton href='#' onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon  icon={faEllipsisVertical} />
      </S.DotsButton>
      {isOpen && (
        <S.Menu>
          <S.MenuItem onClick={onEdit}>Edit</S.MenuItem>
          <S.MenuItem onClick={onDone}>Done</S.MenuItem>
          <S.MenuItem onClick={onDelete}>Delete</S.MenuItem>
        </S.Menu>
      )}
    </S.MenuContainer>
  );
};