import React from 'react'
import {findById} from '../../apis/FacultyAPI'
import { Row, Col, Descriptions } from 'antd';
import EditProfileModal from './modal/EditProfileModal'


class Profile extends React.Component {
    state = {
        profile : {
            degree : '',
            fullname : '',
            email : '',
            phoneNumber : '',
            department : null,
            username : '',
            code : '',
            researchs : null
        }
    }

    componentWillMount = async () => {
        console.log("willmount")
        await this._fetchProfile()
    }

    _fetchProfile = async () => {
        const {userId} = this.props.context
        const {success, data, message} = await findById(userId)
        
        if (success)
            return this.setState({
                profile : data
            })    
    }


    render = () => {
        console.log("render")
        const {profile} = this.state
        const {degree, fullname, email, phoneNumber, department, username, researchs, code } = profile
        return (
            <div>   
                <Row>
                    <Col offset={23} span={1}>
                        <EditProfileModal item={profile} reloadItems={this._fetchProfile} />
                    </Col>
                </Row>
                <div >
                    <Descriptions column={1} title={<h1><b>{degree ? (degree + ". " + fullname) : fullname}</b> </h1>} bordered>
                        <Descriptions.Item label="Username">{username}</Descriptions.Item>
                        <Descriptions.Item label="Code">{code ? code : 'N/A'}</Descriptions.Item>
                        <Descriptions.Item label="Email">{email}</Descriptions.Item>
                        <Descriptions.Item label="Phone number">{phoneNumber ? phoneNumber : 'N/A' }</Descriptions.Item>
                        <Descriptions.Item label="Department"> { department ? department.name : 'N/A'}</Descriptions.Item>
                        <Descriptions.Item label="Research"> 
                            <span>
                                {
                                    researchs ? 
                                    researchs.map( r => <p>- {r.name}</p>)
                                    : null 
                                }
                            </span>
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </div>
        )  
    }
}

export default Profile
