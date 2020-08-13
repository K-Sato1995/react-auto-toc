import React from 'react'
import PropTypes from 'prop-types'

export default class Toc extends React.Component {
  static propTypes = {
    markdownText: PropTypes.string,
    limit: PropTypes.number
  }
  stringReplacer(string, regex, mark) {
    return string.replace(regex, mark)
  }
  createLink(string) {
    var shapedString = string
      .toLowerCase()
      .replace(/#+\s/, '#')
      .trimRight()
    var strArr = shapedString.split(' ')
    var anchor = strArr.join('-')
    return this.stringReplacer(anchor, /[?!]/g, '-')
  }

  trimString(string, limit) {
    if (string.length >= limit) {
      let slicedString = string.slice(0, limit)
      return `${slicedString}..`
    }
    return string
  }

  returnTitle(string) {
    const link = this.createLink(string)
    const titleLimit = this.props.limit ? this.props.limit : 50
    const title = this.trimString(
      this.stringReplacer(string, /#+/g, ''),
      titleLimit
    )
    return (
      <a href={`${link}`} className='toc-title'>
        {title}
      </a>
    )
  }

  createAnchorLink(string) {
    if (/^#{1}\s[\s\S]/.test(string)) {
      return <li className='header1'>{this.returnTitle(string)}</li>
    } else if (/^#{2}\s[\s\S]/.test(string)) {
      return <li className='header2'>{this.returnTitle(string)}</li>
    } else if (/^#{3}\s[\s\S]/.test(string)) {
      return <li className='header3'>{this.returnTitle(string)}</li>
    } else {
      return ''
    }
  }

  render() {
    const regex = /#+\s[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf\w\s!?()//]+\n/g
    const codeRegex = /```*([\s\S]+?)```/g
    const content = this.stringReplacer(this.props.markdownText, codeRegex, ' ')
    let headers
    if (typeof content === 'string') {
      headers = content.match(regex)
    }
    const toc = headers.map((header, key) => (
      <span key={`${key}`}>{this.createAnchorLink(header)}</span>
    ))
    return <ul className='toc-list'>{toc}</ul>
  }
}
