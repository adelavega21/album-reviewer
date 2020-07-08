document.addEventListener('DOMContentLoaded', () => {
    let addArtist = false;
    ARTIST_URL = "http://localhost:3000/api/v1/artists"
    ALBUM_URL = "http://localhost:3000/api/v1/albums"
    SONG_URL = "http://localhost:3000/api/v1/songs"
    COMMENT_URL = "http://localhost:3000/api/v1/comments"
    
   

    const artistFormContainer = document.querySelector(".container");
    let artistList = document.getElementById("artist-list")
    const addBtn = document.querySelector("#new-artist-btn");

    addBtn.addEventListener("click", () => {
        console.log();
        
        // hide & seek with the form
        addArtist = !addArtist;
        if (addArtist) {
            artistFormContainer.style.display = "block";
        } else {
            artistFormContainer.style.display = "none";
        }
    });
    function fetchArtists(){
        fetch(ARTIST_URL)
        .then(resp => resp.json())
        .then(artists => {
            artists.forEach(artist => {
                getArtist(artist)
            })
        })
        .catch(error =>{
            console.log(error);
            
        })
    }

    function getArtist(artist){
        let artistLi = document.createElement("li")
        artistLi.dataset.id = artist.id
        artistLi.innerText = artist.name
        artistList.append(artistLi)
        artistLi.addEventListener("click", e => {
            let albums = artist.albums
            getAlbums(albums)
        })

        
    }

    function getAlbums(albums) {
        let albumList = document.querySelector("#album-list")
        albumList.innerHTML = ""  
        albums.forEach(album => {
            const li = document.createElement('li')
            li.dataset.id = album.id
            li.innerHTML += album.title 
            li.addEventListener('click', e =>{
                let id = e.target.dataset.id
                getSingleAlbum(id)
            })
            albumList.append(li)
        });
    }
    function getSingleAlbum(id) { 
            fetch(ALBUM_URL + `/${id}`)
                .then(resp => resp.json())
                .then(album => {
                    renderAlbum(album)
                    renderSongs(album)
                
                })
    }



    function renderAlbum(album) {
       let showAlbum = document.querySelector("#show-album")
        let albumCard = document.createElement("div")
        showAlbum.innerHTML = ""
        albumCard.className = 'card'
        showAlbum.append(albumCard)

        let h3 = document.createElement('h3')
        h3.innerText = album.title

        let img = document.createElement('img')
        img.src = album.image

        let p1 = document.createElement('p')
        p1.innerText = `Year -${album.year}`

        let p2 = document.createElement('p')
        p2.innerText = `Genre -${album.genre}`

        let buttonDiv = document.createElement('div')
        buttonDiv.className = 'likes-section'
        
        let span1 = document.createElement('span')
        span1.className = 'like-span'
        span1.innerText = '0 likes'

        let button1 = document.createElement('button')
        button1.innerText = '👍'
        
        // <div class="likes-section">     
        // <span class="likes">0 likes</span>          
        // <button class="like-button">♥</button>        
        // </div>

        let span2 = document.createElement('span')
        span2.innerText = "0 dislikes"
        span2.className = 'dislike-span'

        let button2 = document.createElement('button')
        button2.innerText = '👎'


        // let button = document.createElement('button')
        // button.innerText = 'Read Book'
        // button.addEventListener('click', e => {
        //     console.log('hit');
        // })

        // div = document.createElement("div")
        // div.innerHTML = addUser(album.songs)
        let div = document.createElement('div')
        div.innerHTML = addComment(album.comments)

        buttonDiv.append(button1, span1, button2, span2)


        let commentForm = document.createElement('form')
        commentForm.innerHTML = `
        <input type="text" name="content" value="" placeholder="Add a Comment...">
        <input type="submit" value="Post">
        `
        
        albumCard.append(h3, img, buttonDiv, p1, p2, div, commentForm);


    }

    function addComment(comments){
        
        return comments.map(comment => {
           return `<div>${comment.content} <button class="delete-btn">x</button> </div></br>`
        }).join('')
    }


    
    // comments.forEach(comment => {
    //     let p = document.createElement('p')
    //     p.innerText = comment.content
    //     p.dataset.id = comment.id
    // })


    function renderSongs(album) {
        let songs = album.songs
        let showSongs = document.querySelector("#songs-list")
        let songCard = document.createElement("div")
        showSongs.innerHTML = ""
        songCard.className = 'card'
        showSongs.append(songCard)
            songs.forEach(song => {
                let li = document.createElement('li')
                li.innerText += song.name
                songCard.append(li)
            })
    }


    // we need to grab addartist form, take value and add to the api with post
    function addNewArtist (artist){
        // let addArtistForm = document.querySelector(".new-artist-form")
        document.addEventListener("submit", e => {
            e.preventDefault()
            let addArtistForm = e.target
            let name = addArtistForm.name.value
            let artistObj = {
                name: name
            // id: artist.id
        }
        console.log(artistObj)
        fetch(ARTIST_URL,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(artistObj)
        })
        getArtist(artistObj)
    

    })

    }
    

    addNewArtist()
    fetchArtists()
   


    // function renderComments(album) {
    //     let comments = album.comments
    //     let showComments = document.querySelector("#show-album")
    //     let commentDiv = document.createElement('div')
    //     showComments.append(commentDiv)
    //     comments.forEach(comment => {
    //         let p = document.createElement('p')
    //         p.innerText = comment.content
    //         p.dataset.id = comment.id
    //         let commentForm = document.createElement('form')
    //         commentForm.innerHTML = `
    //         <input type="text" name="content" placeholder="Add a Comment...">
    //         <input type="submit" value="Post">
    //         `
    //         commentDiv.append(p, commentForm)
    //     })
 
    // }
    // getSingleArtist()
    // getSingleAlbum()

})
