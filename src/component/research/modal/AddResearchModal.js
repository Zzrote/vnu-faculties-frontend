import React from 'react'
import { Modal, Button, Form , Input, Alert, Select} from 'antd'
import {save} from '../../../apis/ResearchAPI'
import {message as msgSender} from 'antd'

const {Option} = Select

class AddResearchModal extends React.Component {
    state = { 
        visible: false ,
        error : null,
        item : {
            name : ''
        }
    }

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

        
        const {reloadItems } = this.props
        const {item} = this.state
        const { success, data, message} = await save(
            item
        )

        if (!success)
            return this.setState({
                error : message
            })
        
        msgSender.success("Successfully added new research field")

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
        
        const { name }  = item
 
        return (
            <div>
                <Button type="primary" onClick={this.onOpen}>Add</Button>
                <Modal
                    centered
                    title="RESEARCH FIELD INFOMATION"
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
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default AddResearchModal