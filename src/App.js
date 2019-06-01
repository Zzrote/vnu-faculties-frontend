import React from 'react';
import './App.css';
import {getCookie} from './helper/Cookie'
import AppContext from './AppContext'
import {Layout, Menu, Row, Col, Icon} from 'antd'
import {Link, Route, Switch} from 'react-router-dom'
import 'antd/dist/antd.css'
import DashBoardContainer from './component/dashboard/DashBoardContainer'
import FacultyContainer from './component/faculty/FacultyContainer'
import ResearchContainer from './component/research/ResearchContainer';
import LoginContainer from './component/LoginContainer'
import ProfileContainer from './component/profile/ProfileContainer';

const {Sider, Content} = Layout

class App extends React.Component {
    state = {
			userId : getCookie('userId'),
			role : getCookie('userRole'),
			token : getCookie('token'),
			collapsed : false
    }

	onCollapse = collapsed => {
		this.setState({
			collapsed
		})
	}

    setContext = (state) => {
      this.setState(state)
    }

    render = () => {
      return (
        <AppContext.Provider 
					value = {{
						context : this.state,
						setContext : this.setContext		
					}}
        >
			<div>
				<Layout style={{ minHeight : "100vh"}}>
					<Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
						<Menu defaultSelectedKeys={['1']} mode="inline" theme="dark">
							<Menu.Item key="1" >
								<Link to="/dashboard">
									<Icon type="appstore"/>
									<span>Dashboard</span>
								</Link>
							</Menu.Item>
							<Menu.Item key="2" >
								<Link to="/faculty">
									<Icon type="user"/>
									<span>Faculty</span>
								</Link>
							</Menu.Item>
							<Menu.Item key="3" > 
								<Link to="/research">
									<Icon type="experiment" />
									<span>Research</span>
								</Link>
							</Menu.Item>
							{
								this.state.userId ? 
								<Menu.Item key="4" > 
									<Link to="/profile">
										<Icon type="container" />
										<span>Profile</span>
									</Link>
								</Menu.Item>
								: null
							}
							
						</Menu>
					</Sider>
					<Content>
						<Row style={{ marginTop : "2vh", marginBottom : "1vh"}}>
							<Col offset={22	} span={1}>
								<LoginContainer />
							</Col>
						</Row>
						<div style={{padding : "8vh", backgroundColor : "white", height : "100%"}}>
								<Switch>
									<Route exact path={['/dashboard','/']} component={DashBoardContainer}/>
									<Route exact path={'/faculty'} component={FacultyContainer}/>
									<Route exact path={'/research'} component={ResearchContainer}/>
									<Route exact path={'/profile'} component={ProfileContainer} />
								</Switch>
							
						</div>
					</Content>
				</Layout>
			</div>
        </AppContext.Provider>
      )
    }

}

export default App;
