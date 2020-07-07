document.addEventListener('DOMContentLoaded', () => {

 ARTIST_URL = "http://localhost:3000/api/v1/artists"
 ALBUM_URL = "http://localhost:3000/api/v1/albums"
 SONG_URL = "http://localhost:3000/api/v1/songs"
 COMMENT_URL = "http://localhost:3000/api/v1/comments"
 fetchArtists()

    function fetchArtists(){
        fetch(ARTIST_URL)
        .then(resp => resp.json())
        .then(artists => {getArtists(artists)})
    }

    function getArtists(artists){
        artists.forEach(artist => { 
            let artistList = document.getElementById("artist-list")
            let li = document.createElement("li")
            li.dataset.id = artist.id
            li.innerText = artist.name
            li.addEventListener("click", e => {
                let id = e.target.dataset.id
                fetchAlbums(id)
            })
            artistList.append(li)
        })
        
    }

    function fetchAlbums(){
        fetch(ALBUM_URL)
        .then(resp => resp.json())
        .then(console.log)
    }

    function getAlbums(){

    }




})
