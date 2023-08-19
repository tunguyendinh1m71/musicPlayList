let currentMusic = 0;
let song = document.getElementById("song");
let songName = document.getElementById("songName");
let artistName = document.getElementById("artistName");
let musicTimeCurrent = document.getElementById("music-current");
let musicDuration = document.getElementById("music-duration"); 
let songImg = document.getElementById("song-img");
let progress = document.getElementById("Progress");
let ctrlIcon = document.getElementById("ctrlIcon");
let ctrlVl = document.getElementById("volumeSlider");
let ctrlForward = document.getElementById("ctrlForward");
let ctrlBackward = document.getElementById("ctrlBackward");


function setMusic(i){
    progress.value = 0;
    let audio = songs[i];
    currentMusic = i;

    song.src = audio.path;
    songName.innerHTML = audio.name;
    artistName.innerHTML = audio.artist;
    songImg.src = audio.cover;
    
    setTimeout(() => {
        progress.max = song.duration;
        musicDuration.innerHTML = formatting(song.duration);
    }, 300);
}

setMusic(0);

function formatting(duration)
{
    let min = Math.floor(duration / 60);
    if (min < 10)
    {
        min = `0${min}`;
    }
    let second = Math.floor(duration % 60);
    if (second < 10)
    {
        second = `0${second}`;
    }

    return `${min}:${second}`;
}

function playMusic()
{
    song.play();
    if (!ctrlIcon.classList.contains("fa-pause"))
    {
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    }
}

function playPause()
{
    if (ctrlIcon.classList.contains("fa-pause"))
    {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
    else
    {
        song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    }
}

function playForward()
{
    if (currentMusic >= songs.length-1) currentMusic = 0;
    else currentMusic++;
    setMusic(currentMusic);
    playMusic();
}

function playBackward()
{
    if (currentMusic <= 0) currentMusic = songs.length-1;
    else currentMusic--;
    setMusic(currentMusic);
    playMusic();
}

setInterval(() => {
    progress.value = song.currentTime;
    musicTimeCurrent.innerHTML = formatting(song.currentTime);
    if(Math.floor(song.currentTime) == Math.floor(progress.max))
    {
        playForward();
    }
}, 500);


progress.onchange = function ()
{
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}

ctrlVl.onchange = function()
{
    song.volume = ctrlVl.value / 100;
}





