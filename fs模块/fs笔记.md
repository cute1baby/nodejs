###FS:File System
fs模块是文件操作的时候，它提供了文件的读取，写入，更名，删除，遍历目录等操作。
与其他模块不同的是，fs模块中所有的操作都提供了异步的和同步两个版本，例如读取文件内容的函数有异步的fs.resdFile()和同步的fs.readFileSync();

###异步IO是什么意思？
 根据回调函数里面的执行时机来执行里面的代码，而不是一步一步的自上而下的去把整个代码给执行完,这种情况叫做异步。

读取文件的时候：
如果使用的是readFile(),可以在第二个参数，异步函数中抓获错误异常。
如果使用的是readFileSync(),那么可以通过try{ }catch(err){ },把错误信息打印出来。

试图执行代码：
try{
    //逻辑代码
}catch(err){   //如果出错,会抓住错误
    //错误处理
}
//最后不管这段代码有错或者没错，都会往下执行。


###把文件作为一个整体都写入磁盘
如果在程序员将要写入磁盘的时候，数据还没有全部准备好，那就无法把文件全部一次写入。

options:
file <String> filename
data <String> | <Buffer>
option <Object> | <String>
encoding <String> | <Null> default ='utf8'
mode <Number> default = Oo666
flag <String> default = 'w'
callback <Function>

Callback 只有一个参数:err

option:flag
//r:以读取模式打开文件。    //read
//r+:以读取模式打开文件。
//w:以写入模式打开文件，如果文件不存在则创建
//w+:以读取模式打开文件，如果文件不存在则创建
//a:以追加模式打开文件，如果文件不存在则创建。   //append
//a+:以读取追加模式打开文件,如果文件不存在则创建
//flag:默认

