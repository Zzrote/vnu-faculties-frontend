import React from 'react'
import {findAll} from '../../apis/FacultyAPI'
import { Table, Row, Col } from 'antd';
import Column from 'antd/lib/table/Column';
import EditFacultyModal from './modal/EditFacultyModal'
import RemoveFacultyModal from './modal/RemoveFacultyModal'
import AddFacultyModal from './modal/AddFacultyModal'

class Faculty extends React.Component {
    state = {
        faculties : []
    }

    componentWillMount = async () => {
        await this._fetchFaculties()
    }

    _fetchFaculties = async () => {
        const {success, data, message} = await findAll()
        console.log(data)
        if (success)
            this.setState({
                faculties : data
            })    
    }


    render = () => {
        return (
            <div>   
                <Row>
                    <Col span={15}>
                        <h1><b>FACULTIES</b></h1>
                    </Col>
                    {
                        this.props.context.role === "admin" ?
                        <Col offset={8} span={1}>
                            <AddFacultyModal reloadItems={this._fetchFaculties} />
                        </Col>
                        : null
                    }
                    
                </Row>
                <Table dataSource={this.state.faculties} bordered style={{ marginTop : "1vh"}}>
                    <Column title="#" key="id" render={ (text, record, index) =>  (
                        <span>{ index + 1}</span>
                    )} / >
                    <Column title="Name" dataIndex="fullname" key="fullname" / > 
                    <Column title="Username" dataIndex="username" key="username" / > 
                    <Column title="Email" dataIndex="email" key="email" / >
                    <Column title="Code" dataIndex="code" key="code" / >
                    <Column title="Degree" dataIndex="degree" key="degree" / >
                    <Column title="Phone number" dataIndex="phoneNumber" key="phoneNumber" / >
                    <Column title="Department" key="department" render={ (text, record, index) =>  (
                        <span>{record.department ? record.department.name : null }</span>
                    )} / >
                    <Column title="Researchs" key="department" render={ (text, record, index) =>  (
                        <span>
                            {
                                record.researchs ? 
                                record.researchs.map( r => <p>- {r.name}</p>)
                                : null 
                            }
                        </span>
                    )} / >
                    
                    <Column title="Action" render={ (text, record, index) => (
                        <span>
                            {
                                this.props.context.role === "admin" ? 
                                (
                                    <Row>
                                        <Col offset={1} span={10}>
                                            <EditFacultyModal facultyId={record._id} reloadItems={this._fetchFaculties} />
                                        </Col>
                                        <Col offset={1} span={10}>
                                            <RemoveFacultyModal facultyId={record._id} reloadItems={this._fetchFaculties} /> 
                                        </Col>
                                    </Row>
                                        
                                ) : null
                            }
                        </span>
                    )} />
                </Table>
            </div>
        )  
    }
}

export default Faculty

