var orderSQL = {
                insert: 'INSERT INTO orders(user_id, status, dishes_id, ordertime) VALUES(?,?,?,?)',
                deleteByUser: 'DELETE FROM orders where user_id=? and DATE(ordertime)=DATE(?)',
                update: 'update orders set status = ? where id=?'
              };

 module.exports = orderSQL;
