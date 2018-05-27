#首先科普一下MongoDB的安装：
> * [1]、  下载mongoDB安装包：http://www.mongodb.org/downloads
> * [2]、
```
mongoDB服务器端安装和启动步骤：
根据文件夹的需要适当的修改对应的文件路径。
    1. 在磁盘创建文件夹
        d:\mongodb   
        d:\mongodb\db   数据库目录
        d:\mongodb\log  日志存放目录
        d:\mongodb\log\mongoDB.log
    2. 解压mongoDB安装包，并将解压后的bin文件夹拷贝到mongodb中
    3. 启动mongoDB服务
         在bin目录中有许多命令，启动数据库只需要两个命令mongod和mongo：
         mongod：是mongoDB数据库进程本身
         mongo：是命令行shell客户端  
        启动mongoDB进程：D:\mongodb\bin>mongod --dbpath=D:\mongodb\db

[3]、执行到这里，mongoDB服务器已经启动了，接下来就可以在客户端操作数据库了。但是，当mongod.exe启动程序被关闭后，mongoDB客户端就无法连接数据库。
       为了避免每次都要手动启动数据库，可以将mongDB安装为windows服务，让该服务随windows启动而开启，这样，我们在使用mongoDB的时候直接连接数据库就可以了，省去了手动开启服务的繁琐。将mongoDB安装为windows服务并开启的命令：
D:\mongodb\bin>mongod --dbpath=D:\mongodb\db --logpath =D:\mongodb\log>MongoDB.log --install -serviceName "MongoDB"
开启服务：
D:\mongodb\bin>net start MongoDB
 总结：mongoDB无需安装，只需要创造服务器的启动环境即可：需要的是bin文件夹(存放的是mongoDB的一些命令)、指定数据库的位置和日志位置、建立一个日志文件。有了这些，mongoDB服务器端就可以启动了。
     mongoDB服务器启动后，就可以通过mongoDB客户端操作数据库了。mongoDB客户端包括：
         1. shell控制台
         2. java、php等驱动程序
         3. mongoVUE是一个可视化工具，相当于我们熟悉的plSql，不过也可以执行对数据库的操作   
  通过shell客户端，我们可以很方便的练习mongoDB的curd操作，不过，在开发中，还是通过相应的驱动程序由编程语言来操作。

```
============================================================================================


```
#database级的操作
db.help()    查看命令提示
use dbName   //当创建一个集合的时候回自动创建当前的数据库
show dbs   //显示当前的所有数据库


#collection的操作


#document级别的操作(增删改查)


MongoDB数据类型
null
boolean
整数
浮点
字符串
数组
内嵌文档   {"name":"de","hobby":{"mobble":"fr"}}
对象ID   用new ObjectId()来申明
日期   用new Date()来申明
时间戳RegExp   正则表达式/[a-z]/

MongoDB要求每一个Document必须有_id字段并且这个字段必须唯一。
ObjectId是"_id"的默认类型【唯一标识】
由  时间戳     机器    PID     计数器     组成
    0|1|2|3    4|5|6   7|8     9|10|11

#增删改查的操作

注意：在使用增删改查之前一定要先确定是那一个数据库。eg:use emp

db.collection.way({参数}.way({参数})
（1）查
db.users.find({age:{$gt:18}}).sort({age:1});
查找年龄大于18岁并且将年龄进行从小到大的排序方式

（2）写
db.users.insert({
    name:"sue",
    age:29
    status:'A',
    group:['news','sports']
})
其中_id系统会默认给加上这样的一个key值，

（3）删
db.collection.remove();
删除所有数据：db.jobs.remove({})
只删除一个：db.jobs.remove({job_id:"GG"},1);  或者db.jobs.remove({job_id:"GG"},{justOne:true});
删除符合条件的数据：db.jobs.remove({job_id:"GG"});
删除表机构：db.jobs.drop()   //那么jobs表给删除了

（4）修改
db.user.update({
    {age:{$gt:18}},      //查询条件
    {$set:{status:'A'}},   //修改内容
    {multi:true}    //修改约束
})
上述是：找到所有的age大于18的user,把status设置为A
db.jobs.update({job_id:'lizhong'},{$set:{min_salary:300}},{multi:false});
递增##
实例1：db.jobs.update({job_id:"lizhong"},{$inc:{min_salary:20}})
//找到job_id是lizhong的这样一条数据，然后将它的min_salary值递增20。
重命名##
实例2：db.jobs.update({job_id:'GG'},{$rename:{min_salary:"min_Salary"},{multi:true}})//符合条件的全部重命名。
$set修改field##
实例3：db.jobs.update({job_id:'GG'},{$set:{job_title:'web1',maxSalary:100,'job_desc.working_strength':3,'job_desc.start_time':'09:00'}})

设置最小值##
db.jobs.update({job_id:'gg'},{$min:{minSalary:10}},{multi:true})
意思就是把大于10的minSalary全部修改成10，【留下小的】否则保留原来的值。
设置最大值##
db.jobs.update({job_id:'gg'},{$max:{minSalary:10}},{multi:true})

  "job_id" : "lizhong","job_title" : "this is my firstJob","max_salary" : 12000.0,"min_salary" : "1500"



  ##投影设置
  看一个例子：
  db.jobs.find({},{job_id:1,min_salary:1,_id:0});
  这里的投影部分指的就是{job_id:1,min_salary:1,_id:0}，意思是只让job_id，min_salary这两列显示出来，其余部分都隐藏。
  加投影：
db.jobs.find({job_id:"gg",min_salary:{$gt:1}},{job_id:1,min_salary:1,_id:0});

##查询时候的常用判断条件：
[1]比较判断
-,>,>=,<,<=,!=,=,In,NotIn
$gt   大于        db.jobs.find({job_id:"gg",min_salary:{$gt:1}});
$gte  大于等于
$lt   小于
$lte  小于等于
$ne   不等于
$in   在...中
$nin  不在...中

[2]逻辑判断 
-,and,or,not,nor

例子：
且：
db.jobs.find({$and:[{job_id:'gg'},{min_salary:{$gt:2}},{min_salary:{$lt:5}}]},{job_id:1,min_salary:1,_id:0})
或：
db.jobs.find({$or:[{job_id:'gg'},{job_id:'lizhong'}]},{job_id:1,min_salary:1,_id:0})
叠加：
db.jobs.find({$and:[{job_id:'gg'},{$or:[{min_salary:{$lte:2}},{min_salary:{$gte:4}}]}]})
找到job_id:'gg'，并且min_salaty小于等于2或者min_salary大于等于4的集合。
非：
$not   逻辑非
db.jobs.find({$not:[{job_id:'gg'},{job_id:'it_man'}]};)


存在判断：$exists
db.jobs.find({job_desc:{$exists:true}}) //job_desc存在值的集合
db.jobs.find({job_desc:{$exists:false}}) //除了job_desc存在值的集合

查询null
db.jobs.find($and:[{job_desc:{$exists:true}},{job_desc:{$in:[null]}}])
存在该字段并且其值是null这种数据类型



数组的导入和查询：
（1）准备数据：
db.jobs.update({job_id:'ST_CLERK'},{$set:{work_day:[1,2,4,5]}},{multi:true})
db.jobs.update({job_id:'ST_MAN'},{$set:{work_day:[1,2,3,5,6]}},{multi:true})
#查询某个值【$in】是或者的条件
db.jobs.find(work_day:{$in:[3,4]});  //工作时间是周三或者周四的
#匹配条件的所有值【$all】,且的关系
db.jobs.find(work_day:{$all:[3,4]});  //工作时间是周三并且周四的
#匹配查询指定的长度【$size:value】
db.jobs.find(work_day:{$size:5});   //查询上班时间是5天的集合

$where
例子：
db.jobs.find({$where:function(){
    return this.min_salary>10000;
}})
比较灵活和强大,但是当数据量大时效率非常低，不推荐使用。。

正则学习：
http://deerchao.net/tutorials/regex/regex.html



#内嵌文档的查询
相等匹配
eg:db.jobs.find({"job_desc.working_strength":4},{job_desc:1,_id:0})  类似对象的写法

#mongodb的游标
说白了就是我们查找的数据集。
db.collextion.find()返回值就是一个游标。如果不使用一个变量存储游标，那么会自动显示前面20个document.使用DBQuery.shellBatchSize修改默认数量。再输入it之后会接下来显示20个document.
游标一般有10分钟的有效期。
懒加载的形式：当我们使用一个变量保存find()的返回值的时候，其将不会自动进行遍历显示，会先显示20个，如果需要你需要点击it再进行查询，以此类推。
eg：var cursor = db.jobs.find();
while(cursor){
    var obj = cursor.next();
    print(obj.job_id);
}
处理游标的三大函数：sort,skip,limit
eg:db.jobs.find().sort({min_salary:1}); //按照min_salary从小到大的顺序
db.jobs.find().sort({min_salary:-1});   //从大到小

db.jobs.find().sort({min_salary:1}).skip(3);  //将最小的三个给跳过
db.jobs.find().sort({min_salary:1}).limit(3);  //最小的三个被筛选出来
db.jobs.find().sort({min_salary:1}).limit(3).skip(4);  //跳过前面4个，查看5,6,7。


sort,skip,limit实现分页
分页的公式：在sort排序之后，
skip((页数-1)*每页的条目数量）          这里的页数从1开始计数
limit(每页的条目数量)
例子：现在有100条信息已经排序好了，每页显示10条，公式为：
skip((n-1)*10).limit(10);
```
