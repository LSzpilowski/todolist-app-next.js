import styled from 'styled-components';

export const Fieldset = styled.fieldset`
  width: 60%;

  overflow: auto;
  margin: 0 15px;
  border: 1px solid #005ba4;
  border-radius: 10px;
  background-color: #f1f2f4;
  box-sizing: border-box;
`;

// TaskHistory (fieldset) needs
// position: relative;
// min-height: 40px;
// max-height: 360px;
// padding-bottom: 10px;
// overflow: ${(props) => (props.hasItems ? "auto" : "hidden")};




export const Legend = styled.legend`
  background-color: transparent;
  font-size: 2em;
  font-weight: bold;
  transition: 300ms ease-in-out;
`;



export const UnorderdList = styled.ul`
  box-sizing: border-box;
  font-size: 1.5em;
  padding: 0;
`;

// Toodos List & Dones List needs
// margin: 0;
// min-height: 250px;
// max-height: 380px;
// padding: 5px;

// UlHistory needs
// display: faCircleXmark;
// flex-direction: column;
// padding: 0;


export const Button = styled.button`
  font-size: 0.75em;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 15px;
  margin: 0;
  background-color: #d0d4db;
  max-width: 50%;

  &:hover {
    border-radius: 50px;
    font-weight: bold;
    transition: 300ms ease-in-out;
    background-color: orange;
    cursor: pointer;
  }
`;
  

// OTHER BUTTONS!


// HideShowButton needs
// position: absolute;
// top: 4px;
// right: 100px;
// max-width: 88.5px;
// font-size: 0.5em;



// ClearButton needs
// position: absolute;
// top: 4px;
// right: 10px;
// max-width: 88.5px;



// ReUseButton needs
// font-size: 0.65em;

export const LiTasks = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 5px;
  padding: 5px 10px;
  border-radius: 10px;
  
`;

// LiTodoTasks needs
//  background-color: #3440ff;
//   color: white;
//    &:hover {
//     background-color: rgb(15, 10, 222);
//    }


// LiDonesTasks needs
// background-color: rgb(255, 165, 0);
// opacity: 0.7;
// color: black;
// &:hover {
// opacity: 1;
// }


// LiHistoryTasks needs
// background-color: red;
// color: black;
// opacity: 0.7;
// &:hover {
// opacity: 1;
// }


