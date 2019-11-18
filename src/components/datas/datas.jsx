import React, { Component } from 'react';

// table 
import { Table, Button, Popconfirm, message, Modal, Form, Select, Input, Icon, Upload } from 'antd';
// import { ReactClipboard } from 'react-clipboardjs-copy'
import CopyText from "../CopyText"
import api from '../../axios'
import sty from './datas.module.less'
// 引入编辑表单组件
import SuperEditModal from "../Modal/EditModal"
// import AddProduct from "../Modal/AddProduct"
const { Option } = Select;


class Datas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showLoading: true,
            tableDT: [],// 产品列表数据
            product_Type: [],// 产品类型列表
            toRenderProduct_Type: {},// 用于渲染产品的类型
            pagination: {
                current: 1,
                defaultCurrent: 1,
                pageSize: 100,
                // showQuickJumper:true,
                size: 'small',
                total: 0,
                showLessItems: true,
                // simple: true,
                hideOnSinglePage: true,
                onChange: (page, pageSize) => this.changePage(page, pageSize)
            },
            tableCol: this.columns && this.columns.filter(it => it.show),
            sort: {
                index: null,
                value: false
            },
            visible: false, 
            loading: false,
            formData: {//用于提交表单数据
                url: "",
                logo: "",
                name: "",
                type: ""

            },
            isShowEidtModal: false,// 编辑模块框是否展示
            showEditData: {},
            showEditDataKey: 1
        }
    }
    
    componentDidMount() {
        this.getData()
        this.getProductType()
    }
    object = {
        1: "征信产品"
    }
    columns = [
        { show: true, title: '产品序号', dataIndex: 'id', key: 'key', },
        { show: true, title: '产品类型', dataIndex: 'type', key: 'type', render: (type) => this.state.toRenderProduct_Type[type] },
        { show: true, title: '产品名称', dataIndex: 'name', key: 'name', },
        {
            show: true, title: '产品logo', dataIndex: 'logo', key: '1', className: "product",
            render: (text, record, index) => <img className={sty.img} src={text} alt="" />
        },
        {
            show: true, title: '跳转链接', dataIndex: 'id', key: '2',
            render: (text, render, index) => (<CopyText text={window.location.origin.includes('dev') ? "http://dev-hyy.5izhuan.com/#" + text :"http://hyy.5izhuan.com/#"+text} />)
        },
        {
            show: true,
            title: '操作',
            key: 'operation',
            render: (text, record, index) => <Button.Group>
                <Button size="small" onClick={ev => this.toEdit(record, index)} type="primary">编辑</Button>
                <Popconfirm
                    placement="topRight"
                    title="确定删除？"
                    okText="确定"
                    cancelText="取消"
                    onConfirm={ev => this.toDel(record.key, index)}
                >
                    {/* <Button size="small" type="danger">删除</Button>*/}
                </Popconfirm>
            </Button.Group>,
        }
    ]
    //获取当前域名
    
    //  获取数据
    getData(obj) {
        this.setState({
            showLoading: true
        })
        let { pagination, tableDT, sort } = this.state
        obj = obj || {}
        obj.page = obj.page || pagination.current || 1
        let sorts = (sort.index && sort.value) ? {
            sortKey: this.columns[sort.index].title,
            sortVal: sort.value
        } : {}
        obj = Object.assign(obj, sorts)
        api.getListData().then(res => {
            let r = res && res.data
            if (r) {
                // r.data.pagination.current *= 1
                this.setState({
                    // pagination: { ...pagination, ...r.data.pagination },
                    showLoading: false,
                    tableDT: r
                })
            }
        }).catch(err => {
            this.setState({
                showLoading: false
            })
            message.error('网络异常')
        })
    }
    // 获取产品的类型
    getProductType() {
        let { product_Type, toRenderProduct_Type } = this.state

        // 发送ajax
        api.getProductType().then(res => {
            let r = res && res.data

            if (r) {
                r.map((item, index) => {
                    toRenderProduct_Type[item.code] = item.value
                })
                this.setState({
                    product_Type: r
                })
            }
        })

    }
    changePage(page, pageSize) {

        this.getData({
            page
        })
    }
    toDel(key, index) {
        api.deleteItem(key).then(res => {
            let r = res && res.data && res.data.data
            if (r.status === 'ok') {
                message.success(r.msg)
                this.setState({
                    showLoading: true,
                })
                this.getData()
            } else {
                message.error('操作失败！')
            }
        })
    }
    toEdit(showEditData, showEditDataKey) {
        this.setState({
            isShowEidtModal: true,
            showEditData,
            showEditDataKey
        })

    }

    changeTableCol(val, target, index) {
        this.columns[index].show = val
        this.setState({
            [target]: this.columns.filter(it => it.show)
        })
    }
    changeSort(val, target) {
        const { sort, pagination } = this.state
        sort[target] = val
        this.setState({
            sort
        })
        if (val && sort.value) {
            this.setState({
                tableCol: this.renderCol()
            }, ev => {
                this.getData()
            })
        }
    }
    // 重新排序
    renderCol(col) {
        var col = col || this.columns;
        const { sort } = this.state
        if (sort.index && sort.value) {
            col[sort.index].sorter = true
            col[sort.index].sortOrder = sort.value
        }
        return col.filter(it => it.show)
    }
    showModal = () => {
        this.setState({
            visible: true,
            isShowEidtModal:false
        })
    }
    handleCancel = () => {
        let { getFieldValue,resetFields} = this.props.form
        resetFields()

        this.setState({ visible: false });
    };
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };
    //图片上传执行的方法
    normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    //表单提交的方法 
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let newProductLogo = values.product_logo[0].thumbUrl;
                this.setState({
                    formData: {
                        'name': values["product_name"],
                        'logo': values["product_logo"][0].thumbUrl,
                        'type': values["product_type"],
                        'url': values["product_link"],
                    },
                    loading:true
                }, () => {
                        api.savrProcuct(this.state.formData).then((data)=>{
                        this.setState({
                            visible: false,
                            loading:false,
                            
                        })
                        //页面刷新
                        let { getFieldValue, resetFields } = this.props.form
                            resetFields()
                        // window.location.reload();
                        this.getData()
                            // Modal.info("数据添加成功")

                    }).catch(()=>{
                        // Modal.info("数据添加失败")
                    })
                })
            }
        });
    };
    getEditData(editData) {
        api.savrProcuct(editData).then((editData) => {
            this.setState({
                visible: false,
                loading: false,

            })
            //页面刷新
            // window.location.reload();
            this.getData()
            // Modal.info("数据添加成功")

        }).catch(() => {
            // Modal.info("数据添加失败")
        })
        // //根据 key 匹配修改后的对象 并对state tableDt 进行赋值
        // let { tableDT } = this.state;
        // tableDT.map((item) => {
        //     if (item.key === editData.key) {
        //         item.product_name = editData.product_name
        //         item.product_type = editData.product_type
        //         item.product_link = editData.product_link
        //         item.product_icon = editData.product_logo
        //     }

        // })
        // //state 赋值
        // this.setState({
        //     tableDT
        // })
    }
    //渲染产品类型的选型
    renderSelectOption() {
        return this.state.product_Type.map(item => <Option value={item.code}>{item.value} </Option>   ) 
        
    }
    render() {
        const { visible, loading, product_Type } = this.state
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <div className="datas"
                style={st.paddingT}
            >
                <div className={sty.screen} >
                    <Button type="primary" onClick={this.showModal}>添加产品</Button>
                </div>
                <Table
                    loading={this.state.showLoading}
                    columns={this.state.tableCol}
                    scroll={{ x: 1300 }}
                    dataSource={this.state.tableDT}
                    pagination={this.state.pagination}
                />
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

                <SuperEditModal isShowEidtModal={this.state.isShowEidtModal} key={this.state.showEditDataKey} productType={product_Type} showEditData={this.state.showEditData} getEditData={(editData) => this.getEditData(editData)} />
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

const SuperData = Form.create({ name: 'validate_other' })(Datas);

export default SuperData

    // < AddProduct isShowAddProductModal = { visible } getFieldDecorator = { getFieldDecorator } product_Type = { this.state.product_Type } form = { this.props.form } ></AddProduct >
