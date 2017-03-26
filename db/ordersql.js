var orderSQL = {
                insert: 'INSERT INTO orders(user_id, status, dishes_id, ordertime) VALUES(?,?,?,?)',
                deleteByUser: 'DELETE FROM orders where user_id=? and DATE(ordertime)=DATE(NOW())',
                update: 'update orders set status = ? where id=?',
                findDishesCount: 'select dishes.name, count(orders.id) as count from dishes, orders where dishes.id = orders.dishes_id and DATE(ordertime)=DATE(NOW()) group by orders.dishes_id',
                findTodayAll: 'SELECT orders.id, DATE_FORMAT(ordertime, "%T") as ordertime, orders.dishes_id, dishes.name as dishesName, user.name FROM orders, dishes, user where user.id = orders.user_id and DATE(ordertime)=DATE(NOW()) and orders.dishes_id=dishes.id order by dishes_id, id',
                findByUserId: 'SELECT orders.id, DATE_FORMAT(ordertime, "%Y-%m-%d %T") as ordertime, dishes_id,name FROM orders, dishes where orders.user_id=? and DATE(ordertime)=DATE(NOW()) and orders.dishes_id=dishes.id order by id desc'
              };

 module.exports = orderSQL;
