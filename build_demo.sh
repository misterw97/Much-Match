cd ./demo_app
yarn build
[ $? -eq 0 ] || exit $?;
mkdir -p ../lb3_backend/demo
rm -rf ../lb3_backend/demo/*
cp -R ./dist/* ../lb3_backend/demo
cd -
