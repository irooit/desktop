const http = require('http')
const request = require('request')
const fs = require('fs')
const wallpaper = require('wallpaper')
const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById('btn3')
const img = document.getElementById('img')
let pic = [];
let index = 0;
getBying()

function getBying() {
    http.get('http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8', (res) => {
        let data = ''
        res.on('data', function (chunk) {
            chunk = chunk.toString()
            data += chunk
        })
        res.on('close', function () {
            pic = JSON.parse(data).images
            data = ''
            http.get('http://cn.bing.com/HPImageArchive.aspx?format=js&idx=7&n=8', (res) => {
                res.on('data', function (chunk) {
                    chunk = chunk.toString()
                    data += chunk
                })
                res.on('close', () => {
                    let _pic = JSON.parse(data).images
                    for (let i = 1; i < _pic.length; i++) {
                        pic.push(_pic[i])
                    }
                    img.src = "http://cn.bing.com" + pic[index].url
                    document.title = pic[index].copyright
                    
                })
            })

        })
    })
}
btn1.onclick = function () {
    if (pic.length != 0) {
        if (index == 0) {
            index = pic.length - 1
        } else {
            index--
        }
        img.src = "http://cn.bing.com" + pic[index].url
        document.title = pic[index].copyright
    }


}
btn2.onclick = function () {
    if (pic.length != 0) {
        if (index == pic.length - 1) {
            index = 0
        } else {
            index++
        }
        img.src = "http://cn.bing.com" + pic[index].url
        document.title = pic[index].copyright
    }
}
btn3.onclick = function () {
    request(img.src).pipe(fs.createWriteStream('l.jpg').once('close',()=>{
        wallpaper.set('l.jpg')
    }))
}