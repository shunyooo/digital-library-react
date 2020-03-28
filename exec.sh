cmd=''

while [ "$1" != "" ]
do
  cmd="${cmd} $1"
  shift
done

docker exec -it react-template_app_1 ${cmd}
