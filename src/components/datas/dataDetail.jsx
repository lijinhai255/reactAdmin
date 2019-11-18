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
            pagination: {
                current: 1,
                pageSize: 10,
                total: 30,
                onChange: (page) => this.changePage(page)
            },
            tableCol: (this.columns && this.columns.filter(it => it.show)),
            loading: false,
            type: 1,
        }
    }
    
    componentDidMount() {
        this.getData(true);// 获取用户信息接口
    }
    renderSex(type){
        console.log(type)
        return +type===1?"男":+type===2?"女":"没有填写"
    }
    columns = [
        { show: true, title: '姓名', dataIndex: 'name', key: 'key', },
        { show: true, title: '性别', dataIndex: 'sex', key: 'type', 
        render: (type) => this.renderSex(type)} ,
        { show: true, title: '手机号', dataIndex: 'phone', key: 'name', },
        {
            show: true, title: '提交时间', dataIndex: 'createTime', key: 'createTime'
        },
        {
            show: true, title: '渠道', dataIndex: 'channel', key: 'channel'
        },
        {
            show: true, title: '借款金额', dataIndex: 'loanAmount', key: 'loanAmount'
        }
    ]
    // 定义一个方法 用于获取 用户信息
    getData(showLoading){
        this.setState({
            showLoading: showLoading,
        });
        api.getUserData(this.state.pagination.current,this.state.pagination.pageSize).then(({data})=>{
            this.setState({
                showLoading:false
            })
            if(data){
                // let data = data.list;
                let {pagination} = this.state;
                pagination.total = +data.totalPages*10;
                this.setState({
                    tableDT:data.content,
                    pagination

                })


            }
        })
    }
    //获取当前域名
    changePage(page) {
        // this.clearTimeout();
        // this.props.history.push(`/app/list/${this.state.type}/${page}`);
        let {pagination} = this.state;
        pagination.current = page
        this.setState({
            pagination
        },this.getData(true))
    }
    render() {
        console.log(this.state.pagination,"state")
        return (
            <div className="datas"
                style={st.paddingT}
            >
                <Table
                    loading={this.state.showLoading}
                    columns={ this.state.tableCol}
                    scroll={{ x: 1300 }}
                    dataSource={this.state.tableDT}
                    pagination={this.state.pagination}

                />
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
