docker buildx build --push --platform linux/amd64,linux/arm64 -t sanketh7/desmoslive-api:latest -f packages/api/Dockerfile .
docker buildx build --push --platform linux/amd64,linux/arm64 -t sanketh7/desmoslive-web:latest -f packages/web/Dockerfile .
