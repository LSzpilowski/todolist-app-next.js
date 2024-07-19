import React, { useState, useRef } from "react";
import Overlay from "react-bootstrap/Overlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

interface IDropdownMenu {
  onEdit: () => void;
  onDone: () => void;
  onDelete: () => void;
}

export const DropdownMenu: React.FC<IDropdownMenu> = ({
  onEdit,
  onDone,
  onDelete,
}) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <div className="relative inline-block" ref={target}>
      <a
        className="mx-[5px] p-0 text-[25px] text-white"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setShow(!show);
        }}
      >
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </a>

      <Overlay target={target.current} show={show} placement="right">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            className="absolute right-0 text-black bg-[rgba(255, 165, 0, 1)] border-solid-[#ddd]-10"
            {...props}
          >
            <div
              className="py-[8px] px-[12px] w-[70px] hover:bg-[#f5f5f5] rounded-[10px] text-bold"
              onClick={() => {
                onEdit();
                setShow(false);
              }}
            >
              Edit
            </div>
            <div
              className="py-[8px] px-[12px] w-[70px] hover:bg-[#f5f5f5] rounded-[10px] text-bold"
              onClick={() => {
                onDone();
                setShow(false);
              }}
            >
              Done
            </div>
            <div
              className="py-[8px] px-[12px] w-[70px] hover:bg-[#f5f5f5] rounded-[10px] text-bold"
              onClick={() => {
                onDelete();
                setShow(false);
              }}
            >
              Delete
            </div>
          </div>
        )}
      </Overlay>
    </div>
  );
};
