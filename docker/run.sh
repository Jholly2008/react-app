#!/bin/bash

# 设置基础变量
DOCKER_IMAGE_NAME="kkk2099/kkk:react-1.0"
CONTAINER_NAME="frontend-react"
HOST_PORT=11000
CONTAINER_PORT=80
DEFAULT_GATEWAY="http://10.40.41.193:10000"

# 使用提供的参数或默认网关地址
GATEWAY_URL=${1:-$DEFAULT_GATEWAY}
echo "使用网关地址: ${GATEWAY_URL}"

echo "开始部署前端容器..."

# 检查是否存在同名容器（不管是否运行）
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "发现已存在的容器: ${CONTAINER_NAME}"
    echo "正在停止并删除旧容器..."
    
    docker stop ${CONTAINER_NAME}
    if [ $? -ne 0 ]; then
        echo "停止旧容器失败，脚本终止。"
        exit 1
    fi
    
    docker rm ${CONTAINER_NAME}
    if [ $? -ne 0 ]; then
        echo "删除旧容器失败，脚本终止。"
        exit 1
    fi
    
    echo "旧容器已成功删除。"
fi

# 检查镜像是否存在
if ! docker image inspect ${DOCKER_IMAGE_NAME} >/dev/null 2>&1; then
    echo "镜像 ${DOCKER_IMAGE_NAME} 不存在，尝试从 Docker Hub 拉取..."
    docker pull ${DOCKER_IMAGE_NAME}
    if [ $? -ne 0 ]; then
        echo "拉取镜像失败，脚本终止。"
        exit 1
    fi
fi

# 运行新容器
echo "正在启动新容器..."
docker run -d \
    --name ${CONTAINER_NAME} \
    -p ${HOST_PORT}:${CONTAINER_PORT} \
    -e GATEWAY_URL=${GATEWAY_URL} \
    --restart unless-stopped \
    ${DOCKER_IMAGE_NAME}

# 检查容器是否成功启动
if [ $? -ne 0 ]; then
    echo "启动容器失败，脚本终止。"
    exit 1
fi

# 等待几秒钟让容器完全启动
sleep 3

# 检查容器状态
if docker ps | grep -q ${CONTAINER_NAME}; then
    echo "容器成功启动！"
    echo "容器名称: ${CONTAINER_NAME}"
    echo "端口映射: ${HOST_PORT}:${CONTAINER_PORT}"
    echo "网关地址: ${GATEWAY_URL}"
    docker ps | grep ${CONTAINER_NAME}
else
    echo "容器可能未正常运行，请检查日志："
    docker logs ${CONTAINER_NAME}
    exit 1
fi