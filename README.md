## 项目介绍

巡线卫士门户项目代码




##参与项目

``` shell
#下载代码
git clone http://192.168.102.9/xxws-portals/xxws-portals.git
cd xxws-web

#开发
git checkout dev    		  #切换到开发分支
git checkout -b lichuanju 	   #创建自己的分支
npm install					 #安装依赖包
npm run start 				 #启动项目，代理到开发环境
npm run devintest 			 #启动项目，代理到测试环境

#发布
npm install					#安装依赖包
npm run build 				#打包项目到dist文件夹
```



##GIT使用规范

``` shell
#提交代码
git add .  					#将工作区代码提交到暂存区
git commit -m "修改描述"  	  #将暂存区代码生成一个版本
git push origin lichuanju     #推送自己分支，登录gitlab，申请合并

#更新自己分支的代码
git pull origin dev  		 #更新开发分支上的代码
git checkout lichuanju  	 #切换到自己分支
git merge dev 				#合并v1.6的代码到自己的分支上
```


