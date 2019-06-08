import React from 'react'

export default class Toc extends React.Component {
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

  returnTitle(string) {
    const link = this.createLink(string)
    return <a href={`${link}`}>{`${this.stringReplacer(string, /#+/g, '')}`}</a>
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
    const text = '# test\nthis is a test man.  ## Test2 \n'
    const regex = /#+\s[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf\w\s!?()]+\n/g
    const codeRegex = /```*([\s\S]+?)```/g
    const content = this.stringReplacer(text, codeRegex, ' ')
    let headers
    if (typeof content === 'string') {
      headers = content.match(regex)
    }
    const toc = headers.map(header => <li>{this.createAnchorLink(header)}</li>)
    return (
      <div className='toc'>
        <ul className='toc-list'>{toc}</ul>
      </div>
    )
  }
}
