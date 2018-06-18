let UserAccessToken = '';
const clientID ='16068d8e3b9f495093b68f3d8ca9f71d';
const redirectURI = 'http://localhost:3000/'

const Spotify = {
  getAccessToken(){
    if(UserAccessToken){
      return UserAccessToken;
    }

   const url = window.location.href;

  UserAccessToken = url.match(/access_token=([^&]*)/);
  const expiresIn= url.match(/expires_in=([^&]*)/);

  if(UserAccessToken && expiresIn) {
    UserAccessToken = accesstoken[1]
   const expirationTime = number(expiresIn[1]) * 1000
   setTimeout(() => {
     UserAccessToken = '';
   }, expirationTime);
   window.history.pushState('for Access Token', null, '/');
 } else {
   window.location.href =
   `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
 }
},
search(term) {
  const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${UserAccessToken}`
    }
  }).then(response => response.json())
    .then(jsonResponse => {
      if(!jsonResponse.tracks) {
        return [];
      }

      return jsonResponse.tracks.items.map(currTrack => {
        return {
          id: currTrack.id,
          name: currTrack.name,
          artist: currTrack.artists[0].name,
          album: currTrack.album.name,
          uri: currTrack.uri

        }
      })
    });
},

savePlaylist(PlaylistName , trackURIs){
  const accesstoken = this.getAccessToken();

  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${UserAccessToken}`
    }
  })
  .then(response => response.json())
    .then(jsonResponse => jsonResponse.id)
    .then(userId => {
      fetch(`https://api.spotify.com/v1/users/${userid}/playlists`)
     headers: {
       Authorization: `Bearer ${UserAccessToken}`
     },
     method: 'POST'
    })
    .then(response => response.json())
    .then(jsonResponse => {
     const playlistId = jsonResponse.id;
     const addSongsURL = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`
     fetch(addSongsURL, {
       headers: {
          Authorization: `Bearer ${UserAccessToken}`
       },
       method: 'POST';
     })
    })
  })
 }
}

export default Spotify
