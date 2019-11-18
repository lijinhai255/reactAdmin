import React, { Component } from 'react'
import { Table, Button, Popconfirm, message, Modal, Form, Select, Input, Icon, Upload } from 'antd';
const { Option } = Select;
const fileList = [
    {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
        uid: '-2',
        name: 'yyy.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
];
class EditModal extends Component {
    constructor(props){
        super(props)
        this.state={
            visible: false,
            loading: false,
            showEditData:{}
        }

    }
    componentDidMount(){
        this.setState({
            visible :this.props.isShowEidtModal,
            showEditData: this.props.showEditData
        })
    }
    componentWillReceiveProps(newProps){
        const { isShowEidtModal, showEditData} = newProps
        this.setState({
            visible: isShowEidtModal,
            showEditData,
            formaData:{}

        })
    }
    // eslint-disable-next-line react/sort-comp
    handleCancel = () => {
        this.setState({ visible: false });
    };
    //图片上传执行的方法
    normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList.slice(-1);
    };
    //表单提交的方法 
    handleSubmit = e => {
        e.preventDefault();
        this.setState({ loading: true });        
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    formData: {
                        'id': this.props.showEditData["id"],
                        'url': values["product_link"],
                        'logo': values["product_logo"][0].thumbUrl,
                        'name': values["product_name"],
                        'type': values["product_type"]
                    },
                    visible:false
                }, () => {
                    //执行属性方法  并传递数据y
                        this.props.getEditData(this.state.formData)    
                })
            }
        });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };
    componentWillUnmount() {
        this.setState({
            visible: true,
            loading: false,
            showEditData: {}
        })
    }
    createProductType(){
        return this.props.productType.map(item => <Option value={item.code}>{item.value} </Option>) 

    }
    render() {
        const { visible, loading } = this.state
        const { getFieldDecorator } = this.props.form;
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
                                initialValue: this.state.showEditData.type
                            })(
                                <Select placeholder="请选择产品类型">
                                   {this.createProductType() }
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
                                initialValue: this.state.showEditData.name
                            })(<Input placeholder="请填写产品名称"  />)}
                        </Form.Item>
                        <Form.Item label="产品logo" extra="点击上传">
                            {getFieldDecorator('product_logo', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                                initialValue: [{
                                    uid: '1',
                                    name: 'yyy.png',
                                    status: 'done',
                                    url: this.state.showEditData.logo,
                                    thumbUrl: this.state.showEditData.logo,
                                },]
                            })(
                                <Upload name="logo" action='https://www.mocky.io/v2/5cc8019d300000980a055e76' listType="picture" >
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
                                initialValue: this.state.showEditData.url
                            })(<Input placeholder="请填写跳转链接" />)}
                        </Form.Item>
                    </Form>
                </Modal>

            </div>
        )
    }
 
}
const SuperEditModal = Form.create({ name: 'validate_other' })(EditModal);
export default  SuperEditModal