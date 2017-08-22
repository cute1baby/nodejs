#npm 是什么？
npm是node的包管理工具。

npm install packageName
安装nodejs的依赖包。例如npm install express-generator就会默认安装express的最新版本,也可以通过指定版本号的方式安装特定版本。

npm install packageName -g
将包安装到全局环境中
但是代码中，直接通过require()的方式是没有办法调用全局安装的包的，全局的安装时供命令行驶的。

npm install packageName --save
安装的同时，将信息写入package.json中
项目路径中如果有package.json文件时,直接使用npm install方法就可以根据dependenclass配置安装所有的依赖包。

卸载安装：
npm uninstall packageName

#设置代理
npm config set proxy http://proxy.tencent.com:8080

#设置淘宝镜像文件：
npm config set registry https://registry.npm.taobao.org

默认情况下，系统会把文件安装到c盘下的某个位置，我们管理起来不太方便，所以我们需要修改文件夹路径，方便日后管理：
先新建文件夹：
e:\program files\nodejs\node-global
e:\program files\nodejs\node-cache
分别执行命令：
npm config set prefix 'e:\program files\nodejs\node-global'
以及
npm config set cache 'e:\program files\nodejs\node-cache'
这个时候全局安装的插件就不是默认安装到c盘中，而是在我们设置的d盘中了。

#两种向ejs模板中冲入数据的方法，
一种是:
（1）后台程序员将所有的数据都整理好，直接往ejs模板中充入数据。
一种是：
（2）前段程序员把前端的架子先搭建好，然后通过ajax方法向后台发请求，然后由前端口把数据冲入。










