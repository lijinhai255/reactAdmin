import React, { Component } from 'react'
import { Form, Select, DatePicker, TimePicker, Cascader, Input, InputNumber, Switch, Radio, Slider, Button, Upload, Icon, Rate, Checkbox, Row, Col, } from 'antd';
import moment from 'moment' // 时间插件的值需要用moment转化

const { Option } = Select;

class BlockForm extends Component {
    state = {
        ajaxAddr: [],
        addr: [
            {
                value: '0',
                label: 'Zhejiang',
                children: [
                    {
                        value: '0',
                        label: 'Hangzhou0',
                        children: [
                            {
                                value: '0',
                                label: 'West Lake0',
                                code: 123123
                            },
                        ],
                    },
                    {
                        value: '1',
                        label: 'Hangzhou',
                        children: [
                            {
                                value: 'xihu',
                                label: 'West Lake',
                                disabled: true
                            },
                        ],
                    },
                    {
                        value: '2',
                        label: 'Hangzhou',
                        children: [
                            {
                                value: 'xihu',
                                label: 'West Lake',
                            },
                        ],
                    },
                    {
                        value: '3',
                        label: 'Hangzhou',
                        children: [
                            {
                                value: 'xihu',
                                label: 'West Lake',
                            },
                        ],
                    },
                    {
                        value: '4',
                        label: 'Hangzhou',
                        children: [
                            {
                                value: 'xihu',
                                label: 'West Lake',
                            },
                        ],
                    },
                    {
                        value: '5',
                        label: 'Hangzhou',
                        children: [
                            {
                                value: 'xihu',
                                label: 'West Lake',
                            },
                        ],
                    },
                ],
            },
            {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [
                    {
                        value: 'nanjing',
                        label: 'Nanjing',
                        children: [
                            {
                                value: 'zhonghuamen',
                                label: 'Zhong Hua Men',
                            },
                        ],
                    },
                ],
            },
        ]
    }
    componentWillMount() {
        this.loadData()
    }
    componentDidMount() {
        // 这里可以给表单设置值
        // const { setFieldsValue } = this.props.form
        // setFieldsValue({
        //     ['date-picker']: moment('2019-03-05'),
        //     ['month-picker']: moment('2019-03'),
        //     ['range-picker']: [moment('2019-03'), moment('2019-03')],
        //     select: 'china',
        //     ['select-multiple']: ['red','green'],
        //     ['input-number']: 5,
        //     switch: undefined , // checked 开  undefined 关
        //     slider: 23,
        //     ['radio-group']:'a',
        //     ['radio-button']:'b',
        //     ['checkbox-group']: ['C','D'],
        //     rate: 2,
        //     name: 'qiphon',
        //     desc:'e这个是',
        //     pwd: 'addd',
        //     addr: ['0', '0', '0']
        // })
    }
    handleSubmit = e => {
        e.preventDefault();
        const { form } = this.props
        // 设置表单的值，用这种方法
        // form.setFieldsValue({
        //     ['input-number']: 123
        // })
        form.validateFieldsAndScroll({
            // first: true,  // 如果第一个不匹配停止校验
        }, (err, values) => {
            if (!err) {
                // 时间的字段，必须要在这里再次处理一下才能正常使用
                values['date-picker'] = values['date-picker'] && moment(values['date-picker']).format('YYYY-MM-DD')
                values['month-picker'] = values['month-picker'] && moment(values['month-picker']).format('YYYY-MM')
                values['range-picker'] = values['range-picker'] && values['range-picker'].map(item => moment(item).format("YYYY-MM-DD"))
                console.log('Received values of form: ', values);
            }
        });
    };

    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    addrFilter(inputValue, path) {  // 用于地区筛选  输入框提示
        return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    }
    addrShowMore(labels, selectedOptions) {
        // console.log(labels, selectedOptions, '================')
        return labels.map((label, i) => {
            const option = selectedOptions[i];
            // console.log(label, option)
            if (i === labels.length - 1) {
                return (
                    <span key={label}>
                        {label} {option.code && (<a >({option.code})</a>)}
                    </span>
                );
            }
            return <span key={label}>{label} / </span>;
        })
    }
    loadData = selectedOptions => {  // 数据懒加载
        if (selectedOptions) {
            const targetOption = selectedOptions[selectedOptions.length - 1];
            console.log(selectedOptions, 'target-->', targetOption)
            targetOption.loading = true;

            // load options lazily
            setTimeout(() => {
                targetOption.loading = false;
                let len = selectedOptions.length;
                if (len >= 4) {

                    targetOption.children = [
                        {
                            label: targetOption.label + (len + 1),
                            value: targetOption.label + (len + 1),
                        },
                        {
                            label: targetOption.label + (len + 2),
                            value: targetOption.label + (len + 2),
                        },
                    ];
                } else {
                    targetOption.children = [
                        {
                            label: targetOption.label + (len + 1),
                            value: targetOption.label + (len + 1),
                            isLeaf: false,
                        },
                        {
                            label: targetOption.label + (len + 2),
                            value: targetOption.label + (len + 2),
                            isLeaf: false,
                        },
                    ];
                }
                this.setState({
                    ajaxAddr: [...this.state.ajaxAddr]
                });
            }, 1000);
        } else {
            setTimeout(() => {
                this.setState({
                    ajaxAddr: [
                        {
                            label: `Dynamic0`,
                            value: 'Dynamic0',
                            isLeaf: false,
                        },
                        {
                            label: `lebel0`,
                            value: 'label0',
                            isLeaf: false,
                        },
                    ]
                })
            }, 2000)
        }
    };
    render() {
        const { form: { getFieldDecorator } } = this.props;
        const formItemLayout = {
            // hideRequiredMark: false, // 隐藏所有表单项的必选标记	Boolean  false (default)
            // labelAlign: 'left',    // label 文本标签的对齐方式  ‘left’ | 'right'
            layout: 'vertical',        // 表单布局	'horizontal'|'vertical'|'inline'
            // labelCol: { span: 6 },     // 文本标签的宽度
            // wrapperCol: { span: 14 },  // 表单元素的宽度
            style: {
                backgroundColor: '#fff',
                marginTop: '16px',
                paddingTop: '16px',
                height: '100%',
            }
        };
        const spanVertical = 5;  // 设置宽度
        // 时间选择器配置
        const dateconfig = {
            rules: [{
                // required: true, 
                message: 'Please select time!',
            }],
        };

        const addroptions = [
            {
                code: 'zhejiang',
                name: 'Zhejiang',
                items: [
                    {
                        code: 'hangzhou',
                        name: 'Hangzhou',
                        items: [
                            {
                                code: 'xihu',
                                name: 'West Lake',
                            },
                        ],
                    },
                ],
            },
            {
                code: 'jiangsu',
                name: 'Jiangsu',
                items: [
                    {
                        code: 'nanjing',
                        name: 'Nanjing',
                        items: [
                            {
                                code: 'zhonghuamen',
                                name: 'Zhong Hua Men',
                            },
                        ],
                    },
                ],
            },
        ];
        return (
            <Form {...formItemLayout} onSubmit={ev => this.handleSubmit(ev)} >
                <h1 className="center">this is form vertical</h1>
                <Row 
                    // type="flex" justify="space-around" align="top" 
                >
                    <Col span={ 16 } push={ 4 } >
                        {/* <Col span={spanVertical}> */}
                            {/* 时间选择，datepicker */}
                            < Form.Item label="DatePicker" >
                                {getFieldDecorator('date-picker', dateconfig)(
                                    <DatePicker showToday={false} />
                                )}
                            </Form.Item >
                        {/* </Col> */}
                        {/* <Col span={spanVertical}> */}
                            {/* 月 */}
                            < Form.Item label="DatePicker[month]" >
                                {getFieldDecorator('month-picker', dateconfig)(
                                    <DatePicker.MonthPicker month showToday={false} />,
                                )}
                            </Form.Item>
                        {/* </Col> */}
                        {/* <Col span={ spanVertical }> */}
                            {/* 区间 */}
                            < Form.Item label="DatePicker[month]" >
                                {getFieldDecorator('range-picker', dateconfig)(
                                    <DatePicker.RangePicker showToday={false} />,
                                )}
                            </Form.Item >
                        {/* </Col> */}
                        {/*  单选下拉表单 */}
                        < Form.Item label="Select" >
                            {
                                getFieldDecorator('select', {
                                    rules: [{
                                        // required: true, 
                                        message: '这里填写错误提示文字'
                                    }],
                                })(
                                    <Select placeholder="Please select a country">
                                        <Option value="china">China</Option>
                                        <Option value="usa">U.S.A</Option>
                                    </Select>,
                                )}
                        </Form.Item >
                        {/*  多选下拉表单 */}
                        < Form.Item label="Select[multiple]" >
                            {
                                getFieldDecorator('select-multiple', {
                                    rules: [
                                        {
                                            // required: true, 
                                            message: '这里填写错误提示文字',
                                            type: 'array'
                                        },
                                    ],
                                })(
                                    <Select mode="multiple" placeholder="Please select favourite colors">
                                        <Option value="red">Red</Option>
                                        <Option value="green">Green</Option>
                                        <Option value="blue">Blue</Option>
                                    </Select>,
                                )}
                        </Form.Item >
                        {/* 数值 */}
                        < Form.Item label="InputNumber" >
                            {
                                getFieldDecorator('input-number',
                                    {
                                        initialValue: 3,    // 默认值
                                    }
                                )(<InputNumber min={1} max={100} />)
                            }
                            <span className="ant-form-text"> machines</span>
                        </Form.Item >
                        {/* 开关 */}
                        < Form.Item label="Switch" >
                            {getFieldDecorator('switch', { valuePropName: 'checked' })(
                                <Switch checkedChildren="开" unCheckedChildren="关" />)}
                        </Form.Item >
                        {/* 滑块 */}
                        < Form.Item label="Slider" >
                            {getFieldDecorator('slider')(
                                <Slider
                                    marks={{
                                        0: 'A',
                                        20: 'B',
                                        40: 'C',
                                        60: 'D',
                                        80: 'E',
                                        100: 'F',
                                    }}
                                />,
                            )}
                        </Form.Item >
                        {/* 单选框 */}
                        < Form.Item label="Radio.Group" >
                            {getFieldDecorator('radio-group')(
                                <Radio.Group>
                                    <Radio value="a">item 1</Radio>
                                    <Radio value="b">item 2</Radio>
                                    <Radio value="c">item 3</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item >
                        {/* 按钮单选框 */}
                        < Form.Item label="Radio.Button" >
                            {getFieldDecorator('radio-button')(
                                <Radio.Group>
                                    <Radio.Button value="a">item 1</Radio.Button>
                                    <Radio.Button value="b">item 2</Radio.Button>
                                    <Radio.Button value="c">item 3</Radio.Button>
                                </Radio.Group>,
                            )}
                        </Form.Item >
                        {/*  复选框  */}
                        < Form.Item label="Checkbox.Group" >
                            {
                                getFieldDecorator('checkbox-group', {
                                    initialValue: ['A', 'B'],
                                })(
                                    <Checkbox.Group style={{ width: '100%' }}>
                                        <Row> {/** Row 表示行 */}
                                            <Col span={8}> {/** Col 表示列 span 表示占据的空间，一行平分 24 个 */}
                                                <Checkbox value="A">A</Checkbox>
                                            </Col>
                                            <Col span={8}>
                                                <Checkbox disabled value="B">
                                                    B
                                            </Checkbox>
                                            </Col>
                                            <Col span={8}>
                                                <Checkbox value="C">C</Checkbox>
                                            </Col>
                                            <Col span={8}>
                                                <Checkbox value="D">D</Checkbox>
                                            </Col>
                                            <Col span={8}>
                                                <Checkbox value="E">E</Checkbox>
                                            </Col>
                                        </Row>
                                    </Checkbox.Group> ,
                                )}
                        </Form.Item >
                        {/* 评分有多种，https://ant-design.gitee.io/components/rate-cn/ */}
                        < Form.Item label="Rate" >
                            {
                                getFieldDecorator('rate', {
                                    initialValue: 3.5,
                                })(<Rate />)}
                        </Form.Item >
                        {/* 文件上传 */}
                        < Form.Item label="Upload" extra="额外的提示性文字，可以没有" >
                            {
                                getFieldDecorator('upload', {
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,
                                })(
                                    <Upload name="logo" action="/upload.do" listType="picture">
                                        <Button>
                                            <Icon type="upload" /> Click to upload
                        </Button>
                                    </Upload> ,
                                )}
                        </Form.Item >
                        {/* 文件上传 */}
                        < Form.Item label="Dragger" >
                            <div className="dropbox">
                                {getFieldDecorator('dragger', {
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,
                                })(
                                    <Upload.Dragger name="files" action="/upload.do">
                                        <p className="ant-upload-drag-icon">
                                            <Icon type="inbox" />
                                        </p>
                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                    </Upload.Dragger>,
                                )}
                            </div>
                        </Form.Item >
                        {/* 文本框 */}
                        < Form.Item label="姓名" >
                            {
                                getFieldDecorator('name', {
                                    rules: [{
                                        // required: true,
                                        message: '请输入您的姓名',
                                        min: 2,
                                        max: 50,
                                        whitespace: true
                                    }]
                                })(<Input />)
                            }
                        </Form.Item >
                        {/* 文字域 */}
                        < Form.Item label="描述" >
                            {
                                getFieldDecorator('desc', {
                                    rules: [{
                                        // required: true,
                                        message: '请输入desc',
                                        whitespace: true
                                    }]
                                })(<Input.TextArea row={20} />)
                            }
                        </Form.Item >
                        {/* 密码 */}
                        < Form.Item label="密码" >
                            {
                                getFieldDecorator('pwd', {
                                    rules: [{
                                        // required: true,
                                        message: '请输入密码',
                                        whitespace: true,
                                        pattern: /^\w{ 4 } $ /, // 这里写验证正则
                                    }]
                                })(<Input.Password placeholder="input password" />)
                            }
                        </Form.Item >

                        {/* 联级  连动   */}
                        < Form.Item label="联级" >
                            {
                                getFieldDecorator('addr', {
                                    rules: [
                                        {
                                            // required: true,
                                            message: '请选择城市',
                                            type: 'array'
                                        }
                                    ],
                                    // initialValue: ['0', '0', '0'], // 设置默认值 value 的类型一定要一样 
                                })(<Cascader
                                    changeOnSelect
                                    allowClear
                                    // fieldNames={{ label: 'name', value: 'code', children: 'items' }} // 可以自定义字段名
                                    // options={ addroptions } // 自定义字段的时候可以用这个
                                    // 下面这个可以自定义展示内容
                                    displayRender={(label, selectedOptions) => this.addrShowMore(label, selectedOptions)}
                                    showSearch={{ filter: this.addrFilter }}
                                    suffixIcon={<Icon type="solution" />}
                                    options={this.state.addr}
                                    placeholder='请选择城市'
                                />)
                            }
                        </Form.Item >
                        {/* 动态加载联级 */}
                        {
                            <Form.Item label="ajaxAddr">
                                {
                                    getFieldDecorator('ajaxAddr', {
                                        rules: [{
                                            required: true,
                                            message: '请选择城市',
                                        }]
                                    })(<Cascader
                                        options={this.state.ajaxAddr}
                                        loadData={this.loadData}
                                        // onChange={ this.onChange}
                                        changeOnSelect
                                    />)
                                }
                            </Form.Item>
                        }
                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button type="default"
                                // onClick={ ev=>console.dir(this.props.Form) } 
                                onClick={ ev=>this.props.form.resetFields() } 
                            >
                                reset
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form >
        );
    }
}

export default Form.create({
    name: 'validate_other',   // 设置表单域内字段 id 的前缀 
})(BlockForm);