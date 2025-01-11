The solution involves using a different storage method better suited for larger data sets.  Here's an example using SQLite, a lightweight database:

```javascript
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydatabase.db');

db.transaction(tx => {
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS mytable (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT);`
  );
});

const addData = async (data) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO mytable (data) VALUES (?);', [JSON.stringify(data)]
    );
  });
};

const getData = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM mytable;', [],
        (_, { rows }) => resolve(rows._array.map(row => JSON.parse(row.data))),
        (_, error) => reject(error)
      );
    });
  });
};
```
Remember to install `expo-sqlite`:
```bash
expo install expo-sqlite
```
This is a more robust approach for handling larger amounts of data than AsyncStorage.