import * as SQLite from 'expo-sqlite';

// Lopputyötä varten POC, jos toimii niin sovellettaan jatkossa
// Tällä siistitään komponentit CRUD toimintojen hallinnasta ja mahdollistetaan sqlite ajo useampaan komponenttin

//Promise viljely ei ole ehkä välttämätöntä, successCallback kutsutaan kun sqlite on ajanut koodin onnistuneesti
//Voi silti käytettävyyden kannalta olla hyvä, varmistuupahan ainakin millon koodi on ajettu

//Promise kaikkeen on kova, ketjutus onnistuu hyvin

const db = SQLite.openDatabase('osoitekirja.db');

const SQLiteService = {

    //alustus
    initialize: () => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists addressbook (id integer primary key not null, title text, longitude text, latitude text);');
        }, () => console.error('Error when initializing DB'), null);
    },

    //Päivitys, kutsutaan muiden funktioiden jälkeen promise then käsittelyssä 
    //Esim. addItem().then(() => update)
    //Promise -> resolve, returnin sijalla niin varmistetaan datan tulo
    update: () => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql('select * from addressbook;', [], (_, { rows }) => resolve(rows._array));
            }, (err) => {
                console.error('Error in updating table');
                reject(err);
            }, null)
        });
    },

    //Rivin lisäys
    addRow: (title, longitude, latitude) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql('insert into addressbook(title, longitude, latitude) values (?, ?, ?);',
                [title, longitude, latitude])
            }, (err) => {
                console.error('Error in adding row');
                reject(err);
            }, resolve())
        })
    },
    
    //Poisto
    deleteRow: (id) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql('delete from addressbook where id = ?', [id]);
            }, (err) => {
                console.error('Error in removing row');
                reject(err);
            }, resolve())
        })
    }

}

export default SQLiteService;