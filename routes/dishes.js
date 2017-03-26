var express = require('express');
var router = express.Router();
var cache = require('../cache');
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var dishesSQL = require('../db/dishessql');
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
    let user = cache.get(req.headers.token);
    if(!+user.admin) return responseJSON(res);
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数
        var param = req.body;
        // 建立连接 增加一个用户信息
        connection.query(dishesSQL.insert, [param.name, param.price, param.hot, param.img, new Date(), new Date()], function(err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    id: result.insertId
                };
            }

            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);
            // 释放连接
            connection.release();
        });
    });
});

router.post('/queryList', function(req, res, next) {
  let user = cache.get(req.headers.token);
  var param = req.body;
  if(param.status && !+user.admin) return responseJSON(res);
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
      // 获取前台页面传过来的参数
      // 建立连接 增加一个用户信息
      connection.query(dishesSQL.queryList, [param.status || 0], function(err, result) {
          // 以json形式，把操作结果返回给前台页面
          responseJSON(res, result);
          // 释放连接
          connection.release();
      });
  });
});

router.post('/addTop', function(req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
      // 获取前台页面传过来的参数
      var param = req.body;
      // 建立连接 增加一个用户信息
      connection.query(dishesSQL.addTop, [param.id], function(err, result) {
        console.log(err);
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

router.post('/addStep', function(req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
      // 获取前台页面传过来的参数
      var param = req.body;
      // 建立连接 增加一个用户信息
      connection.query(dishesSQL.addStep, [param.id], function(err, result) {
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

router.post('/addCounts', function(req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
      // 获取前台页面传过来的参数
      var param = req.body;
      // 建立连接 增加一个用户信息
      connection.query(dishesSQL.addCounts, [param.id], function(err, result) {
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

router.post('/updateStatus', function(req, res, next) {
  let user = cache.get(req.headers.token);
  if(!+user.admin) return responseJSON(res);
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
      // 获取前台页面传过来的参数
      var param = req.body;
      // 建立连接 增加一个用户信息
      connection.query(dishesSQL.updateStatus, [param.status, param.id], function(err, result) {
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
