import AppContext from '../AppContext'
import React from 'react'
import LoginModal from './LoginModal'

class LoginContainer extends React.Component {

    render = () => {
        return (
            <AppContext.Consumer>
                { context  => <LoginModal 
                    {...{
                        ...context,
                        ...this.props
                    }} 
                />}
            </AppContext.Consumer>
        )
        
    }
}

export default LoginContainer