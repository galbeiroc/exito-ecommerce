import React from 'react'
import styled from 'styled-components'


interface IProps {
    songs: Array<object>;
    mdlOpen: boolean
}

export const Modal:React.FC<IProps> = ({songs,mdlOpen}) => {
    return (
        <ModalContainer>
            <h1>Hola</h1>
        </ModalContainer>
    )
}



const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;
