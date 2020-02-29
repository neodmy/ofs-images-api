# ofs-images-api

## config

Modify `endpoints.yaml` file to add  `<ip:port>` and user credentials on `--user` and `--password` fields

```yaml
routes:

endpoint: /exterior
file: exterior.jpg
command: wget
arguments:
- "http://ip:port/cgi-bin/image.jpg?error=current&config&size=640x480&textdisplay=enable"
- -nv
- --user=user
- --password=password
- -t
- 1
- -O
- ./src/public/exterior.jpg

```
