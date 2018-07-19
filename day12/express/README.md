# nodejs
> * Express是一个简洁而灵活的nodejs,web应用框架，提供了一系列强大特性帮助创建各种Web应用和丰富的HTTP工具，使用Express可以快速的搭建一个完整功能的网站。他只是一个<strong>轻量级的Web框架</strong>，多数功能只是对HTTP协议中常用操作的封装，更多的功能需要插件或者综合其他模块来完成。
> * 核心特性：
      > * 接收：可以设置中间件来响应HTTP请求【被封装】。
      > * 处理：定义了路由表用于执行不同的HTTP请求动作【路由形式被封装】。
      > * 返回：可以通过向模板传递参数来动态渲染 HTML 页面【ejs模板的使用】。
> * MVC模型：
      > * 视图（view）:也就是我们说的网页
      > * 模型（model）:对存储数据库的操作
      > * 控制器（controller）:处理用户交互的部分，从视图读取数据，控制用户输入并且向模型发送数据。
      > * m  <---->   c  <---->  v
      > * express是一个典型的mvc模型。
          1、浏览器发起请求。
          2、由路由控制器接受，根据不同的路径定向到不同的控制器。
          3、控制器处理用户的具体请求，可能会访问数据库中的对象(即模型部分)
          4、控制器还要访问模板引擎，生成视图的HTML，最后在由控制器返回给浏览器，完成一次请求。
      
安装express:
```
前提条件：
必须将配置好的npm环境变量进行配置，默认地址是：C:\Users\DELL\AppData\Roaming\npm，配置好了之后在Git bash中
使用：npm list -g --depth 0 查找npm配置的全局包，这个时候就可以使用了。

npm install -g express-generator    *安装express生成器*
下面是具体的生成过程：
1、在命令行中cd到需要生成的server目录
2、运行命令：express app4
3、运行命令：cd app4
4、运行命令：npm install , npm start
```
