import React from 'react'
import { Modal, Button, Form , Input, Alert, Select} from 'antd'
import { updateById} from '../../../apis/FacultyAPI'
import {findAll } from '../../../apis/DepartmentAPI' 
import {message as msgSender} from 'antd'

const {Option} = Select

class EditProfileModal extends React.Component {
    state = { 
        visible: false ,
        error : null,
        item : {
            degree : '',
            fullname : '',
            email : '',
            phoneNumber : '',
            department : null,
            username : '',
            code : '',
        },
        relativeItems : []
    };

    onOpen = async () => {
        const {item} = this.props

        const { success : deptSuccess , data : deptData, message : deptMessage } = await findAll()
        
        if (deptSuccess)
            this.setState({
                visible : true,
                item : item,
                relativeItems : deptData
            })
    };


    onChangeInput = (key) => (e) => {
        const {target} = e
        const value = target ? target.value :  e 
        
        const mergedItem = Object.assign({}, this.state.item , { [key] : value})
        this.setState({
            item : mergedItem
        })
    }

    onSubmit = async e => {
        e.preventDefault()

        this.setState({
            error : null,
        });

        const {reloadItems } = this.props
        const {item} = this.state
        const { success, data, message} = await updateById({
            facultyId : item._id,
            payload : item
        })

        if (!success)
            return this.setState({
                error : message
            })
        
        msgSender.success("Successfully edited the profile")

        this.setState({
            visible : false
        })

        await reloadItems()
    };

    onCancel = e => {
        this.setState({
            visible: false,
        });
    };


    render() {
        const {visible, error, item, relativeItems} = this.state
        const { username, fullname, email, degree, phoneNumber, department }  = item
 
        return (
            <div>
                <Button type="primary" onClick={this.onOpen}>Edit</Button>
                <Modal
                    centered
                    title="PROFILE"
                    okText="Edit"
                    cancelText="Cancel"
                    visible={visible}
                    onOk={this.onSubmit}
                    onCancel={this.onCancel}
                    maskClosable={true}
                >
                    <div >
                        { error ?
                                <Alert type ="error" closable showIcon message = { error } /> 
                        : null }
                        
                        <Form>
                            <label>Username</label>
                            <Input id="username" value={username} disabled onChange={this.onChangeInput("username")}/>  
                            <label>Fullname</label>
                            <Input id="fullname" onChange = {this.onChangeInput('fullname')} value={fullname}/>
                            <label>Email</label>
                            <Input id="email" onChange = {this.onChangeInput('email')} value={email}/>
                            <label>Degree</label>
                            <Select id = "degree" defaultValue={degree ? degree : null} onChange={this.onChangeInput("degree")}>
                                <Option value={null}>None</Option>
                                <Option value="GS">GS</Option>
                                <Option value="GS.TS">GS.TS</Option>
                                <Option value="PGS.TS">PGS.TS</Option>
                                <Option value="TS">TS</Option>
                                <Option value="ThS">ThS</Option>
                                <Option value="CN">CN</Option>
                            
                            </Select>
                            <label>Phone number</label>
                            <Input id="phoneNumber" onChange = {this.onChangeInput('phoneNumber')} value={phoneNumber}/>
                            <label>Department</label>
                            <Select id = "department" defaultValue={department ? department : null} onChange={this.onChangeInput("department")}>
                                <Option value={null}>None</Option>
                                {
                                    relativeItems ? 
                                    relativeItems.map( item => 
                                        <Option value={item._id}>{item.name}</Option>)
                                    : null
                                }
                            </Select>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default EditProfileModal