module.exports = {
  apps : [{
    script: './bin/www',
    name:"configapp",
    watch: true,
    max_memory_restart:'1G',
    instances:1,
    ignore_watch: [ // 不不⽤用监听的⽂文件
      "node_modules",
      "logs"
      ],
      max_memory_restart: '1G',
      "error_file": "./logs/app-err.log", // 错误⽇日志⽂文件
      "out_file": "./logs/app-out.log",
      "log_date_format": "YYYY-MM-DD HH:mm:ss", // 给每⾏行行⽇日志标记⼀一个时间
  }],
  // }, {
  //   script: './service-worker/',
  //   watch: ['./service-worker']
  // }],

  deploy : {
    production : {
      user : 'root',
      host : '192.168.35.101',
      ref  : 'origin/master',
      repo : 'https://github.com/dln61181326/pm2Test.git',
      path : '/usr/local/myproject',
      ssh_options: "StrictHostKeyChecking=no",
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --envproduction',
    }
  }
};
