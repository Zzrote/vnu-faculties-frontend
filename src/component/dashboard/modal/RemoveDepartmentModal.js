import React from 'react'
import { Modal, Button, Form , Input, Alert, Select} from 'antd'
import {removeById} from '../../../apis/DepartmentAPI'
import {message as msgSender} from 'antd'

class RemoveDepartmentModal extends React.Component {
    state = { 
        visible: false ,
        error : null
    };

    onOpen = async () => {
        this.setState({
            visible : true,
        })
    }

    onSubmit = async e => {
        e.preventDefault()

        this.setState({
            error : null,
        })
        const {departmentId , reloadItems} = this.props
        const { success, data, message} = await removeById(departmentId)

        if (!success)
            return this.setState({
                error : message
            })
        
        msgSender.success("Successfully removed the department")

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
        const {visible, error} = this.state
        return (
            <div>
                <Button type="danger" onClick={this.onOpen} icon="delete"></Button>
                <Modal
                    centered
                    title="NOTIFICATION"
                    okText="Remove"
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
                        
                        <p>Are you sure to remove this department</p>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default RemoveDepartmentModal