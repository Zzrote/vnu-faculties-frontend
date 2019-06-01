import React from 'react'
import { Modal, Button, Form , Input, Alert, Select} from 'antd'
import {save} from '../../../apis/FacultyAPI'
import {findAll} from '../../../apis/DepartmentAPI'
import {message as msgSender} from 'antd'

const {Option} = Select

class EditFacultyModal extends React.Component {
    state = { 
        visible: false ,
        error : null,
        item : {
            username : '',
            fullname : '',
            email : '',
            code : '',
            degree : '',
            phoneNumber : '',
            role : null,
            password : '',
            passwordRetype : '',
            department : null
        },
        relativeItems : []
        
    };

    onOpen = async () => {
        const { success : deptSuccess , data : deptData, message : deptMessage } = await findAll()
        if (deptSuccess)
            this.setState({
                visible : true,
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
        
        if (item.password !== item.passwordRetype) 
            return this.setState({
                error : message
            })

        const { success, data, message} = await save(
            item
        )

        if (!success)
            return this.setState({
                error : message
            })
        
        msgSender.success("Successfully added new account !")

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
        const { username, fullname, email, code, degree, phoneNumber, role, department, password, passwordRetype }  = item
 
        return (
            <div>
                <Button type="primary" onClick={this.onOpen}>Add</Button>
                <Modal
                    centered
                    title="FACULTY INFOMATION"
                    okText="Add"
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
                            <Input id="username" value={username} onChange={this.onChangeInput("username")}/> 
                            <label>Password</label>
                            <Input id="password" value={password} type="password" onChange={this.onChangeInput("password")}/>   
                            <label>Password Retype</label>
                            <Input id="passwordRetyped" value={passwordRetype} type="password" onChange={this.onChangeInput("passwordRetype")}/>   
                            <label>Role</label>
                            <Select id = "role" defaultValue={role} onChange={this.onChangeInput("role")}>
                                <Option value="admin">Admin</Option>
                                <Option value="faculty">Teacher</Option>
                            </Select>
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
                            <label>Code</label>
                            <Input id="code" onChange = {this.onChangeInput('code')} value={code}/>
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

export default EditFacultyModal