document.addEventListener('DOMContentLoaded', () => {
    let addToy = false;
    ARTIST_URL = "http://localhost:3000/api/v1/artists"
    ALBUM_URL = "http://localhost:3000/api/v1/albums"
    SONG_URL = "http://localhost:3000/api/v1/songs"
    COMMENT_URL = "http://localhost:3000/api/v1/comments"
    fetchArtists()

    const toyFormContainer = document.querySelector(".container");
    // const toyForm = document.querySelector(".add-toy-form");
    let artistList = document.getElementById("artist-list")
    const addBtn = document.querySelector("#new-artist-btn");

    addBtn.addEventListener("click", () => {
        console.log();
        
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
            toyFormContainer.style.display = "block";
        } else {
            toyFormContainer.style.display = "none";
        }
    });
    function fetchArtists(){
        fetch(ARTIST_URL)
        .then(resp => resp.json())
        .then(artists => {getArtists(artists)})
        .catch(error =>{
            console.log(error);
            
        })
    }

    function getArtists(artists){
        artists.forEach(artist => { 
            let li = document.createElement("li")
            li.dataset.id = artist.id
            li.innerText = artist.name
            artistList.append(li)
            li.addEventListener("click", e => {
                let albums = artist.albums
                getAlbums(albums)
            })

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

        let button1 = document.createElement('button')
        button1.innerHTML = 'likes'

        let button2 = document.createElement('button')
        button2.innerText = "dislikes"

        // let button = document.createElement('button')
        // button.innerText = 'Read Book'
        // button.addEventListener('click', e => {
        //     console.log('hit');
        // })

        // div = document.createElement("div")
        // div.innerHTML = addUser(album.songs)
        let div = document.createElement('div')
        div.innerHTML = addComment(album.comments)


        let commentForm = document.createElement('form')
        commentForm.innerHTML = `
        <input type="text" name="content" placeholder="Add a Comment...">
        <input type="submit" value="Post">
        `
        
        albumCard.append(h3, img, button1, button2, p1, p2, div, commentForm);


    }

    function addComment(comments){
        
        return comments.map(comment => {
           return `<div>${comment.content}</div></br>`
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
    // clickHandler()
    // getSingleArtist()
    // getSingleAlbum()

})
