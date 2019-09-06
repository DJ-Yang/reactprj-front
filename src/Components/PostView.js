import React, { Component } from 'react'

// const dummy_prop = {
//     title: '테스트용 타이틀입니다',
//     content: '테스트용 글입니다',
// }


export default class PostView extends Component {
    render() {
        const {title, content} = this.props
        return (
            <div>
                <h2>{title}</h2>
                <p>{content}</p>
            </div>
        )
    }
}