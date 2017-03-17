var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var orderSQL = require('../db/ordersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
// 响应一个JSON数据
var responseJSON = function(res, ret, err) {
    if (typeof ret === 'undefined') {
        console.log(err);
        res.json({
            code: '-200',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

router.post('/add', function(req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数
        var param = req.body;
        var date1 = new Date();
         date1.setHours(17);
         date1.setMinutes(0);
        var date2 = new Date();
        var status = date2<date1?0:1;
        // 建立连接 增加一个用户信息
        connection.query(orderSQL.insert, [res.session.user.id, status, param.dishesId, date2], function(err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功'
                };
            }
            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result, err);
            // 释放连接
            connection.release();
        });
    });
});

router.post('/update', function(req, res, next) {
  if(!+res.session.user.admin) responseJSON();
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
      // 获取前台页面传过来的参数
      var param = req.body;
      // 建立连接 增加一个用户信息
      connection.query(orderSQL.update, [0, param.id], function(err, result) {
          if (result) {
              result = {
                  code: 200,
                  msg: '成功'
              };
          }
          // 以json形式，把操作结果返回给前台页面
          responseJSON(res, result);
          // 释放连接
          connection.release();
      });
  });
});

router.post('/deleteByUser', function(req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
      // 获取前台页面传过来的参数
      var param = req.body;
      // 建立连接 增加一个用户信息
      connection.query(orderSQL.deleteByUser, [res.session.user.id, new Date()], function(err, result) {
        console.log(err, result)
          if (result) {
              result = {
                  code: 200,
                  msg: '成功'
              };
          }
          // 以json形式，把操作结果返回给前台页面
          responseJSON(res, result);
          // 释放连接
          connection.release();
      });
  });
});


module.exports = router;
