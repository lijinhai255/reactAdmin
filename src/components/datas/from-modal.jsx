import React, { Component } from 'react';

// table 
import { Table, Button, Popconfirm, message, Input, Checkbox, Popover, Radio, Modal, Spin } from 'antd';
import api from '../../axios'
import sty from './datas.module.less'
import FormBlock from './formblock'


class Datas extends Component {
    columns = [
        { show: true, title: 'id', width: 100, dataIndex: 'key', key: 'key', fixed: 'left' },
        { show: true, title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
        { show: true, title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
        { show: true, title: 'Column 1', dataIndex: 'address', key: '1' },
        { show: true, title: 'Column 2', dataIndex: 'address', key: '2' },
        { show: true, title: 'Column 3', dataIndex: 'address', key: '3' },
        { show: true, title: 'Column 4', dataIndex: 'address', key: '4' },
        { show: true, title: 'Column 5', dataIndex: 'address', key: '5' },
        { show: true, title: 'Column 6', dataIndex: 'address', key: '6' },
        { show: true, title: 'Column 7', dataIndex: 'address', key: '7' },
        { show: true, title: 'Column 8', dataIndex: 'address', key: '8' },
        {
            show: true,
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 80,
            render: (text, record, index) => <Button.Group>
                <Button size="small" onClick={ev => this.toEdit(record, index)} type="primary">编辑</Button>
                <Popconfirm
                    placement="topRight"
                    title="确定删除？"
                    okText="确定"
                    cancelText="取消"
                    onConfirm={ev => this.toDel(record.key, index)}
                >
                    <Button size="small" type="danger">删除</Button>
                </Popconfirm>
            </Button.Group>,
        },
    ]
    state = {
        showLoading: true,
        tableDT: null,
        pagination: {
            current: 1,
            defaultCurrent: 1,
            pageSize: 20,
            // showQuickJumper:true,
            size: 'small',
            total: 0,
            showLessItems: true,
            // simple: true,
            hideOnSinglePage: true,
            onChange: (page, pageSize) => this.changePage(page, pageSize)
        },
        tableCol: this.columns.filter(it => it.show),
        sort: {
            index: null,
            value: false
        },
        modalShow: false,  // 是否展示弹窗
        modalLoading: false,  // 是否展示loading
    }
    componentWillMount() {
        this.getData()
    }
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
        api.getListData(obj).then(res => {
            let r = res && res.data
            // console.log(r)
            if (r && r.status === 'ok') {
                r.data.pagination.current *= 1
                this.setState({
                    pagination: { ...pagination, ...r.data.pagination },
                    showLoading: false,
                    tableDT: r.data.list
                })
            }
        }).catch(err => {
            console.log(err)
            this.setState({
                showLoading: false
            })
            message.error('网络异常')
        })
    }
    changePage(page, pageSize) {
        // console.log(page, pageSize)

        this.getData({
            page
        })
    }
    toDel(key, index) {
        api.deleteItem(key).then(res => {
            let r = res && res.data && res.data.data
            // console.log('delete',r, key, index)
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
    toEdit(val) {
        console.log(val, 'edit ')
        this.setState({
            modalShow: true
        })
    }
    toSearch(val) {
        console.log(val)
        val = val.trim()
        if (!!val) {
            this.setState({
                showLoading: true
            })
            api.searchItem({ key: val }).then(res => {
                let r = res && res.data && res.data.data
                console.log(r)
                if (r && (r.status === 'ok') && r.result.length) {
                    this.setState({
                        tableDT: r.result,
                        pagination: r.pagination
                    })
                }
                else {
                    message.error('没有找到指定信息')
                }
                this.setState({
                    showLoading: false
                })
            }).catch(err => {
                console.log(err)
                this.setState({
                    showLoading: false
                })
                message.error('没有找到指定信息')
            })
        }
    }
    changeTableCol(val, target, index) {
        // console.log(val, target)
        this.columns[index].show = val
        this.setState({
            [target]: this.columns.filter(it => it.show)
        })
    }
    changeSort(val, target) {
        // console.log(val)
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
    renderMenu(arr) { // 复选框列表
        return <div>
            {
                arr.map((item, key) => (
                    <p className={sty.paddingTB} key={key}>
                        <Checkbox
                            checked={item.show}
                            onChange={ev => this.changeTableCol(ev.target.checked, 'tableCol', key)}>
                            {item.title}
                        </Checkbox>
                    </p>
                ))
            }
        </div>
    }
    renderRadioMenu(arr) {
        const options = [
            { label: '正序', value: 'ascend' },
            { label: '倒序', value: 'descend' },
            { label: '无', value: false },
        ];
        const radioStyle = {
            width: 100
        };
        const { sort } = this.state
        return (
            <div className={sty.paddingTB} >
                <Radio.Group onChange={ev => this.changeSort(ev.target.value, 'index')} value={sort.index}>
                    {
                        arr.map((item, key) => (
                            <div key={item.key}>
                                <Radio style={radioStyle} value={key}>{item.title}</Radio>
                                <Radio.Group
                                    value={sort.value}
                                    disabled={sort.index != key}
                                    options={options}
                                    onChange={ev => this.changeSort(ev.target.value, 'value')}
                                />
                            </div>
                        ))
                    }
                </Radio.Group>
            </div>
        )
    }
    render() {

        return (
            <div className="datas"
                style={st.paddingT}
            >
                <div className={sty.screen} >
                    <Popover placement="bottomLeft"
                        title="选择要显示的列"
                        content={this.renderMenu(this.columns)}
                        trigger="click"
                    >
                        <Button type="primary">列筛选</Button>
                    </Popover>
                    <Popover placement="bottomLeft"
                        title="选择要显示的列"
                        content={this.renderRadioMenu(this.columns)}
                        trigger="click"
                    >
                        <Button type="primary">排序</Button>
                    </Popover>
                    <Input.Search
                        placeholder="输入搜索内容"
                        enterButton="搜索"
                        // size="large"
                        style={{
                            width: 300,
                            marginLeft: 8
                        }}
                        onSearch={value => this.toSearch(value)}
                    />
                </div>
                <Table
                    loading={this.state.showLoading}
                    columns={this.state.tableCol}
                    dataSource={this.state.tableDT}
                    scroll={{ x: 1300 }}
                    pagination={this.state.pagination}
                />
                <Modal
                    title='modal 标题'
                    visible={this.state.modalShow}
                    footer={null}
                    header={null}
                    bodyStyle={{
                        paddingTop: 0
                    }}
                    style={{
                        minWidth: 400,
                    }}
                    width='60%'
                    onCancel={ev => this.setState({ modalShow: false })}
                >
                    {
                        this.state.modalLoading ?
                            <Spin tip="loading...">
                                <FormBlock
                                    showLoading={ev => this.setState({ modalLoading: true })}
                                    hideLoading={ev => this.setState({ modalLoading: false })}
                                    closeModal={ev => this.setState({ modalShow: false, modalLoading: false })}
                                    />
                            </Spin> :
                            <FormBlock
                                hideLoading={ev => this.setState({ modalLoading: false })}
                                showLoading={ev => this.setState({ modalLoading: true })}
                                closeModal={ev => this.setState({ modalShow: false, modalLoading: false })}
                            />
                    }
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

export default Datas