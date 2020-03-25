import React, { useState } from 'react';
import styled from 'styled-components';

const AuthWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #1877f2;
`
const AuthHeader = styled.h1`
    text-align: center;
    font-size: 50px;
    color: #fff;
`

const AuthFormText = styled.p`
    text-align: center;
    font-size: 25px;
    margin: 8px 8px 8px 8px;
    cursor: pointer;

`
const FormWrapper = styled.div`
    margin: 20px;
    width: 300px;
    height: 300px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Form = styled.form`
    width: 75%;
    height: 100%;
`

const FormInput = styled.input`
    box-sizing: border-box;
    margin: 8px 0px 8px 0px;
    width: 100%;
    height: 50px;
    background-color: rgb(238,240,243);
    border-radius: 50px;
    padding: 0 16px 0 16px;
    border: none;
    
    color: rgb(0,0,0);

    &:focus {
        background-color: darken(rgb(241,240,240), 10%);
        border: none;
        outline: none;
    }
`

const FormSubmit = styled.input`
    width: 100%;
    height: 50px;
    background-color: rgb(220, 222, 225);
    text-align: center;
`

const Authentication = (props) => {
    const [register, setRegister] = useState(false);

    const toggleForm = () => {
        setRegister(!register);
        console.log(register);
    };

    console.log(register)


    return(
        <AuthWrapper>
            <AuthHeader>
                Instant-Messenger
            </AuthHeader>
            <FormWrapper>
                {register ? <AuthenticationForm header={'Register'} toggleText={'Already Registered? Log In'} toggleForm={toggleForm}/> : <AuthenticationForm header={'Log In'} toggleText={'Not Registered? Create an Account!'} toggleForm={toggleForm}/>}
                
            </FormWrapper>
            
        </AuthWrapper>
    )
};

const AuthenticationForm = (props) => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const updateUsername = (e) => {
        setUsername(e.target.value);
        console.log(username);

    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
        console.log(password);
    }

    const onSubmit = (e) => {
        e.preventDefault();
    };

    const toggle = () => {
        console.log('toggle button clicked')
        props.toggleForm();
    }

    return (
        <Form>
            <AuthFormText>
                {props.header}
            </AuthFormText>
            <FormInput placeholder={'username'}  required={true} onChange={updateUsername}/>
            <FormInput placeholder={'password'} type={'password'} required={true} onChange={updatePassword}/>
            <FormSubmit placeholder={'Submit'} type={'submit'} onClick={onSubmit} />
            <AuthFormText onClick={toggle}>
                {props.toggleText}
            </AuthFormText>
        </Form>
    )


}

export default Authentication;