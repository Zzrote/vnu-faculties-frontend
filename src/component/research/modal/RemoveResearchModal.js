import React from 'react'
import { Modal, Button, Alert, Select} from 'antd'
import {removeById} from '../../../apis/DepartmentAPI'
import {message as msgSender} from 'antd'

const {Option} = Select

class RemoveResearchModal extends React.Component {
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
        const {researchId , reloadItems} = this.props
        const { success, data, message} = await removeById(researchId)

        if (!success)
            return this.setState({
                error : message
            })
        
        msgSender.success("Successfully removed the research field")

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
                        
                        <p>Are you sure to remove this research field</p>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default RemoveResearchModal