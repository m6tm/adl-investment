
export const link = () => {
    if (process.env.APP_ENV == 'local') {
        return "http://localhost:3500";
    }
    return "https://socket.coderocktechnology.com";
}

export const options = {}

export const peerConfig: any = {
    iceServers: [{
            url: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com'
        },
        {
            url: 'turn:192.158.29.39:3478?transport=udp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
        },
        {
            url: 'turn:192.158.29.39:3478?transport=tcp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
        },
        {
            url: 'turn:turn.bistri.com:80',
            credential: 'homeo',
            username: 'homeo'
        },
        {
            url: 'turn:turn.anyfirewall.com:443?transport=tcp',
            credential: 'webrtc',
            username: 'webrtc'
        },
        {
            urls: [
                "turn:13.250.13.83:3478?transport=udp"
            ],
            username: "YzYNCouZM1mhqhmseWk6",
            credential: "YzYNCouZM1mhqhmseWk6"
        }
    ]
}

export const constraints = (audio_mode: boolean, video_mode: boolean, call_id: string, facing_mode: 'user' | 'environment' = 'user') => ({
    audio: audio_mode,
    video: video_mode,
    groupId: call_id,
    echoCancellation: true,
    noiseSuppression: true,
    facingMode: { exact: facing_mode },
    width: { min: 640, ideal: 1280 },
    height: { min: 480, ideal: 720 },
    advanced: [
        { width: 1920, height: 1280 },
        { aspectRatio: 1.333 }
    ]
})