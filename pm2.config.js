const pm2Config = {
  apps: [
    {
		"name": "echo",
		"script": "laravel-echo-server",
		"args": "start",
		"max_memory_restart" : "200M",
		exec_mode: 'cluster_mode',
		instances: 1,
    },
  ],
}

module.exports = pm2Config
