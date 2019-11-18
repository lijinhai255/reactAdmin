import React, { Component } from 'react'
import { message } from 'antd';
import ReactClipboard from 'react-clipboardjs-copy'
export default class CopyText extends Component {
    render() {
        let {text} = this.props
        return (
            <div>
                <section className="app-item">
                    <div className="app-item-desc">{text}</div>
                    <ReactClipboard text={text}
                        onSuccess={(e) => message.info('复制链接成功')}
                        onError={(e) => message.info('复制链接失败')}>
                        <button>复制链接</button>
                    </ReactClipboard>
                </section>
            </div>
        )
    }
}
