var express = require('express');
var router = express.Router();
var md5 = require('js-md5');
var uuid = require('uuid');
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

router.post('/regist', function(req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数
        var param = req.body;
        // 建立连接 增加一个用户信息
        connection.query(userSQL.insert, [param.name, 0, param.email, 0, md5(param.password), param.departmentId], function(err, result) {
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
      connection.query(userSQL.updatePassword, [md5(param.password), res.session.user.id], function(err, result) {
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

router.get('/findUserInfo', function(req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
      // 获取前台页面传过来的参数
      var param = req.query || req.params;
      // 建立连接 增加一个用户信息
      connection.query(userSQL.findUserById, [ res.session.user.id ], function(err, result) {
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

router.post('/login', function(req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
      // 获取前台页面传过来的参数
      var param = req.body;
      // 建立连接 增加一个用户信息
      connection.query(userSQL.findUserByEmailPassword, [param.email, md5(param.password)], function(err, result) {
          if (result && result.length) {
              result = result[0];
              delete result.password;
              delete result.token;
              var token = uuid.v1();
              req.session.token = token;
              req.session.user = result;
          } else if(result && !result.length){
              result = {
                code: 1,
                msg: "用户名或密码错误"
              }
          }
          // 以json形式，把操作结果返回给前台页面
          responseJSON(res, result);
          // 释放连接
          connection.release();
      });
  });
});

module.exports = router;
