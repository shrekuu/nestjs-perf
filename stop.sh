SERVICE_NAME="nestjs-perf"

# Stop and delete the service if it exists
pm2 delete "$SERVICE_NAME" > /dev/null 2>&1
