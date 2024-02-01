import styled from 'styled-components';

export const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DotsButton = styled.a`
  text-decoration: none;
  margin: 0 5px;
  padding: 0;
  font-size: 25px;
  color: white;
 

`;

export const Menu = styled.div`
  position: absolute;
  right: 0;

  color: black;
  background-color: rgba(255, 165, 0, 1);
  border: 1px solid #ddd;
  border-radius: 10px;
  z-index: 1;
`;

export const MenuItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  width: 70px;
  &:hover {
    background-color: #f5f5f5;
    border-radius: 10px;
    font-weight: bold;
 }
`;