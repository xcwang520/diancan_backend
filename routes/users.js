var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/usersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
// 响应一个JSON数据
var responseJSON = function(res, ret) {
    if (typeof ret === 'undefined') {
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
        // 建立连接 增加一个用户信息
        connection.query(userSQL.insert, [param.name, param.admin, param.email, param.subscription, param.password, param.department_id], function(err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '增加成功'
                };
            }
            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);
            // 释放连接
            connection.release();
        });
    });
});

router.post('/delete', function(req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
      // 获取前台页面传过来的参数
      var param = req.body;
      // 建立连接 增加一个用户信息
      connection.query(userSQL.deleteUserById, [param.id], function(err, result) {
          if (result) {
              result = {
                  code: 200,
                  msg: '删除成功'
              };
          }
          console.log(err);
          // 以json形式，把操作结果返回给前台页面
          responseJSON(res, result);
          // 释放连接
          connection.release();
      });
  });
});

router.post('/updatePassword', function(req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
      // 获取前台页面传过来的参数
      var param = req.body;
      // 建立连接 增加一个用户信息
      connection.query(userSQL.updatePassword, [param.password, param.id], function(err, result) {
          if (result) {
              result = {
                  code: 200,
                  msg: '修改成功'
              };
          }
          // 以json形式，把操作结果返回给前台页面
          responseJSON(res, result);
          // 释放连接
          connection.release();
      });
  });
});

router.get('/list', function(req, res, next) {
    res.send('list');
});

router.get('/findById', function(req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
      // 获取前台页面传过来的参数
      var param = req.query || req.params;
      // 建立连接 增加一个用户信息
      connection.query(userSQL.findUserById, [param.id], function(err, result) {
          if (result && result.length) {
              result = result[0];
          }
          // 以json形式，把操作结果返回给前台页面
          responseJSON(res, result);
          // 释放连接
          connection.release();
      });
  });
});

module.exports = router;
