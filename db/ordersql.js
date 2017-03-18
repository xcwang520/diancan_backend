var orderSQL = {
                insert: 'INSERT INTO orders(user_id, status, dishes_id, ordertime) VALUES(?,?,?,?)',
                deleteByUser: 'DELETE FROM orders where user_id=? and DATE(ordertime)=DATE(?)',
                update: 'update orders set status = ? where id=?',
                findTodayAll: 'SELECT orders.id, DATE_FORMAT(ordertime, "%Y-%m-%d %T") as ordertime, dishes_id,name FROM orders, dishes where DATE(ordertime)=DATE(NOW()) and orders.dishes_id=dishes.id order by dishes_id, id',
                findByUserId: 'SELECT orders.id, DATE_FORMAT(ordertime, "%Y-%m-%d %T") as ordertime, dishes_id,name FROM orders, dishes where orders.user_id=? and DATE(ordertime)=DATE(NOW()) and orders.dishes_id=dishes.id order by id desc'
              };

 module.exports = orderSQL;
