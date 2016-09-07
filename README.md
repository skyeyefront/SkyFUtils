# SkyFUtils 项目

### 安装
* `npm install`
* 天眼Npm源切换 `npm set registry http://10.16.66.42:5010/`
* 天眼Npm服务 http://10.16.66.42:5011/

### 如何使用
* dev(开发模式): `npm run dev`
* pro(发布模式): `npm run pro`
* lib(库文件UMD构建模式): `npm run lib`

### 自定义配置
* 配置文件: `config.custom.js`
* 配置文档: http://10.16.66.42:5011/package/@qnpm/skyfenv

### 上线流程(请使用root权限)
* 第一步: 将代码部署到线上环境
* 第二步: 若lib有更新或第一次部署, 则执行`npm run lib`进行lib构建, 否则跳过
* 第三步: 若项目有更新或第一次部署, 则执行`npm run pro`进行项目构建, 否则跳过
* 第四步: 第一次部署执行`npm run pm2start`启动服务, 否则`npm run pm2restart`重启服务
* 第五步  执行`pm2 list`或者`npm run pm2show`查看服务是否已经Running
