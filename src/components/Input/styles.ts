import styled, { css } from 'styled-components/native';
import IconBase from 'react-native-vector-icons/Feather'

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 8px;

  flex-direction: row;
  align-items: center;

  border-width: 2px;
  border-color: #232129;


  ${props => props.isErrored && css`
    border-width: 2px;
    border-color: #c53030;
  `}

  ${props => props.isFocused && css`
    border-width: 2px;
    border-color: #ff9000;
  `}


`;

export const Icon = styled(IconBase)`
margin-right: 16px;
`

export const TextInput = styled.TextInput`
flex: 1;
color: #fff;
font-size: 16px;
font-family: 'RobotoSlab-Regular';
`
