cd ./demo_app
yarn build
[ $? -eq 0 ] || exit $?;
rm -rf ../lb3_backend/demo/*
cp -R ./dist/* ../lb3_backend/demo
cd -