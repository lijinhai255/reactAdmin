import React, { Component } from 'react'
import { Table, Button, Popconfirm, message, Modal, Form, Select, Input, Icon, Upload } from 'antd';
const { Option } = Select;
export default class AddProduct extends Component {
    constructor(props){
        super(props)
        this.state={
            visible:false,
            loading:false,
        }
    }
    componentDidMount(){
        this.setState({
            visible: this.props.isShowAddProductModal,
            product_Type: this.props.product_Type
            
        })
    }
    componentWillReceiveProps(newProps) {
        const { isShowAddProductModal } = newProps
        this.setState({
            visible: isShowAddProductModal,

        })
    }
    handleCancel = () => {
        this.setState({ visible: false });
    };
    renderSelectOption() {
        
        return this.props.product_Type.map(item => <Option value={item.code}>{item.value} </Option>)

    }
    // 信息提交
    //表单提交的方法 
    handleSubmit = e => {
        e.preventDefault();
        this.setState({ loading: true });
        this.props.form.validateFields((err, values) => {
            if (!err) {
             
            }
        });
        // setTimeout(() => {
        //     this.setState({ loading: false, visible: false });
        // }, 3000);
    };
    //图片上传执行的方法
    normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList.slice(-1);
    };
    componentWillUnmount() {
        this.setState({
            visible: true,
            loading: false,
            showEditData: {}
        })
    }
    render() {
        const { getFieldDecorator } = this.props;
        let { loading, visible } = this.state
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <div>
                <Modal
                    visible={visible}
                    title="添加产品"
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            取消
            </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleSubmit}>
                            保存
            </Button>,
                    ]}
                >
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="产品类型" hasFeedback>
                            {getFieldDecorator('product_type', {
                                rules: [{ required: true, message: '请选择产品类型!' }],
                            })(
                                <Select placeholder="请选择产品类型">
                                    {this.renderSelectOption()}
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="产品名称">
                            {getFieldDecorator('product_name', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写产品名称',
                                    },
                                ],
                            })(<Input placeholder="请填写产品名称" />)}
                        </Form.Item>
                        <Form.Item label="产品logo" extra="点击上传">
                            {getFieldDecorator('product_logo', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                            })(
                                <Upload name="logo" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture">
                                    <Button>
                                        <Icon type="upload" /> 上传
                                    </Button>
                                </Upload>,
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="跳转链接">
                            {getFieldDecorator('product_link', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写跳转链接',
                                    },
                                ],
                            })(<Input placeholder="请填写跳转链接" />)}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const st = {
    paddingT: {
        paddingTop: '16px'
    },
    marginT: {
        marginTop: '16px'
    }
}