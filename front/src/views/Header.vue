<template>
<!--   <button @click="changeSrc"></button>-->
<!--    <img :src="onlineSrc">-->
<!--    <button @click="download">下载</button>-->
<!--    <img src="/src/assets/1.png" onload="loadImage()">-->
<!--    <img src="/src/assets/1.png" alt="" class="download_img" @click="downs(index)"/>-->
    <input type="file" id="scwj" style="display: none" multiple="multiple"/>
    <input type="file" id="changeImg" style="display: none"/>
    <button @click="onBtn('scwj')">选择图片</button>
    <button @click="changeColor" id="changeBtn">更改底色</button>
    <button @click="changeBlock('addWidth')">addWidth</button>
    <button @click="changeBlock('reduceWidth')">reduceWidth</button>
    <button @click="changeBlock('addHeight')">addHeight</button>
    <button @click="changeBlock('reduceHeight')">reduceHeight</button>
    <h1>{{msg}}</h1>
    <button @click="xztp()">下载图片</button>
    <div style="height: 500px">
        <div class="box" id="bigImg"
             :style="{left:+boxLeft+'px',top:+boxTop+'px',background:'rgb('+red+','+green+','+blue+')'}"
        >
            <h1 class="msg">{{msg2}}</h1>
            <img
                    @mousedown="imgCheck('imgOne')"
                    @click="imgOver('imgOne')"
                    @dblclick="onBtn('changeImg')"
                    :src="src" border="0"
                    id="imgOne"
                    :style="{transform:'scale('+params.zoomVal_1+')'}"
                    @mousewheel="bagimg($event,'imgOne')" @mousewheel.prevent
                    @click.prevent
                    class="imgOne"
            />
            <img
                    @mousedown="imgCheck('imgTwo')"
                    @click="imgOver('imgTwo')"
                    @dblclick="onBtn('changeImg')"
                    :src="src" border="0"
                    id="imgTwo"
                    :style="{transform:'scale('+params.zoomVal_2+')'}"
                    @mousewheel="bagimg($event,'imgTwo')" @mousewheel.prevent
                    @click.prevent
                    class="imgTwo"
            />
            <img
                    @mousedown="imgCheck('imgThree')"
                    @click="imgOver('imgThree')"
                    @dblclick="onBtn('changeImg')"
                    :src="src" border="0"
                    id="imgThree"
                    :style="{transform:'scale('+params.zoomVal_3+')'}"
                    @mousewheel="bagimg($event,'imgThree')" @mousewheel.prevent
                    @click.prevent
                    class="imgThree"
            />
            <img
                    @mousedown="imgCheck('imgFour')"
                    @click="imgOver('imgFour')"
                    @dblclick="onBtn('changeImg')"
                    src="https://img.zcool.cn/community/016f405d2b3735a80120b5ab031177.jpg@1280w_1l_2o_100sh.jpg" border="0"
                    id="imgFour"
                    :style="{transform:'scale('+params.zoomVal_4+')'}"
                    @mousewheel="bagimg($event,'imgFour')" @mousewheel.prevent
                    @click.prevent
                    class="imgFour"
            />
        </div>
    </div>
    <div class="select-BGColor" v-cloak style="display: none" id="changeBlock">
        <p class="picker" :style="{background:'rgb('+red+','+green+','+blue+')'}" id="picker"></p>
        <p>
            red:<input type="range" max="255" min="0" v-model="red" class="picker-select"><br>
            green:<input type="range" max="255" min="0" v-model="green" class="picker-select"><br>
            blue:<input type="range" max="255" min="0" v-model="blue" class="picker-select"><br>
            <button @click="picker()">应用</button>
        </p>
    </div>
    <input type="text" v-model="msg2">
</template>

<script>
    import html2canvas from "html2canvas";
    export default {
        name: "Header",
        props:{
        },
        data(){
            return{
                msg:"newin",
                msg2:"",
                wheel:true,
                wheelChange:0,
                deleteImgOne:false,
                deleteImgTwo:false,
                imgChecked:"",
                src:"",
                boxLeft:300,
                boxTop:145,
                boxHeight:200,
                boxWidth:300,
                frontImg:null,
                isClick:false,
                isClickOnly:true,
                isDblclick:true,
                red:255,
                blue:255,
                green:255,
                params:{
                    zoomVal_1:1,
                    zoomVal_2:1,
                    zoomVal_3:1,
                    zoomVal_4:1,
                    left: 0,
                    top: 0,
                    currentX: 0,
                    currentY: 0,
                    flag: false
                }
            }
        },
        mounted() {
            this.imgShow()
            document.addEventListener("mousewheel", this.addWheel)
            this.startDrag(document.getElementById("imgOne"), document.getElementById("imgOne"))
            this.startDrag(document.getElementById("imgTwo"), document.getElementById("imgTwo"))
            this.startDrag(document.getElementById("imgThree"), document.getElementById("imgThree"))
            this.startDrag(document.getElementById("imgFour"), document.getElementById("imgFour"))
        },
        methods:{
            addWheel(){
                if(this.wheel==true){
                    console.log(event.wheelDelta)
                    // console.log(event.clientX)
                    // console.log(event.clientY)
                    if(event.wheelDelta>0&&this.wheelChange!=0){
                        this.wheelChange-=115
                    }else if(event.wheelDelta<0){
                        this.wheelChange+=115
                    }
                }
            },
            deleteImg(e){
                if(e.keyCode==8&&this.deleteImgOne==true){
                    const img=document.getElementById(this.imgChecked)
                    img.src=""
                    img.style.left=0+"px"
                    img.style.top=0+"px"
                    if(this.imgChecked=="imgOne"){
                        this.params.zoomVal_1=1
                    }
                    if(this.imgChecked=="imgTwo"){
                        this.params.zoomVal_2=1
                    }
                    if(this.imgChecked=="imgThree"){
                        this.params.zoomVal_3=1
                    }
                    if(this.imgChecked=="imgFour"){
                        this.params.zoomVal_4=1
                    }
                    this.deleteImgOne=false
                }
            },
            changeBlock(String){
                if(String=="addWidth"&&this.boxWidth<=800){
                    this.boxWidth+=30
                }
                if(String=="reduceWidth"&&this.boxWidth>=100){
                    this.boxWidth-=30
                }
                if(String=="addHeight"&&this.boxHeight<=450){
                    this.boxHeight+=20
                }
                if(String=="reduceHeight"&&this.boxHeight>=100){
                    this.boxHeight-=20
                }
                const bigImg=document.getElementById("bigImg")
                bigImg.style.height=this.boxHeight+"px"
                bigImg.style.width=this.boxWidth+"px"
            },
            imgOver(String){
                if(this.isClick){
                    // this.zIndex("imgOne",String)
                    // this.zIndex("imgTwo",String)
                    // this.zIndex("imgThree",String)
                    // this.zIndex("imgFour",String)
                    // const imgChecks = document.getElementById(String);
                    // imgChecks.style.zIndex=4
                    this.isDblclick=true
                    setTimeout(() => {
                        if(this.isClickOnly){
                            this.zIndex("imgOne",String)
                            this.zIndex("imgTwo",String)
                            this.zIndex("imgThree",String)
                            this.zIndex("imgFour",String)
                            const imgChecks = document.getElementById(String);
                            imgChecks.style.zIndex=5
                        }
                    }, 200)
                    setTimeout(() => {
                        this.isDblclick = false
                    }, 300)
                }
            },
            onBtn(String){
                if(String!="changeImg"){
                    document.getElementById(String).click()
                }else if(this.isDblclick==true){
                    document.getElementById(String).click()
                    this.isClickOnly=false
                    setTimeout(() => {
                        this.isClickOnly = true
                    }, 300)
                }
            },
            changeColor(){
                const changeBtn=document.getElementById("changeBtn")
                const change=document.getElementById("changeBlock")
                changeBtn.style.visibility="hidden"
                change.style.display="block"
            },
            picker(){
                const changeBtn=document.getElementById("changeBtn")
                const change=document.getElementById("changeBlock")
                const picker=document.getElementById("picker")
                change.style.display="none"
                changeBtn.style.visibility="visible"
            },
            imgShow(){
                const filename=document.getElementById("scwj")
                const imgTwo = document.getElementById("imgTwo");
                const imgOne = document.getElementById("imgOne");
                const imgThree = document.getElementById("imgThree");
                const imgFour = document.getElementById("imgFour");
                filename.onchange=function () {
                    if(filename.files[0]!=null){
                        imgOne.src = URL.createObjectURL(this.files[0]);
                    }
                    if(filename.files[1]!=null){
                        imgTwo.src = URL.createObjectURL(this.files[1]);
                    }
                    if(filename.files[2]!=null){
                        imgThree.src = URL.createObjectURL(this.files[2]);
                    }
                    if(filename.files[3]!=null){
                        imgFour.src = URL.createObjectURL(this.files[3]);
                    }
                }
            },
            zIndex(String,next){
                const imgChecks = document.getElementById(String);
                const imgCheckNext=document.getElementById(next);
                if(imgChecks.style.zIndex>imgCheckNext.style.zIndex){
                    imgChecks.style.zIndex-=1
                }
            },
            imgCheck(String){

                const filename2=document.getElementById("changeImg")
                // this.zIndex("imgOne",String)
                // this.zIndex("imgTwo",String)
                // this.zIndex("imgThree",String)
                // this.zIndex("imgFour",String)
                const imgChecks = document.getElementById(String);
                document.removeEventListener("keydown",this.deleteImg)
                this.deleteImgOne=true
                this.imgChecked=String
                document.addEventListener("keydown",this.deleteImg)
                // document.addEventListener("keydown",function (e) {
                //     if(e.keyCode==13){
                //         imgChecks.src=""
                //     }
                // })
                this.startDrag(document.getElementById(String), document.getElementById(String))
                this.isClick=true
                setTimeout(() => {
                    this.isClick = false
                }, 300)
                filename2.onchange=function () {
                    imgChecks.src = URL.createObjectURL(this.files[0]);
                }
                setTimeout(() => {
                    this.deleteImgOne=false
                }, 10000)
            },
            xztp(){
                // const filename=document.getElementById("scwj")
                // const img = document.getElementById("img");
                // const bqa = document.createElement("a");
                // //bqa.setAttribute("download", filename.name);
                // bqa.setAttribute("download", "111");
                // this.msg="success"
                // bqa.setAttribute("href", URL.createObjectURL(filename.files[0]));
                // console.log(URL.createObjectURL(filename.files[0]))
                // bqa.click();
                // const filename=document.getElementById("scwj")
                // const ctx = canvas.getContext('2d')
                html2canvas(document.getElementById("bigImg"),{useCORS:true}).then(function (canvas) {
                    const image=canvas.toDataURL("image/png")
                    let $a=document.createElement("a")
                    $a.setAttribute("href",image)
                    $a.setAttribute("download","下载")
                    $a.click()
                })
                // const myImg = new Image();
                // myImg.src = URL.createObjectURL(filename.files[0]);
                // const bgImg = new Image();
                // bgImg.src = require("/src/assets/2.png")
                // setTimeout(function(){
                //     ctx.drawImage(bgImg, 0, 0, 300, 200)//调整大小
                //     ctx.drawImage(myImg, 0,0, 30, 40)//偏移量和大小
                //     // document.querySelector('.generateImg').src = canvas.toDataURL(canvas.value)
                //             let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
                //             let a = document.createElement("a"); // 生成一个a元素
                //             let event = new MouseEvent("click"); // 创建一个单击事件
                //             a.download = name || "aaa"; // 设置图片名称
                //             a.href = url; // 将生成的URL设置为a.href属性
                //             a.click(); // 触发a的单击事件
                // },10)
                // this.msg="success"
            },
            bagimg(e,String) {
                const h = document.getElementById(String)
                if(String=="imgOne"){
                    this.params.zoomVal_1 += event.wheelDelta / 1200;
                    if (this.params.zoomVal_1 <= 0.2) {
                        this.params.zoomVal_1 = 0.2;
                    }
                    this.wheel=false
                }
                if(String=="imgTwo"){
                    this.params.zoomVal_2 += event.wheelDelta / 1200;
                    if (this.params.zoomVal_2 <= 0.2) {
                        this.params.zoomVal_2 = 0.2;
                    }
                    this.wheel=false
                }
                if(String=="imgThree"){
                    this.params.zoomVal_3 += event.wheelDelta / 1200;
                    if (this.params.zoomVal_3 <= 0.2) {
                        this.params.zoomVal_3 = 0.2;
                    }
                    this.wheel=false
                }
                if(String=="imgFour"){
                    this.params.zoomVal_4 += event.wheelDelta / 1200;
                    if (this.params.zoomVal_4 <= 0.2) {
                        this.params.zoomVal_4 = 0.2;
                    }
                    this.wheel=false
                }
                setTimeout(() => {
                    this.wheel=true
                }, 300)
            },
            getImgCss(e, key) {
                return e.currentStyle ? e.currentStyle[key] : document.defaultView.getComputedStyle(e, false)[key];
            },
            startDrag(bar, target, callback) {
                let that = this
                if (that.getImgCss(target, "left") !== "auto") {
                    that.params.left = that.getImgCss(target, "left");
                }
                if (that.getImgCss(target, "top") !== "auto") {
                    that.params.top = that.getImgCss(target, "top");
                }
                bar.onmousedown = function(event) {
                    that.params.flag = true;
                    if (!event) {
                        event = window.event;
                        bar.onselectstart = function() {
                            return false;
                        }
                    }
                    let e = event;
                    that.params.currentX = e.clientX;
                    that.params.currentY = e.clientY;
                };
                document.onmouseup = function() {
                    that.params.flag = false;
                    if (that.getImgCss(target, "left") !== "auto") {
                        that.params.left = that.getImgCss(target, "left");

                    }
                    if (that.getImgCss(target, "top") !== "auto") {
                        that.params.top = that.getImgCss(target, "top");
                    }
                };
                document.onmousemove = function(event) {
                    let e = event ? event : window.event;
                    let nowX = e.clientX,
                        nowY = e.clientY;
                    if(nowX>that.boxLeft-5+that.boxWidth||nowX<that.boxLeft+5||nowY<that.boxTop-that.wheelChange+5|nowY>that.boxTop+that.boxHeight-that.wheelChange-2){
                        that.params.flag=false
                    }
                    if (that.params.flag) {
                        let disX = nowX - that.params.currentX,
                            disY = nowY - that.params.currentY;
                        target.style.left = parseInt(that.params.left) + disX + "px";
                        target.style.top = parseInt(that.params.top) + disY + "px";
                        // if (typeof callback == "function") {
                        //     callback((parseInt(that.params.left) || 0) + disX, (parseInt(that.params.top) || 0) + disY);
                        // }
                        if (event.preventDefault) {
                            event.preventDefault();
                        }
                        return false;
                    }
                }
            },
            // changSrc(){
            //
            //     this.onlineSrc=ONLINE_SRC[1];
            //         // this.onlineImg();
            //
            // },
            // onlineImg(){
            //     this.onlineSrc=ONLINE_SRC[this.online];
            // },
            // downloadIamge(imgsrc, name) {
            //     //下载图片地址和图片名
            //     var image = new Image();
            //     // 解决跨域 Canvas 污染问题
            //     image.setAttribute("crossOrigin", "anonymous");
            //     image.onload = function() {
            //         var canvas = document.createElement("canvas");
            //         canvas.width = image.width;
            //         canvas.height = image.height;
            //         var context = canvas.getContext("2d");
            //         context.drawImage(image, 0, 0, image.width, image.height);
            //         var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
            //
            //         var a = document.createElement("a"); // 生成一个a元素
            //         var event = new MouseEvent("click"); // 创建一个单击事件
            //         a.download = name || "photo"; // 设置图片名称
            //         a.href = url; // 将生成的URL设置为a.href属性
            //         a.dispatchEvent(event); // 触发a的单击事件
            //     };
            //     image.src = imgsrc;
            // },
            // // 改downs这个函数就行，downloadIamge（‘图片下载地址’，图片名字）
            // downs(index) {
            //     // 主要是为了名字不重复
            //     var name = new Date().getTime();
            //     this.downloadIamge(this.result[index].newImgUrl, `${name}`);
            // }

            // downPic(){
            //     const filename=document.getElementById("scwj")
            //     const img = document.getElementById("img");
            //     const image =new Image()
            //     image.setAttribute("crossOrigin", "anonymous");
            //     this.msg="success";
            //     image.onload=()=>{
            //         let canvas = document.createElement('canvas')
            //         canvas.width = image.width;
            //         canvas.height = image.height;
            //         let context = canvas.getContext("2d");
            //         context.drawImage(image, 0, 0, image.width, image.height);
            //         let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
            //         let a = document.createElement("a"); // 生成一个a元素
            //         let event = new MouseEvent("click"); // 创建一个单击事件
            //         a.download = name || filename.name; // 设置图片名称
            //         a.href = filename.files[0]; // 将生成的URL设置为a.href属性
            //         a.dispatchEvent(event); // 触发a的单击事件
            //     }
            // }
        }
    }

</script>

<style scoped>
    .box {
        border: 3px black solid;
        position: absolute;
        /*margin-top: 30px;*/
        /*margin-left: 300px;*/
        /*overflow: hidden;*/
        width: 300px;
        height: 200px;
        /*z-index: -1;*/
    }
    .box2 {
        border: 3px black solid;
        position: absolute;
        /*margin-top: 30px;*/
        /*margin-left: 300px;*/
        overflow: hidden;
        width: 300px;
        height: 200px;
        z-index: -1;
    }
    img {
        position: absolute;
        height: 100px;
        width: auto;
        cursor: move;

    }

    .imgOne{
        position: absolute;
        height: 100px;
        width: auto;
        z-index: 1;
    }

    .imgTwo{
        position: absolute;
        height: 100px;
        margin-left: 150px;
        width: auto;
        z-index: 2;
    }
    .imgThree{
        position: absolute;
        margin-top: 100px;
        width: auto;
        height: 100px;
        z-index: 3;
    }
    .imgFour{
        position: absolute;
        margin-left: 150px;
        margin-top: 100px;
        width: auto;
        height: 100px;
        z-index: 4;
    }
    .msg{
        position: absolute;
        z-index: 6;
    }
</style>