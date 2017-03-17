var dishesSQL = {
                insert:'INSERT INTO dishes(name, price, hot, img, created, modified) VALUES(?,?,?,?,?,?)',
                queryList:'SELECT * FROM dishes where status = ?',
                addTop: 'UPDATE dishes set top=top+1 where id=?',
                addStep: 'UPDATE dishes set step=step+1 where id=?',
                addCounts: 'UPDATE dishes set counts=counts+1 where id=?',
                removeCounts: 'UPDATE dishes set counts=counts-1 where id=?',
                updateStatus:'update dishes set status = ? where id=?'
              };

 module.exports = dishesSQL;
