import AppContext from '../../AppContext'
import React from 'react'
import Faculty from './Faculty'

class FacultyContainer extends React.Component {

    render = () => {
        return (
            <AppContext.Consumer>
                { context  => <Faculty 
                    {...{
                        ...context,
                        ...this.props
                    }} 
                />}
            </AppContext.Consumer>
        )
        
    }
}

export default FacultyContainer