import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import {registerUser, logInUser} from '../../API';
import {UserContext} from '../../context';

const AuthWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(250,250,250);
`
const AuthHeader = styled.h1`
    text-align: center;
    font-size: 40px;
    color: rgba(0,149,246,0.7);
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
    border: 1px solid rgb(219,219,219);
    
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Form = styled.form`
    width: 75%;
    height: 100%;
    margin: 30px 20px;
`

const FormInput = styled.input`
    box-sizing: border-box;
    margin: 8px 0px 8px 0px;
    width: 100%;
    height: 36px;
    background-color: rgb(250,250,250);
    border-radius: 1px;
    
    padding: 9px 8px 7px 16px;
    border: ${props => props.error ? '1px solid red' : '1px solid rgb(219,219,219)'};
    font-size: 14px;
    
    color: rgb(0,0,0);

    &:focus {
        background-color: darken(rgb(241,240,240), 10%);
        border: none;
        outline: none;
    }
`

const FormSubmit = styled.input`
    width: 100%;
    height: 28px;
    padding: 5px 9px;
    background-color: ${(props => props.submittable ? 'rgb(0,149,246)' : 'rgba(0, 149, 246, 0.3)')};
    text-align: center;
    border-radius: 2px;
    border: none;
    color: #fff;
`

const ErrorLabel= styled.label`
    display: block;
    color: red;
    font-size: 10px;
    `

const Authentication = (props) => {
    const [register, setRegister] = useState(false);
    const context = useContext(UserContext);

    console.log(context);

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
            
                {register ? 
                <AuthenticationForm header={'Register'} toggleText={'Already Registered?'} toggleButtonText={'Log In'}toggleForm={toggleForm} apiCall={registerUser}/> 
                :
                 <AuthenticationForm header={'Log In'} toggleText={"Don't have an account?"} toggleButtonText={'Sign Up'}toggleForm={toggleForm} apiCall={logInUser}/>}
                
            
            
        </AuthWrapper>
    )
};

const AuthenticationForm = (props) => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [submittable, setSubmittable] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [usernameErrorText, setUsernameErrorText] = useState(null);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState(null);
    const context = useContext(UserContext);

    const updateUsername = (e) => {
        setUsernameError(false);
        setUsernameErrorText(null);
        setUsername(e.target.value);
        checkSubmittable();
        console.log(username);

    };

    const updatePassword = (e) => {
        setPasswordError(false);
        setPasswordErrorText(null);
        setPassword(e.target.value);
        checkSubmittable()
        console.log(password);
    };

    const checkSubmittable = () => {
        if(password.length > 1 && username.length > 1){
            setSubmittable(true);
        } else {
            setSubmittable(false);
        }
    }

    const  onSubmit = async (e) => {
        e.preventDefault();
        // context.changeAuthenticating();
        const response = await props.apiCall({username: username, password: password});

        

        // console.log(await resJson);
        if(response.status === 400){
            const resJson = response.json();
            console.log('in error');
            setUsernameError(true);
            
            setUsernameErrorText(await resJson);
        } else if(response.status === 401) {
            const resJson= response.json();
            setPasswordError(true);
            setPasswordErrorText(await resJson);
        } else {
            context.handleAuthentication(response, username);
        }
        console.log(response);
        // console.log(response.body);
        // context.handleAuthentication(response, username);
        // registerUser({username: username, password: password});
    };

    const toggle = () => {
        console.log('toggle button clicked')
        props.toggleForm();
    };

    

    return (
        <React.Fragment>
            <FormWrapper>
                <Form>
                    <AuthFormText>
                        {props.header}
                    </AuthFormText>
                    <FormInput placeholder={'username'} name='username' required={true} onChange={updateUsername} error={usernameError}/>
                    {usernameErrorText ? <ErrorLabel htmlFor={username}>{usernameErrorText.error}</ErrorLabel> : null}
                    <FormInput placeholder={'password'} name='password' type={'password'} required={true} onChange={updatePassword} error={passwordError}/>
                    {passwordErrorText ? <ErrorLabel htmlFor={password}>{passwordErrorText.error}</ErrorLabel> : null}
                    <FormSubmit placeholder={'Submit'} type={'submit'} onClick={onSubmit} submittable={submittable}/>

                </Form>
            </FormWrapper>
            <FormWrapper>
                <p style={{margin: '20px'}}>{props.toggleText} <span style={{color:'rgb(0,149,246)'}} onClick={toggle}>{props.toggleButtonText}</span></p>
                {/* <AuthFormText onClick={toggle}>
                    {props.toggleText}
                </AuthFormText> */}
            </FormWrapper>
        </React.Fragment>
    )


}

export default Authentication;