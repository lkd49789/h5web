# BEJ48 红白歌会接口文档

##  获取登录用户免费票信息

### URL 

```
POST api/v1/bej420vote/user/ticket/free
```

### Request Header 

```
token : ""
```

### Response Body

```
{
    "status":200,
    "message":"success",
    "content":{
        "ticketNum":2,			// 免费票余额
        "defaultFree":true,		// 默认账号是否已领取 true 未领取 false 已领取
        "swcFree":false,			// 丝芭卡是否已领取 true 未领取 false 已领取
        "scanFree":true,			// 扫码是否已领取 true 未领取 false 已领取
    }
}
```



## 登录用户领取免费投票权

### URL 

```
POST api/v1/bej420vote/user/ticket/get
```

### Request Header

```
token : ""
content-type : application/json
```

### Request Body

```
{
    "fromType":1      // 获取方式 0 扫码获取 1 星沃卡获取 2 口袋用户免费获取
}
```

### Response Body

```
{
    "status":200,
    "message":"success"
}
```

## 登录用户余额信息

```
POST api/v1/bej420vote/user/account
```

### Request Header

```
token : ""
```

### Response Body

```
{
    "status":200,
    "message":"success",
    "content":{
     	"money":100,
        "integral":200,
        "free":10
    }
}
```

## 登录用户投票

### URL 

```
POST api/v1/bej420vote/vote
```

### Request Header

```
content-type : application/json
token : ""
```

### Request Body

```
{
    "voteType":0,	// 投票方式 0 免费票 1 积分 2 鸡腿
    "groupId":0,	// 被投票分组 0 白队 1 红队
    "voteNum":10	// 投票数
}
```

### Response Body

````
{
    "status":200,	
    "message":"success",
    "content":{              
    }
}
````

