export $(cat .env | xargs)

read -r -p "Dump source database: $SOURCE_DATABASENAME ? [y/N]" response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
then
mongodump -h $SOURCE_DATBASEHOST -d $SOURCE_DATABASENAME -u $SOURCE_DATABASE_USERNAME -p $SOURCE_DATABASE_PASSWORD -o ./.dump
fi

read -r -p "Restore target database: $TARGET_DATABASENAME ? [y/N]" response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
then
    mongorestore -h $TARGET_DATBASEHOST -d $TARGET_DATABASENAME -u $TARGET_DATABASE_USERNAME -p $TARGET_DATABASE_PASSWORD ./.dump/$SOURCE_DATABASENAME
fi