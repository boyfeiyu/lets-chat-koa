let's chat 在线聊天室项目后端部分

使用 koa 框架开发

## 如何启动

安装依赖

```
pnpm install
```

启动

```bash
pnpm dev
```

数据库建表

```sql
create table if not exists `user` (
    id int primary key  auto_increment,
    name varchar(30) not null unique ,
    password varchar(50) not null ,
    createAt timestamp default CURRENT_TIMESTAMP,
    updateAt timestamp default current_timestamp on update  CURRENT_TIMESTAMP
);

alter table `user` Add `avatar_url` varchar(200);

create table if not exists `message` (
    id int primary key  auto_increment,
    sender int not null ,
    receiver int not null ,
    message varchar(500) not null,
    createAt timestamp default CURRENT_TIMESTAMP
);
alter table message add constraint fk_class_senderid foreign key(sender) references user(id);
alter table message add constraint fk_class_receiverid foreign key(receiver) references user(id);

```
