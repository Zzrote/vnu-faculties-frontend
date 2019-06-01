import React from 'react'
import { Modal, Button, Form , Input, Alert, Select} from 'antd'
import {save} from '../../../apis/DepartmentAPI'
import {message as msgSender} from 'antd'

const {Option} = Select

class AddDepartmentModal extends React.Component {
    state = { 
        visible: false ,
        error : null,
        item : {
            name : '',
            type : null,
            address : '',
            website : ''
        }
        
    };

    onOpen = async () => {
        this.setState({
            visible : true
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

        const {reloadItems} = this.props
        const {item} = this.state

        const { success, data, message} = await save(
            item
        )

        if (!success)
            return this.setState({
                error : message
            })
        
        msgSender.success("Successfully added the department")

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
        const {visible, error, item} = this.state
        
        const { name, type, address, website }  = item
 
        return (
            <div>
                <Button type="primary" onClick={this.onOpen}>Add</Button>
                <Modal
                    centered
                    title="DEPARTMENT INFOMATION"
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
                            <label>Name</label>
                            <Input id="name" value={name} onChange={this.onChangeInput("name")}/>  
                            <label>Type</label>
                            <Select id = "type" defaultValue={type} onChange={this.onChangeInput("type")}>
                                <Option value="Subject">Subject</Option>
                                <Option value="Laboratory">Laboratory</Option>
                            </Select>
                            <label>Address</label>
                            <Input id="address" onChange = {this.onChangeInput('address')} value={address}/>
                            <label>Website</label>
                            <Input id="website" onChange = {this.onChangeInput('website')} value={website}/>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default AddDepartmentModal