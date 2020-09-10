import React, { useRef, useCallback } from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, TextInput, Platform, Alert } from 'react-native';
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import { useNavigation } from '@react-navigation/native'

import * as Yup from 'yup'

import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'

import Icon from 'react-native-vector-icons/Feather'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/logo.png'

import { Container, Title, BackToSign, BackToSignText } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const navigation = useNavigation();


  const handleSingUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 digitos'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/users', data);
        Alert.alert('Cadastro Relizado com sucesso!', 'Você já pode fazer login na aplicação')
        navigation.goBack()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        console.log(err)
        Alert.alert('Erro no cadastro', 'Ocorreu um erro ao fazer cadastro, tente novamente.')
      }
    },
    [navigation],
  );

  return (
    <>
      {/* No IOS precisa colocar o keyboardavoidingViw para o teclado empurrar o conteudo pra acima */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        {/* Como vai abrir o teclado, é legal permitir o scroll, o keyboardShouldPersistTaps faz o comportamento padrão ao fechar clicar fora do input */}
        <ScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps="handled">
          <Container>
            <Image source={logoImg} />
            {/* por caausa do KeyboardAvoidingView o conteudo vai ser movimentado e o Text não acompanha a animação no ISO */}
            <View>
              <Title>Crie sua conta</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSingUp}>
              <Input
                autoCapitalize="words"
                name="name" icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => { emailInputRef.current?.focus() }} />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => { passwordInputRef.current?.focus() }} />
              {/* textContentType tem a função OnetimeCode que preenche o dado que vc recebe no sms */}
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()} />

              <Button onPress={() => formRef.current?.submitForm()}>Cadastrar</Button>
            </Form>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSign onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignText>Voltar para logon</BackToSignText>
      </BackToSign>
    </>
  )
}

export default SignUp;
