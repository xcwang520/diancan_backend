var UserSQL = {
                insert:'INSERT INTO user(name, admin, email, subscription, password, department_id) VALUES(?,?,?,?,?,?)',
                queryAll:'SELECT * FROM user',
                findUserById:'SELECT * FROM User WHERE id = ? ',
                findUserByEmail: 'SELECT * FROM User WHERE email = ? ',
                deleteUserById: 'DELETE FROM user where id = ?',
                updatePassword: 'UPDATE user SET password = ? where id = ?',
                findUserByEmailPassword: 'SELECT * FROM User WHERE email = ? and password = ?',
                findUserByToken: 'SELECT * FROM User WHERE token = ? ',
                updateTokenById: 'UPDATE user set token = ? where id = ?',
                departments: 'SELECT * FROM department'
              };

 module.exports = UserSQL;
