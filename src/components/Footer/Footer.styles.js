import styled from "styled-components";

export const Footer = styled.div`
min-height: 2.5rem;
text-align: center;
margin-top;
padding-right: 25px;

display: flex;
flex-direction: row;
justify-content: end;
align-items: center;
`;

export const Text = styled.p`

`;

export const Link = styled.a`
 display: inline-block;
  padding-bottom:2px;
  background-image: linear-gradient(#000 0 0);
  background-position: 0 100%; /*OR bottom left*/
  background-size: 0% 2px;
  background-repeat: no-repeat;
  transition:
    background-size 0.4s,
    background-position 0s 0.4s;

  text-decoration: none;
  font-weight: 900;
  padding-left: 5px;

  &:hover {
    color: green;
    background-position: 100% 100%; /*OR bottom right*/
    background-size: 100% 2px;
  }
`;
