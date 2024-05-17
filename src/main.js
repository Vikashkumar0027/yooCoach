let client = AgoraRTC.createClient({mode:'rtc','codec': "vp8"})

 config = {
    // appid: '7c4f6505fde74a7a937ba31e357a3317',
    appid: '',
    token:'',
    uid:null,
    channel:''
}

let localTracks = {
    audioTrack:null,
    videoTrack:null,
}

let localTrackState = {
    audioTrackMuted:false,
    videoTrackMuted:false,

}

let remoteTracks = {}

// mediaStream: MediaStream | undefined;
 let mediaStream;

function handleScreenUserJoined(event) {
    const uid = event.uid;
    const player = `<div class="video-containers" id="video-wrapper-${uid}" >
                      <div class="video-player player" id="stream-${uid}"></div>
                    </div>`;
    document.getElementById('user-streams').insertAdjacentHTML('beforeend', player);
  }

  // Function to handle user leaving
function handleScreenUserLeft(event) {
    const uid = event.uid;
    const element = document.getElementById(`video-wrapper-${uid}`);
    if (element) {
      element.parentNode.removeChild(element);
    }
  }

  async function startScreenStreaming(){
    console.log('User join screenShare streaming')
    await joinScreenShareStreams()
    document.getElementById('join-btn').style.display= 'none'
    document.getElementById('footer').style.display= 'flex'
  }

  async function screenSharedjs(){
    var color =  document.getElementById('screenshare-btn').style.backgroundColor;
    console.log(color);//rgba(255, 80, 80, 0.7)

    document.getElementById('join-btn').style.display= 'none'
    await leave();
    document.getElementById('join-btn').style.display= 'none'
    var cameraDiv = document.getElementById('cameraDiv');
   
  
   
    if(color !== 'rgba(255, 80, 80, 0.7)'){
        await joinScreenShareStreams();
    // document.getElementById('join-btn').style.display= 'none'
    document.getElementById('footer').style.display= 'flex'
        document.getElementById('screenshare-btn').style.backgroundColor = 'rgb(255, 80, 80, 0.7)';
        if (cameraDiv) {
            cameraDiv.style.display = 'none';
        }
    }else{
        await joinStreams()
    // document.getElementById('join-btn').style.display= 'none'
    document.getElementById('footer').style.display= 'flex'
    document.getElementById('screenshare-btn').style.backgroundColor = '#1f1f1f8e';
    if (cameraDiv) {
        cameraDiv.style.display = 'block';
    }
    }
  }

  let joinScreenShareStreams = async () => {
  
        client.on("user-published", handleUserJoined);
        client.on("user-left", handleUserLeft);


      // Get media stream for screen sharing
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    //   const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: { mediaSource: 'screen' } });
 
      // Join Agora RTC channel and publish screen sharing tracks
      [config.uid, localTracks.audioTrack,localTracks.videoTrack] = await Promise.all([
        client.join(config.appid, config.channel, config.token || null, config.uid || null),
        AgoraRTC.createMicrophoneAudioTrack(),
        AgoraRTC.createCustomVideoTrack({ mediaStreamTrack: screenStream.getVideoTracks()[0] })
      ]);
  
      // Insert video player container in the HTML
      const player = `<div class="video-containers" id="video-wrapper-${config.uid}" >
                        <div class="video-player player" id="stream-${config.uid}"></div>
                      </div>`;
      document.getElementById('user-streams').insertAdjacentHTML('beforeend', player);

      // Play the screen sharing video track in the specified container
      localTracks.videoTrack.play(`stream-${config.uid}`)
  
      await client.publish([localTracks.audioTrack,localTracks.videoTrack]);
     
  }


 async function myTest(data) {

  config.appid = data.app_id;
  config.token = data.token;
  config.channel = data.app_name;

    console.log('User join stream')
    await joinStreams()
    document.getElementById('join-btn').style.display= 'none'
    document.getElementById('footer').style.display= 'flex'
}

   async function mic(){
    if(!localTrackState.audioTrackMuted){
                    await localTracks.audioTrack.setMuted(true)
                    localTrackState.audioTrackMuted = true
                    document.getElementById('mic-btn').style.backgroundColor = 'rgb(255, 80, 80, 0.7)'
                 }else {
                    await localTracks.audioTrack.setMuted(false)
                    localTrackState.audioTrackMuted = false
                    document.getElementById('mic-btn').style.backgroundColor = '#1f1f1f8e'
                 }
}

async function cam(){
    if(!localTrackState.videoTrackMuted){
                    await localTracks.videoTrack.setMuted(true)
                    localTrackState.videoTrackMuted = true
                    document.getElementById('camera-btn').style.backgroundColor = 'rgb(255, 80, 80, 0.7)'
                 }else {
                    await localTracks.videoTrack.setMuted(false)
                    localTrackState.videoTrackMuted = false
                    document.getElementById('camera-btn').style.backgroundColor = '#1f1f1f8e'
                 }
}

async function leave(){
    for(trackName in localTracks){
                let track = localTracks[trackName]
                if(track){
                    // stop camera and mic
                   track.stop()
                //    disconnect from camera and mic
                   track.close()
                   localTracks[trackName] = null
                }
            }
        
            await client.leave()
            document.getElementById('user-streams').innerHTML =  ''
            document.getElementById('footer').style.display= 'none'
            document.getElementById('join-btn').style.display= 'block'
}

let joinStreams = async () => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);

    [config.uid, localTracks.audioTrack,localTracks.videoTrack] = await Promise.all([
        client.join(config.appid, config.channel, config.token || null, config.uid || null),
        AgoraRTC.createMicrophoneAudioTrack(),
        AgoraRTC.createCameraVideoTrack(),
    ]) 


    // let player = `<div class="video-containers" id="video-wrapper-${config.uid}" >
    //                       <p class="user-uid"> ${config.uid}</p>
    //                       <div class="video-player player" id="stream-${config.uid}"></div>
    //         </div>`

    // document.getElementById('user-streams').insertAdjacentHTML('beforeend', player);

    // localTracks.videoTrack.play(`stream-${config.uid}`)

    await client.publish([localTracks.audioTrack])
    await client.publish([localTracks.audioTrack,localTracks.videoTrack])
}

let handleUserLeft = async (user) =>  {
    // console.log('User has left')
    delete remoteTracks[user.uid]
    document.getElementById(`video-wrapper-${user.uid}`)

    const element = document.getElementById(`video-wrapper-${user.uid}`);
    if (element) {
        element.remove();
      }
}

let handleUserJoined = async (user, mediaType)=>{ 
    console.log('User has join our stream') //|| mediaType != "video"
    if(user.uid !== 444444){
      return;
    }
    remoteTracks[user.uid] = user

    await client.subscribe(user, mediaType)

    let videoPlayer =  document.getElementById('video-wrapper-${user.uid}')
    if(videoPlayer != null){
        videoPlayer.remove()
    }
    if(mediaType === 'video'){
        const element = document.getElementById(`video-wrapper-${user.uid}`);
    if (element) {
        element.remove();
      }

        let videoPlayer = `<div class="video-containers" id="video-wrapper-${user.uid}" >
                      
                          <div class="video-player player" id="stream-${user.uid}"></div>
                    </div>`
    
         document.getElementById('user-streams').insertAdjacentHTML('beforeend',videoPlayer)
         user.videoTrack.play(`stream-${user.uid}`)
    }

    if(mediaType === 'audio'){
         user.audioTrack.play()
    }


}



//  document.getElementById('join-btn').addEventListener('click', async ()=> {
//    console.log('User join stream')
//    await joinStreams()
//    document.getElementById('join-btn').style.display= 'none'
//    document.getElementById('footer').style.display= 'flex'
// })

// document.getElementById('leave-btn').addEventListener('click', async ()=>{
//     for(trackName in localTracks){
//         let track = localTracks[trackName]
//         if(track){
//             // stop camera and mic
//            track.stop()
//         //    disconnect from camera and mic
//            track.close()
//            localTracks[trackName] = null
//         }
//     }


//     await client.leave()
//     document.getElementById('user-streams').innerHTML =  ''
//     document.getElementById('footer').style.display= 'none'
//     document.getElementById('join-btn').style.display= 'block'
// })
// document.getElementById('camera-btn').addEventListener('click' ,async()=>{
//          if(!localTrackState.videoTrackMuted){
//             await localTracks.videoTrack.setMuted(true)
//             localTrackState.videoTrackMuted = true
//             document.getElementById('camera-btn').style.backgroundColor = 'rgb(255, 80, 80, 0.7)'
//          }else {
//             await localTracks.videoTrack.setMuted(false)
//             localTrackState.videoTrackMuted = false
//             document.getElementById('camera-btn').style.backgroundColor = '#1f1f1f8e'
//          }
// })

// document.getElementById('mic-btn').addEventListener('click' ,async()=>{
//          if(!localTrackState.audioTrackMuted){
//             await localTracks.audioTrack.setMuted(true)
//             localTrackState.audioTrackMuted = true
//             document.getElementById('mic-btn').style.backgroundColor = 'rgb(255, 80, 80, 0.7)'
//          }else {
//             await localTracks.audioTrack.setMuted(false)
//             localTrackState.audioTrackMuted = false
//             document.getElementById('mic-btn').style.backgroundColor = '#1f1f1f8e'
//          }
// })