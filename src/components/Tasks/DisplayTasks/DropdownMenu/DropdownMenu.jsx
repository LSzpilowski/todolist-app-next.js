import React, { useState, useRef } from "react";
import Overlay from "react-bootstrap/Overlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import * as S from "./DropdownMenu.styles";

export const DropdownMenu = ({ onEdit, onDone, onDelete }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <S.MenuContainer ref={target}>
      <S.DotsButton
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setShow(!show);
        }}
      >
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </S.DotsButton>

      <Overlay target={target.current} show={show} placement="right">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <S.Menu {...props}>
            <S.MenuItem
              onClick={() => {
                onEdit();
                setShow(false);
              }}
            >
              Edit
            </S.MenuItem>
            <S.MenuItem
              onClick={() => {
                onDone();
                setShow(false);
              }}
            >
              Done
            </S.MenuItem>
            <S.MenuItem
              onClick={() => {
                onDelete();
                setShow(false);
              }}
            >
              Delete
            </S.MenuItem>
          </S.Menu>
        )}
      </Overlay>
    </S.MenuContainer>
  );
};
