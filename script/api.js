const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json());

//连接数据库
const db = mysql.createConnection({
  host: 'rm-cn-cfn48o2a1000rh.rwlb.rds.aliyuncs.com',
  user: 'appuser',
  password: '1825875Kq!',
  database: 'carsdatabase'
});

db.connect(err => {
  if (err) {
    console.error('数据库连接失败:', err);
    return;
  }
  console.log('数据库连接成功');
});

//获取所有user数据的 API 接口
app.get('/users', (req, res) => {
  console.log('收到 /users 请求');
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('查询失败:', err);
      return res.status(500).send('查询失败');
    }
    res.json(results);
  });
});

// 登录验证
app.post('/login', (req, res) => {
  console.log('收到 POST/login 请求');
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('邮箱和密码不能为空');
  }

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('登录查询失败:', err);
      return res.status(500).send('服务器错误');
    }

    if (results.length === 0) {
      return res.status(401).send('邮箱或密码错误');
    }

    // 登录成功
    res.status(200).json({
      message: '登录成功',
      user: results[0]  //返回 user 的部分信息用于前端展示
    });
  });
});

// 添加新用户
app.post('/users', (req, res) => {
  console.log('收到 POST /users 请求');
  const { username, password, full_name, phone_number, email } = req.body;

  // 检查必填字段
  if (!username || !password || !full_name || !phone_number || !email) {
     console.warn('缺少必要字段，无法添加用户');
     return res.status(400).send('缺少必要字段');
  }

  const query = `
    INSERT INTO users (username, password, full_name, phone_number, email, created_at)
    VALUES (?, ?, ?, ?, ?, NOW())
  `;
  const values = [username, password, full_name, phone_number, email];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(' 添加用户失败:', err);
      return res.status(500).send('添加用户失败');
    }
    console.log(` 用户添加成功: 用户名 = ${username}`);
    res.status(201).send(' 用户添加成功');
  });
});

//获取单个用户信息
app.get('/users/:id', (req, res) => {
  console.log('收到 GET /users/user_id 请求');
  const userId = req.params.id;
  db.query('SELECT * FROM users WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      console.error('查询用户失败:', err);
      return res.status(500).send('查询失败');
    }
    if (results.length === 0) {
      console.warn(`用户未找到: user_id = ${userId}`);
      return res.status(404).send('用户未找到');
    }

    console.log(`查询成功: user_id = ${userId}, 用户数据:`, results[0]);
    res.json(results[0]);
  });
});

//通过username更新用户信息
app.put('/users/username/:username', (req, res) => {
  const username = req.params.username;
  const { password, full_name, phone_number, email } = req.body;

  console.log(`收到 PUT /users/username请求`);
  console.log(' 请求更新的用户名:', username);

  // 检查是否缺少必要字段
  if (!password || !full_name || !phone_number || !email) {
    console.warn('缺少必要字段，更新被拒绝');
    return res.status(400).send('缺少必要字段');
  }

  const query = `
    UPDATE users
    SET password = ?, full_name = ?, phone_number = ?, email = ?
    WHERE username = ?
  `;
  const values = [password, full_name, phone_number, email, username];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('更新用户失败:', err);
      return res.status(500).send('更新失败');
    }
    if (result.affectedRows === 0) {
      console.warn(`未找到该用户名`);
      return res.status(404).send('未找到该用户名');
    }
    console.log(` 用户更新成功`);
    res.send('用户更新成功');
  });
});

// 通过user_id删除用户
app.delete('/users/:user_id', (req, res) => {
  const userId = req.params.user_id;
  console.log(`收到 DELETE /users/${userId} 请求`);

  db.query('DELETE FROM users WHERE user_id = ?', [userId], (err, result) => {
    if (err) {
      console.error('删除用户失败:', err);
      return res.status(500).send('删除失败');
    }
    if (result.affectedRows === 0) {
      console.warn(`未找到 user_id 为 ${userId} 的用户`);
      return res.status(404).send('未找到该用户');
    }
    console.log(`用户删除成功，user_id: ${userId}`);
    res.send('用户删除成功');
  });
});

//获取所有车辆信息
app.get('/vehicles', (req, res) => {
  console.log('收到 GET /vehicles 请求');
  db.query('SELECT * FROM vehicles', (err, results) => {
    if (err) {
      console.error('查询车辆失败:', err);
      return res.status(500).send('查询失败');
    }
    console.log(`查询成功，返回 ${results.length} 条车辆记录`);
    res.json(results);
  });
});

//添加新车辆,需要用户ID
app.post('/vehicles', (req, res) => {
  const { user_id, license_plate, model, color } = req.body;
  console.log(' 收到 POST /vehicles请求');

  if (!user_id || !license_plate || !model || !color) {
    console.warn('缺少必要字段，车辆添加请求被拒绝');
    return res.status(400).send('缺少必要字段');
  }

  const query = `
    INSERT INTO vehicles (user_id, license_plate, model, color, created_at)
    VALUES (?, ?, ?, ?, NOW())
  `;
  const values = [user_id, license_plate, model, color];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('添加车辆失败:', err);
      return res.status(500).send('添加车辆失败');
    }
    console.log(`车辆添加成功，车辆 ID: ${result.insertId}`);
    res.status(201).send('车辆添加成功');
  });
});

//根据user_id获取该用户的车辆列表
app.get('/users/:id/vehicles', (req, res) => {
  const userId = req.params.id;
  console.log('收到 GET /users/:id/vehicles 请求');

  db.query('SELECT * FROM vehicles WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      console.error('查询用户车辆失败:', err);
      return res.status(500).send('查询失败');
    }
    console.log(`查询成功，返回的车辆列表数量: ${results.length}`);
    res.json(results);
  });
});

// 通过license更新车辆信息
app.put('/vehicles/license/:license_plate', (req, res) => {
  const license_plate = req.params.license_plate;
  const { model, color } = req.body;
   console.log('收到 PUT /vehicles/license/:license_plate 请求');

  const query = `
    UPDATE vehicles
    SET model = ?, color = ?
    WHERE license_plate = ?
  `;
  const values = [model, color, license_plate];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('更新车辆失败:', err);
      return res.status(500).send('更新失败');
    }
    if (result.affectedRows === 0) {
      console.warn(' 未找到对应车牌号的车辆:', license_plate);
      return res.status(404).send('未找到对应车牌号的车辆');
    }
    console.log(`车辆更新成功，车牌号: ${license_plate}`);
    res.send('车辆更新成功');
  });
});

//通过license删除车辆
app.delete('/vehicles/license/:license_plate', (req, res) => {
  const license_plate = req.params.license_plate;
  console.log('收到 DELETE/vehicles/license/:license_plate 请求');

  db.query('DELETE FROM vehicles WHERE license_plate = ?', [license_plate], (err, result) => {
    if (err) {
      console.error('删除车辆失败:', err);
      return res.status(500).send('删除失败');
    }
    if (result.affectedRows === 0) {
      console.warn(`未找到车牌为 ${license_plate} 的车辆，删除失败`);
      return res.status(404).send('未找到对应车牌号的车辆');
    }
    console.log(` 车辆删除成功，车牌号: ${license_plate}`);
    res.send('车辆删除成功');
  });
});

//提交反馈
app.post('/feedback', (req, res) => {
  const { email, message, user_id } = req.body;
  console.log(' 收到 POST /feedback 请求');

  if (!email || !message) {
    return res.status(400).send('邮箱和内容不能为空');
  }

  const submitTime = new Date();

  db.query(
    'INSERT INTO feedback (user_id, email, message, submitted_at) VALUES (?, ?, ?, ?)',
    [user_id || null, email, message, submitTime],
    (err, result) => {
      if (err) {
        console.error('插入反馈失败:', err);
        return res.status(500).send('提交失败');
      }
      console.log(` 反馈提交成功: id=${result.insertId}`);
      res.status(200).send('反馈已成功提交，谢谢您的意见！');
    }
  );
});

// 通过feedback_id删除反馈
app.delete('/feedback/:feedback_id', (req, res) => {
  const feedbackId = req.params.feedback_id;
  console.log(`收到 DELETE /feedback/${feedbackId} 请求`);

  db.query('DELETE FROM feedback WHERE feedback_id = ?', [feedbackId], (err, result) => {
    if (err) {
      console.error('删除反馈失败:', err);
      return res.status(500).send('删除失败');
    }
    if (result.affectedRows === 0) {
      console.warn(`未找到 feedback_id 为 ${feedbackId} 的反馈`);
      return res.status(404).send('未找到该反馈');
    }
    console.log(`反馈删除成功,feedback_id: ${feedbackId}`);
    res.send('反馈删除成功');
  });
});

//查看所有反馈
app.get('/feedback', (req, res) => {
  console.log(' 收到 GET /feedback 请求');

  db.query('SELECT * FROM feedback ORDER BY submitted_at DESC', (err, results) => {
    if (err) {
      console.error('查询反馈失败:', err);
      return res.status(500).send('查询失败');
    }
    console.log(`查询成功，返回 ${results.length} 条反馈记录`);
    res.json(results);
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`API 服务运行在 http://114.55.236.178:${port}`);
});

