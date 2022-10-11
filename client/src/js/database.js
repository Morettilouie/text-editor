import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('POST to the database');

    // create a connection to the database and specify the version we want to use
    const jateDb = await openDB('jate', 1);

    // create a new rransaction and specify the store and data privileges
    const tx = jateDb.transaction('jate', 'readwrite');

    // open up the desired object store
    const store = tx.objectStore('jate');

    // use the .add() method on the store and pass the content
    const request = store.add({ id: 1, value: content });

    // get confirmation of the request
    const result = await request;
    console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // create a connection to the IndexedDB database and the version we want to use
  const jateDb = await openDB('jate', 1);

  // create a new trasaction and specify the store and data privileges
  const tx = jateDb.transaction('jate', 'readonly');

  // open up the desired object store
  const store = tx.objectStore('jate');

  // use the .get all() method to get all data in the database
  const request = store.getAll();

  // get confirmation of the request
  const result = await request;
  console.log('result.value', result);
  return;
}; 

initdb();
