let ga={
    lib:{}, ctx:null, audio:null, 
    res:{
        total:4, loaded:0,
        sounds:{
            bullet:"bullet.mp3", explosion:"explosion.mp3"
        },
        imgs:{
            plane:"plane.png", explosion:"explosion.png"
        }
    },
    game:{
        id:0, circle:0, particles:null, plane:null,
        
        key:{
            left:false, top:false, right:false, right:false, space:false
            
        }
    }
};

//定義需要用到的類別
ga.lib.BulletSystem=class{
    constructor(){
        this.bullet=[];

    }
    update(){
        if(ga.game.circle%65537==0){
            this.bullet.push(new ga.lib.Bullet());
        }
        this.bullet.push(new ga.lib.Bullet());
        for(let i=0; i<this.bullet.length;i++){
            let die=this.bullet[i].update();
            if(die){
                this.bullet.splice(i,1);
                i--;
            }
        }
    }
    render(){
        for(let i=0; i<this.bullet.length;i++){
            this.bullet[i].render();
        }
    }
}

ga.lib.Bullet=class{
    constructor(x,y,vx,vy){
        this.x=Math.random()*ga.ctx.canvas.width;
        this.y=0;
        this.vx=Math.random()*0.001-0.0005;
        this.vy=Math.random()*0.001-0.0005;
        this.size=2;
    }
    update(){
        this.x+=this.vx;
        this.y+=this.vy;
        this.vx+=Math.random()*0.0001;
        this.vy+=Math.random()*0.001;
        return this.x>ga.ctx.canvas.width || this.x<0||
        this.y>ga.ctx.canvas.height ||this.y<0;
    }
    render(){
        ga.ctx.save();
        ga.ctx.fillStyle="white";
        ga.ctx.beginPath();
        ga.ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ga.ctx.fill();
        ga.ctx.restore();
        
       
    }
};


ga.lib.Plane=class{
    constructor(){
        this.x=ga.ctx.canvas.width/2;
        this.y=ga.ctx.canvas.height/2;
        this.size=20;
    }
    update(){
        let speed=1;
        let key=ga.game.key;
        if(key.space){
            speed*=2;
        }
        if(key.left){
            this.x-=speed;
        }
        if(key.top){
            this.y-=speed;
        }
        if(key.right){
            this.x+=speed;
        }
        if(key.bottom){
            this.y+=speed;
        }
        
       
        return false;
    }
    render(){
        ga.ctx.save(); //儲存 Canvas 的設定
        ga.ctx.drawImage(
            ga.res.imgs.plane,
            this.x-this.size/2, this.y-this.size/2,
            this.size, this.size
        );
        if(ga.game.key.space){
            ga.ctx.drawImage(
                ga.res.imgs.explosion,
                this.x-5, this.y+10,
                10, 10
            )
        }
        ga.ctx.restore() //取回上一次儲存的設定
    }
};
