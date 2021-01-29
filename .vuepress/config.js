const moment = require('moment');
module.exports = {
  "title": "Hero博客",
  "base": "/blog/",
  "description": "天生我材必有用 千金散尽还复来",
  "dest": "blog",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/images/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        "text": "首页",
        "link": "/",
        "icon": "reco-home"
      }
    ],
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      }
    },
    "logo": "/images/gouku.gif",
    "lastUpdated": "Last Updated",
    "author": "Hero",
    "authorAvatar": "/images/gouku.gif",
    "record": "xxxx",
    "startYear": "2021",
    "mode": "dark",
    "modePicker": false
  },
  "markdown": {
    "lineNumbers": true
  },
  "plugins": [
    [
      "@vuepress-reco/vuepress-plugin-kan-ban-niang",
      {
        theme: ['miku', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'blackCat', 'z16'],
        clean: false,
        messages: {
          welcome: '我是Hero欢迎你的关注 ',
          home: '心里的花，我想要带你回家。',
          theme: '好吧，希望你能喜欢我的其他小伙伴。',
          close: '再见哦'
        }
      }
    ],
    [
      "@vuepress-reco/vuepress-plugin-bgm-player",
      {
        audios: [{
          name: '千千万万',
          artist: '深海鱼子酱',
          url: 'http://8.133.170.196/blog/bgm/1.mp3',
          cover: 'http://8.133.170.196/blog/images/1.png'
        }],
        autoShrink: true,
        shrinkMode: 'mini',
        floatPosition: 'left'
      }
    ],
    [
      "@vuepress/last-updated"
    ]
  ]
}
