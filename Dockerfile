FROM ubuntu:22.04

RUN apt-get update -y && apt-get install figlet && apt-get install traceroute

CMD ["which", "traceroute"]

