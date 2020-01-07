## 项目简介及版本功能迭代内容
### 1.项目结构
| 文件名  |     功能简介 |  
| ------------ | :----: |
| app  |  存放项目代码 |  
| assets  | 存放静态资源文件  | 
| environments | 环境配置 |
| service  |   公共服务方法|  
### 2.项目主文件功能简介
| 文件名  | 模块  |  功能简介 |  负责人 |
| ------------ | :----: | ------------ | :---: |
| account-management  |账户管理   |1.创建，修改，查看，删除员工及角色<br/>2.查看员工操作日志信息<br/>3.首页-展示站点统计数据<br/>4.登录组件页面<br/>5.用户修改密码功页面|  July |
|  cash-system |   现金系统|   查看第三方支付列表数据|   Molika|
|  common|   项目公共部分组件| 项目框架公共部分（侧边栏及头部）|  July |
| lottery-management |彩票管理   | 1.设置及查看所有彩票赔率、投注额、返点数据<br/>2.查看所有彩票开奖结果| Molika  |
| page |公共组件  |提示框，分页组件及公共管道 | Molika |
| report-query |报表查询  |1.平台下各站点的彩票投注、派彩、损益等汇总<br/>2.各站点按日、按周、按月统计投注额和损益,以柱状图显示,可观察各站点的盈亏走势 | Molika |
|   website-management| 网站管理  | 1.设置及查看站点及app总开关状态<br/>2.设置及查看所有彩票和三方游戏的开关状态<br/>3.设置及查看所有彩票的玩法开关状态<br/>4.设置及查看所有彩票及游戏的提成比例 | July |
### 3.版本功能迭代及内容
| 更新时间  | 更新文件  |  更新功能|  修改人 |
| ------------ | ------------ | ------------ | ------------ |
| 2019-6-30 15:30 | lottery-management |配合后端增加-状态-字段  |  July|
| 2019-6-30 15:30 | website-management |增加序号 |  July|
| 2019-7-10 09:30 | lottery-management |  1.开奖结果-配合后端优化代码（字典相关）<br/>2.代码优化（piblic/private）|  Molika |
| 2019-7-10 09:30 | account-management | 1.样式优化<br/>2.代码优化（piblic/private）|  Molika July|
| 2019-7-10 09:30 | report-query | 1.样式优化<br/>2.代码优化（piblic/private） |  July|
| 2019-7-10 09:30 | cash-system | 1.样式优化<br/>2.代码优化（piblic/private） |  July|
| 2019-7-10 09:30 | website-management | 1.代码优化（piblic/private） |  July|
| 2019-7-12 08:15 |  siteManagement | 1.修改最小投注额为1元 |Molika |
| 2019-7-15 08:43 | pipe | 1.修改彩票名称| Molika |
