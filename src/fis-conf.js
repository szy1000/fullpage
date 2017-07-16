// 设置项目属性
// fis.set('project.name', 'zjbar-micro');
// fis.set('project.static', '/static');
// fis.set('project.files', ['*.html', 'map.json', '/test/*']);

// // 引入模块化开发插件，设置规范为 commonJs 规范。

// fis.hook('commonjs', {
//     baseUrl: './modules',
//     extList: ['.js', '.es']
// });

// /*************************目录规范*****************************/

// // 开启同名依赖
// fis.match('/modules/**', {
//     useSameNameRequire: true
// });


// // ------ 配置lib
// fis.match('/lib/**.js', {
//     release: '${project.static}/$&'
// });

// // ------ 配置modules
// fis.match('/modules/(**)', {
//     release: '${project.static}/$1'
// });

// // 配置css
// fis.match(/^\/modules\/(.*\.scss)$/i, {
//     parser: fis.plugin('node-sass', {
//         include_paths: ['modules/css', 'components'] // 加入文件查找目录
//     }),
//     rExt: '.css',
//     isMod: true,
//     release: '${project.static}/$1'
// });
// fis.match(/^\/modules\/(.*\.css)$/i, {
//     isMod: true,
//     release: '${project.static}/$1'
// })
// fis.match(/^\/modules\/(.*\.(?:png|jpg|gif))$/i, {
//     release: '${project.static}/$1'
// });

// fis.match(/^\/modules\/(.*\.html)$/i, {
//     postprocessor: fis.plugin('extras_uri')
// });

// // 配置js
// fis.match(/^\/modules\/(.*\.es)$/i, {
//     // parser: fis.plugin('babel-5.x'),
//     rExt: 'js',
//     isMod: true,
//     release: '${project.static}/$1'
// });
// fis.match(/^\/modules\/(.*\.js)$/i, {
//     isMod: true,
//     release: '${project.static}/$1'
// });


// /*************************打包规范*****************************/

// // 因为是纯前段项目，依赖不能自动被加载进来，所以这里需要借助一个 loader 来完成，
// // 注意：与后端结合的项目不需要此插件!!!
// fis.match('::package', {
//     // npm install [-g] fis3-postpackager-loader
//     // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
//     postpackager: fis.plugin('loader', {
//         resourceType: 'commonJs',
//         useInlineMap: true // 资源映射表内嵌
//     })
// });

// // 公用js
// var map = {
//     'prd-debug': {
//         host: '',
//         path: ''
//     },
//     'prd': {
//         host: 'http://static.homolo.net',
//         path: '/prototype/${project.name}'
//     }
// };

// fis.util.map(map, function (k, v) {
//     var domain = v.host + v.path;

//     fis.media(k)
//         .match('**.{es,js}', {
//             useHash: false,
//             domain: domain
//         })
//         .match('**.{scss,css}', {
//             useSprite: true,
//             useHash: false,
//             domain: domain
//         })
//         .match('::image', {
//             useHash: false,
//             domain: domain
//         })
//         .match('**/(*_{x,y,z}.png)', {
//             release: '/pkg/$1'
//         })
//         // 启用打包插件，必须匹配 ::package
//         .match('::package', {
//             spriter: fis.plugin('csssprites', {
//                 layout: 'matrix',
//                 // scale: 0.5, // 移动端二倍图用
//                 margin: '10'
//             }),
//             postpackager: fis.plugin('loader', {
//                 allInOne: true,
//             })
//         })
//         .match('/lib/es5-{shim,sham}.js', {
//             packTo: '/pkg/es5-shim.js'
//         })
//         .match('/components/**.css', {
//             packTo: '/pkg/components.css'
//         })
//         .match('/components/**.js', {
//             packTo: '/pkg/components.js'
//         })
//         .match('/modules/**.{scss,css}', {
//             packTo: '/pkg/modules.css'
//         })
//         .match('/modules/css/**.{scss,css}', {
//             packTo: ''
//         })
//         .match('/modules/css/common.scss', {
//             packTo: '/pkg/common.css'
//         })
//         .match('/modules/**.{es,js}', {
//             packTo: '/pkg/modules.js'
//         })
// });

// fis.hook('relative');
// fis.match('*',{
//   relative:true
// })

// // 发布产品库
// fis.media('prd')
// .match('**.{es,js}', {
//     optimizer: fis.plugin('uglify-js')
// })
// .match('**.{scss,css}', {
//     optimizer: fis.plugin('clean-css', {
//         'keepBreaks': true //保持一个规则一个换行
//     })
// });


//时间戳
fis.hook('commonjs', {
  baseUrl: './modules',
  extList: ['.js', '.es']
});

// 开启同名依赖
fis.match('/modules/**', {
    useSameNameRequire: true
});

// fis.match('*', {
//   useHash: false
// });


// ------ 配置lib
fis.match('/lib/**.js', {
    release: 'pkg/$&'
});

fis.match('/modules/(**)', {
    release: 'static/$1'
});

//js压缩  启用 es6-babel 插件，解析 .es6 后缀为 .js
fis.match('*.{es6,js}',{
  // rExt: '.js',
  // parser: fis.plugin('es6-babel'),
})



// 配置css
fis.match(/^\/modules\/(.*\.scss)$/i, {
    parser: fis.plugin('node-sass', {
        include_paths: ['modules/css', 'components'] // 加入文件查找目录
    }),
    rExt: '.css',
    isMod: true,
    release: 'modules/$1'
});
fis.match(/^\/modules\/(.*\.css)$/i, {
    isMod: true,
    release: 'modules/$1'
})
fis.match(/^\/modules\/(.*\.(?:png|jpg|gif))$/i, {
    release: 'pkg/$1'
});

//png
fis.match('::package', {
  spriter: fis.plugin('csssprites')
})

// // 对 CSS 进行图片合并
fis.match('*.css', {
  // 给匹配到的文件分配属性 `useSprite`
  useSprite: true
});

fis.match('*.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor')
});


fis.match('js/*.js', {
    isMod: true, // 设置 comp 下都是一些组件，组件建议都是匿名方式 define
    // release: 'pkg/$0'
});

fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true // 资源映射表内嵌
    })
});

//讲所有css或者scss文件打包成1个文件
fis.match('::packager', {
  postpackager: fis.plugin('loader', {
    //allInOne: true
  })
});

//使用相对路径 进行输出
fis.hook('relative');
fis.match('*',{
  relative:true
})

// 公用js
var map = {
    'prd': {
        host: '',
        path: ''
    },
};

fis.util.map(map, function (k, v) {
    var domain = v.host + v.path;
    fis.media(k)
        .match('**.{es,js}', {
            useHash: false,
            domain: domain
        })
        .match('**.{scss,css}', {
            useSprite: true,
            useHash: false,
            domain: domain
        })
        .match('::image', {
            useHash: false,
            domain: domain
        })
        .match('**/(*_{x,y,z}.png)', {
            release: 'pkg/$1'
        })
        // 启用打包插件，必须匹配 ::package
        .match('::package', {
            spriter: fis.plugin('csssprites', {
                layout: 'matrix',
                // scale: 0.5, // 移动端二倍图用
                margin: '10'
            }),
            postpackager: fis.plugin('loader', {
                allInOne: true,
            })
        })
        .match('/lib/es5-{shim,sham}.js', {
            packTo: 'pkg/es5-shim.js'
        })
        .match('/modules/**.{scss,css}', {
            relative: true,
            packTo: 'pkg/css/modules.css'
        })
        .match('/modules/css/**.{scss,css}', {
            packTo: ''
        })
        .match('/modules/css/common.scss', {
            packTo: 'pkg/css/common.css'
        })
        .match('/modules/**.{es,js}', {
            packTo: 'pkg/js/modules.js'
        })
});

fis.media('prd')
.match('*.{scss,css}', {
  optimizer: fis.plugin('clean-css',{
    'keepBreaks': true  //保存换行
  }),
  // postprocessor : fis.plugin("autoprefixer",{
  //     // https://github.com/ai/browserslist#queries
  //     "browsers": ['Firefox >= 20', 'Safari >= 6', 'Explorer >= 9', 'Chrome >= 12', "ChromeAndroid >= 4.0"],
  //     "flexboxfixer": true,
  //     "gradientfixer": true
  // })
  
})


//js压缩  启用 es6-babel 插件，解析 .es6 后缀为 .js
.match('*.{es6,js}',{
  rExt: '.js',
  // parser: fis.plugin('es6-babel'),
  // fis-optimizer-uglify-js 插件进行压缩
  // optimizer: fis.plugin('uglify-js'),
  // packTo: 'pkg/packager.js'
})
.match('./js/jquery.{es6,js}',{
  rExt: '.js',
})

.match('/lib/**.js', {
    release: 'pkg/$&'
});