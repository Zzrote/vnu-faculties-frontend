import React from 'react'
import {findAll, findFacultyByResearch} from '../../apis/ResearchAPI'
import { Table, Row, Col, Button, List } from 'antd';
import Column from 'antd/lib/table/Column';
import EditResearchModal from './modal/EditResearchModal'
import RemoveResearchModal from './modal/RemoveResearchModal'
import AddResearchModal from './modal/AddResearchModal'

class Research extends React.Component {
    state = {
        researchs : [],
        faculties : []
    }

    componentWillMount = async () => {
        console.log(this.props)
        await this._fetchResearchs()  
    }

    _fetchResearchs = async () => {
        const {success, data, message} = await findAll()
        if (success)
            this.setState({
                researchs : data,
                faculties : []
            })    
    }

    _onChangeTarget = researchId => async e => {
        const {success, data, message} = await findFacultyByResearch(researchId) 
        if (success)
            this.setState({
                faculties : data
            })
    }


    render = () => {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Row>
                            <Col span={15}>
                                <h1><b>RESEARCHS</b></h1>
                            </Col>
                            {
                                this.props.context.role === "admin" ?
                                <Col offset={7} span={2}>
                                    <AddResearchModal reloadItems={this._fetchResearchs} />
                                </Col>
                                : null
                            }
                            
                        </Row>
                        <List
                            bordered
                            dataSource={this.state.researchs}
                            renderItem={item => 
                                <List.Item >
                                    <div style={{ width :"100%"}}>{item.name}</div>
                                    <Row gutter={16}>
                                        <Col offset={1} span={7}>
                                            <Button onClick={this._onChangeTarget(item._id)} icon="search"></Button>
                                        </Col>
                                        { this.props.context.role === "admin"?  
                                                <>
                                                    <Col offset={1} span={7}>
                                                        <EditResearchModal researchId={item._id} reloadItems={this._fetchResearchs} />
                                                    </Col>
                                                    <Col offset={1} span={7}>
                                                        <RemoveResearchModal researchId={item._id} reloadItems={this._fetchResearchs} />
                                                    </Col>
                                                </>
                                            : null
                                        }

                                    </Row>
                                    
                                    </List.Item>
                            }
                        ></List>
                    </Col>
                    <Col offset={1} span={11}>
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

export default Research

