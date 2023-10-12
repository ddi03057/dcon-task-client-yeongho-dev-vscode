// get profile image from instagram
Path: src/library/Sign.js
//Compare this snippet from src/library/example.js:
import FileDelete from 'library/FileDelete';
export class FileDelete {
 constructor (fileId) {
   his.fileId = fileId}
delete () {
 return new Promise((resolve, reject) => {
      FileService.deleteFiles(this.fileId).then(() => {
         resolve()
      }).catch((err) => {
       reject(err)
      })
    })
   }
}

function fetchPokemon() {
  const pokemon = 'pikachu';
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
}