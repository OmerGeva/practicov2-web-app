import React from 'react'
import { SignInPageContainer } from './sign-in.styles'
import CustomForm from '../../components/custom-form/custom-form.component'

const SignInPage = () =>  {
    return (
        <SignInPageContainer>
            <h1>Welcome To Practico!</h1>
            <CustomForm hasEmail hasPassword />
        </SignInPageContainer>
    )
}

export default SignInPage;