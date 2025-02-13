# chicken-Web

---

### Docker

**이미지 빌드**

```Docker
docker build -t <image_name>
```

**컨테이너 실행**

- 임시 포트번호 3000

```Docker
docker run -d -p 3000:3000 --name <container_name> <image_name>
```
