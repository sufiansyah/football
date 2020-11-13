let dbPromised = idb.open("champion", 1, function(upgradeDb) {
    let articlesObjectStore = upgradeDb.createObjectStore("articles", {
      keyPath: "id",
    });
    articlesObjectStore.createIndex("id", "id", { unique: true });
  });

  function saveForLater(article) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("articles", "readwrite");
        let store = tx.objectStore("articles");
        console.log(article);
        store.put(article);
        return tx.complete;
      })
      .then(function() {
        console.log("Artikel berhasil di simpan.");
      });
  }

  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          let tx = db.transaction("articles", "readonly");
          let store = tx.objectStore("articles");
          return store.getAll();
        })
        .then(function(articles) {
          resolve(articles);
        });
    });
  }

  function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          let tx = db.transaction("articles", "readonly");
          let store = tx.objectStore("articles");
          return store.get(id);
        })
        .then(function(article) {
          resolve(article);
        });
    });
  }

  function deleteForLater(article) {
    dbPromised
    .then(function(db) {
      let tx = db.transaction("articles", "readwrite");
      let store = tx.objectStore("articles");
      store.delete(article);
      console.log(article);
      return tx.complete;
    })
    .then(function() {
      console.log("Artikel berhasil di hapus.");
    });
}
    