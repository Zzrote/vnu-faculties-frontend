import React from 'react'
import { Modal, Button, Form , Input, Alert} from 'antd'
import {login} from '../apis/AuthAPI'
import {setCookie, clearCookies } from '../helper/Cookie'
import {message as msgSender} from 'antd'


class LoginModal extends React.Component {
    state = { 
        visible: false ,
        error : null,
        item : {
            username : '',
            password : ''
        }
        
    }

    onOpen = async () => {
        this.setState({
            visible : true,
            loggedIn : false
        })
    }


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
        })

        const {item} = this.state
        const { success, data, message} = await login(item)

        if (!success)
            return this.setState({
                error : message
            })

        const { userId, userRole, token } = data 

        setCookie("userId", userId.toString())
        setCookie("userRole", userRole)
        setCookie("token", token)
        
        this.props.setContext({
            userId : userId, 
            role : userRole, 
            token
        })

        msgSender.success("Successfully logged in !")

        this.setState({
            visible : false,
            loggedIn : true
        })

    };

    onLogout = e => {
        clearCookies()
        
        this.props.setContext({
            userId : null, 
            role : null, 
            token : null
        })

        window.location.reload()
    }

    onCancel = e => {
        this.setState({
            visible: false,
        })
    }


    render() {
        const {visible, error, item, loggedIn} = this.state
        
        const { username, password }  = item
 
        return (
            <div>
                {
                    !this.props.context.userId ?
                    <>

                        <Button type="primary" onClick={this.onOpen} style={{ backgroundColor : "#ff5050", color : "white", borderColor: "transparent"}}>Login</Button>
                        <Modal
                            centered
                            title="LOGIN"
                            okText="OK"
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
                                    <Input id="password" type="password" onChange = {this.onChangeInput('password')} value={password}/>
                                </Form>
                            </div>
                        </Modal>
                        
                    </>
                    : <Button onClick={this.onLogout} style={{ backgroundColor : "#ff5050", color : "white", borderColor: "transparent"}}>Logout</Button>
                }
                
            </div>
        )
    }
}

export default LoginModal