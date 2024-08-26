module.exports = {
  semi: true,
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  bracketsSpacing: true, // 对象中的空格
  bracketSameLine: false, // 对象中的空格
  endOfLine: 'auto', // 结尾是 \n \r \n \r
  trailingComma: 'none', // 结尾处不加逗号
  htmlWhitespaceSensitivity: 'ignore', // 忽略'>'下落问题
  overrides: [
    {
      files: '*.vue',
      options: {
        printWidth: 200
      }
    }
  ]
}
