import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core'

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon?: string; // é diferente pois recebemos o nome do icone não o componente
}

interface InputValueReference {
  value: string;
}

// passo apenas o que vai ser usando no elemento
interface InputRef {
  focus(): void;
}

// como precisa recebere a ref desse elemento vai alterar o FC para RefForwardingComponent
const Input: React.RefForwardingComponent<InputRef, InputProps> = ({ name, icon, ...rest }, ref) => {
  // para alterar o valor de um campo automaticamente é preciso criar uma ref
  // do input e implementar a função setValue
  const inputElementRef = useRef<any>(null)
  // no reactNative o inputRef é diferente para pegar o valor do campo
  // precisa passar o defaultValue pro valaue do useRef para pegar o valor
  const { registerField, defaultValue = '', fieldName, error } = useField(name)
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue })

  // useImperativeHandle serve para passar a função de um componente interno para o componente pai
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus()
    }
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = ''
        inputElementRef.current.clear();
      }
    })
  }, [fieldName, registerField])

  return (
    <Container>
      {!!icon &&
        <Icon name={icon} size={20} color="#666360" />}
      <TextInput
        ref={inputElementRef}
        defaultValue={defaultValue}
        placeholderTextColor="#666360"
        keyboardAppearance="dark"
        onChangeText={value => inputValueRef.current.value = value}
        {...rest} />
    </Container>
  )
}

// como ta passando dados do filho pro pai, precisa usar o forwardRef
export default forwardRef(Input);
