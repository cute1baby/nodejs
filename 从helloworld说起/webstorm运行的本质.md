#运行的本质：
我们在使用webstorm的时候配置nodejs，需要然后右键run程序的本质其实就是运行了这样的一条语句：
E:\vue_node\autoguigu\first>node helloworld.js
helloworld.js
文件所在路径>运行的程序[因为在环境变量中进行了配置] 文件名称

#cmd的使用：
cd ../   返回上一级
dir       打开上一级目录
d:      直接从一个磁盘切换到另外一个想要的磁盘
cls    清除上面的命令
path    查看该电脑的全局变量

相对路径和绝对路径：
相对路径：./[当前目录]后者../[父级目录]
./day07\video/7.windows操作基础.avi


绝对路径:e:/bb/fddf/或者(/[根目录]bb/fddf)
eg:D:\BaiduYunDownload\谢素辉\node.js\day07\video/7.windows操作基础.avi
/BaiduYunDownload\谢素辉\node.js\day07\video/7.windows操作基础.avi


#进程：progress
资源分配的最小单位

#window和global
假设有这样的一个情景，一段js.它有可能是浏览器运行的js，也有可能是服务端的js,那么怎么判断全局变量是window还是global呢。
直接就是：
console.log(global);  //判断是undefined还是一个对象值。








