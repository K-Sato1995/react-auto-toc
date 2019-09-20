# react-auto-toc

> Automatically create a table of contents.

[![NPM](https://img.shields.io/npm/v/react-auto-toc.svg)](https://www.npmjs.com/package/react-auto-toc) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Description

The idea is that you can automatically create a table of contents from your markdown text.

PRs/Issues are always welcome.

## Install

```bash
npm install --save react-auto-toc
```

## Usage

Pass your markdown content as a prop.

```jsx
import React, { Component } from 'react'
import Toc from 'react-auto-toc'

class Example extends Component {
  render() {
    const content = '# test \n your markdown Content # test2\n'
    return <Toc markdownText={content} />
  }
}
```

![output2](https://user-images.githubusercontent.com/32632542/62246012-b548a900-b41d-11e9-864c-33009a1117d1.gif)

## Custom style

The list(`ul`) has a class called `toc-list` and each item(`li`) has `header1`, `header2` or `header3` as its class. Lastly, every title(`a`) has a class called `toc-title`.

You can add styles to them in your css files.

## License

MIT © [K-Sato1995](https://github.com/K-Sato1995)
