import AppContext from '../../AppContext'
import React from 'react'
import Research from './Research'

class ResearchContainer extends React.Component {

    render = () => {
        return (
            <AppContext.Consumer>
                { context  => <Research 
                    {...{
                        ...context,
                        ...this.props
                    }} 
                />}
            </AppContext.Consumer>
        )
        
    }
}

export default ResearchContainer