const fs = require('fs');
const gulp = require('gulp');
const rollup = require('rollup');
const babel = require('@rollup/plugin-babel').default;
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { minify } = require('terser');
const header = require('./header');

const pkgJson = fs.readFileSync(`${process.cwd()}/package.json`);
const pkgObj = JSON.parse(pkgJson);
const libName = pkgObj.name;

gulp.task('bundleJs', async () => {
  // 打包并转ES5
  let bundle = await rollup.rollup({
    input: './src/main.js',
    plugins: [
      babel({
        babelHelpers: 'bundled',
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                chrome: 4,
                ie: 9,
                firefox: 4
              }
            }
          ]
        ]
      }),
      nodeResolve()
    ]
  });

  // 添加头部并生成文件
  bundle = await bundle.write({
    file: `${process.cwd()}/dist/${libName}.js`,
    format: 'umd',
    name: libName,
    banner: header,
    indent: '  '
  });

  // 压缩、添加头部并生成文件
  const minified = await minify(bundle.output[0].code, {
    output: {
      comments: false,
      preamble: header
    }
  });


  fs.writeFileSync(`${process.cwd()}/dist/${libName}.min.js`, minified.code);

  // 拷贝文件到文档目录
  fs.copyFileSync(`${process.cwd()}/dist/${libName}.js`, `${process.cwd()}/docs/galaxy/assets/js/${libName}.js`);
  fs.copyFileSync(`${process.cwd()}/dist/${libName}.min.js`, `${process.cwd()}/docs/galaxy/assets/js/${libName}.min.js`);
});

gulp.task('default', gulp.series(['bundleJs']));