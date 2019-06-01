import AppContext from '../../AppContext'
import React from 'react'
import DashBoard from './DashBoard'

class DashBoardContainer extends React.Component {

    render = () => {
        return (
            <AppContext.Consumer>
                { context  => <DashBoard 
                    {...{
                        ...context,
                        ...this.props
                    }} 
                />}
            </AppContext.Consumer>
        )
        
    }
}

export default DashBoardContainer