import AppContext from '../../AppContext'
import React from 'react'
import Profile from './Profile'

class ProfileContainer extends React.Component {

    render = () => {
        return (
            <AppContext.Consumer>
                { context  => <Profile 
                    {...{
                        ...context,
                        ...this.props
                    }} 
                />}
            </AppContext.Consumer>
        )
        
    }
}

export default ProfileContainer