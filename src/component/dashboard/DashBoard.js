import React from 'react'
import {findAll, findFacultyByDepartment} from '../../apis/DepartmentAPI'
import { Table, Row, Col, Button } from 'antd';
import Column from 'antd/lib/table/Column';
import EditDepartmentModal from './modal/EditDepartmentModal'
import RemoveDepartmentModal from './modal/RemoveDepartmentModal'
import AddDepartmentModal from './modal/AddDepartmentModal'

class DashBoard extends React.Component {
    state = {
        departments : [],
        faculties : []
    }

    componentWillMount = async () => {
        console.log(this.props)
        await this._fetchDepartments()
        
    }

    _fetchDepartments = async () => {
        const {success, data, message} = await findAll()
        console.log(data)
        if (success)
            this.setState({
                departments : data,
                faculties : []
            })    
    }

    _onChangeTarget =  departmentId => async e => {
        const {success, data, message} = await findFacultyByDepartment(departmentId) 
        if (success)
            this.setState({
                faculties : data
            })
    }


    render = () => {
        return (
            <div>
                <Row>
                    <Col span={16}>
                        <Row gutter={16}>
                            <Col span={14}>
                                <h1><b>DEPARTMENTS</b></h1>
                            </Col>
                            {
                                this.props.context.role === "admin" ?
                                <Col offset={8} span={1}>
                                    <AddDepartmentModal reloadItems={this._fetchDepartments} />
                                </Col>
                                : null
                            }
                            
                        </Row>
                        <Table dataSource={this.state.departments} bordered>
                            <Column title="#" key="id" render={ (text, record, index) =>  (
                                <span>{ index + 1}</span>
                            )} / >
                            <Column title="Name" dataIndex="name" key="name" / > 
                            <Column title="Type" dataIndex="type" key="type" / > 
                            <Column title="Address" dataIndex="address" key="address" / >
                            <Column title="Website" dataIndex="website" key="website" / >
                            <Column title="Action" render={ (text, record, index) => (
                                <span>
                                    <Row>
                                        <Col offset={1} span={7}>
                                            <Button onClick={this._onChangeTarget(record._id)} icon="search"></Button>
                                        </Col>
                                            { this.props.context.role === "admin"?  
                                                <>
                                                    <Col offset={1} span={7}>
                                                        <EditDepartmentModal researchId={record._id} reloadItems={this._fetchResearchs} />
                                                    </Col>
                                                    <Col offset={1} span={7}>
                                                        <RemoveDepartmentModal researchId={record._id} reloadItems={this._fetchResearchs} />
                                                    </Col>
                                                </>
                                            : null
                                            }
                                    </Row>
                                </span>
                            )} />
                        </Table>
                    </Col>
                    <Col offset={1} span={7}>
                        <h1><b>RELATED FACULTIES</b></h1>
                        <Table dataSource={this.state.faculties} bordered>
                            <Column title="#" key="id" render={ (text, record, index) =>  (
                                <span>{ index + 1}</span>
                            )} / >
                            <Column title="Name" dataIndex="fullname" key="fullname" / > 
                            <Column title="Degree" dataIndex="degree" key="degree" / > 
                        </Table>
                    </Col>
                </Row>
                
            </div>
        )  
    }
}

export default DashBoard

