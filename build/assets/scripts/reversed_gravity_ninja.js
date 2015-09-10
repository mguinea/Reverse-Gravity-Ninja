function ArcadeAudio(){this.sounds={}}function Sprite(e,t,i,a){this.x=e,this.y=t,this.width=i,this.height=a}function Animation(e,t){this.frames=e,this.velocity=t}function Rectangle(e,t,i,a,n){this.x=e,this.y=t,this.width=i,this.height=a,this.type=n}function Enemy(e,t,i,a){this.x=e,this.y=t,this.width=i,this.height=a,this.direction=DIR_LEFT}function Player(e,t,i,a){this.x=e,this.y=t,this.width=i,this.height=a,this.vx=0,this.vy=0,this.onGround=!1,this.sprites=[],this.state=0,this.dir=0}function Scene(){this.id=scenes.length,scenes.push(this)}function loadScene(e,t){currentScene=e.id,scenes[currentScene].load(t)}function Camera(){this.x=0,this.y=0}function init(){canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d"),worldWidth=canvas.width,worldHeight=canvas.height,gameScene.load(),gameLoop(),render()}function gameLoop(){scenes.length&&scenes[currentScene].update(),setTimeout(gameLoop,1e3/60)}function render(){scenes.length&&(cleanCanvas("#000"),scenes[currentScene].draw(ctx)),requestAnimationFrame(render)}function cleanCanvas(e){ctx.fillStyle=e,ctx.fillRect(0,0,canvas.width,canvas.height)}function input(){68 in keysDown||39 in keysDown?player.vx<5&&(player.vx+=1,player.state=1,player.dir=1):player.vx>0&&(player.vx-=1,player.state=0),65 in keysDown||37 in keysDown?player.vx>-5&&(player.vx-=1,player.state=1,player.dir=-1):player.vx<0&&(player.vx+=1,player.state=0),(87 in keysDown||38 in keysDown)&&player.onGround&&(gravity=-1),(83 in keysDown||40 in keysDown)&&player.onGround&&(gravity=1),lastGravity!=gravity&&aa.play("gravity_change")}function setMap(e,t){var a=0,n=0;for(columns=e[0],wall.length=0,decoTile.length=0,lava.length=0,target.length=0,enemies.length=0,i=1,l=e.length;l>i;i+=1)e[i]in solidWalls&&wall.push(new Rectangle(a*t,n*t,t,t,e[i])),4===e[i]&&decoTile.push(new Rectangle(a*t,n*t,t,t,e[i])),(2===e[i]||9===e[i])&&lava.push(new Rectangle(a*t,n*t,t,t,e[i])),-1===e[i]&&(spawn.x=a*t,spawn.y=n*t),-2===e[i]&&target.push(new Rectangle(a*t,n*t,t,t,e[i])),-7===e[i]&&enemies.push(new Enemy(a*t,n*t,t,t)),-8===e[i]&&enemy_walls.push(new Rectangle(a*t,n*t,t,t)),a+=1,a>=columns&&(n+=1,a=0);worldWidth=columns*t,worldHeight=n*t}function reset_level(){player.x=spawn.x,player.y=spawn.y,player.vy=0,player.vx=0,player.dir=1,player.state=0,gravity=1}ArcadeAudio.prototype.add=function(e,t,i){this.sounds[e]=[],i.forEach(function(i,a){this.sounds[e].push({tick:0,count:t,pool:[]});for(var n=0;t>n;n++){var l=new Audio;l.src=jsfxr(i),this.sounds[e][a].pool.push(l)}},this)},ArcadeAudio.prototype.play=function(e){var t=this.sounds[e],i=t.length>1?t[Math.floor(Math.random()*t.length)]:t[0];i.pool[i.tick].play(),i.tick<i.count-1?i.tick++:i.tick=0};var SFX=Class.extend({init:function(){this.sounds={}},add:function(e,t,i){this.sounds[e]=[];for(var a=0;a<i.length;a++){var n=i[a];this.sounds[e].push({tick:0,count:t,pool:[]});for(var l=0;t>l;l++){var s=new Audio;s.src=jsfxr(n),this.sounds[e][a].pool.push(s)}}},play:function(e){var t=this.sounds[e],i=t.length>1?t[M.floor(M.random()*t.length)]:t[0];i.pool[i.tick].play(),i.tick<i.count-1?i.tick++:i.tick=0}}),sprites=[],animations=[];Animation.prototype.play=function(e,t,i,a,n,l){null==n&&(n=1),null==l&&(l=1);var s=~~(gameLoops*this.velocity)%this.frames.length;ctx.save(),ctx.translate(e+i/2-cam.x,t+a/2-cam.y),ctx.scale(n,l),ctx.drawImage(spritesheet,sprites[this.frames[s]].x,sprites[this.frames[s]].y,sprites[this.frames[s]].width,sprites[this.frames[s]].height,-i/2,-a/2,i,a),ctx.restore()},Rectangle.prototype.fill=function(){ctx.fillRect(this.x-cam.x,this.y-cam.y,this.width,this.height)},Rectangle.prototype.draw=function(){switch(this.type){case-2:coord=sprites.flag;break;case 1:coord=sprites.grass_2;break;case 3:coord=sprites.grass_2;break;case 4:coord=sprites.grass_3;break;case 2:animations.lava.play(this.x,this.y,blockSize,blockSize,1,1);break;case 9:animations.lava.play(this.x,this.y,blockSize,blockSize,1,-1)}2!=this.type&&9!=this.type&&ctx.drawImage(spritesheet,coord.x,coord.y,8,8,this.x-cam.x,this.y-cam.y,this.width,this.height)},Enemy.prototype.fill=function(){ctx.fillRect(this.x-cam.x,this.y-cam.y,this.width,this.height)},Enemy.prototype.draw=function(){animations.enemy.play(this.x,this.y,blockSize,blockSize,this.direction,1)},Enemy.prototype.intersects=function(e){return void 0!==e?this.x<e.x+e.width&&this.x+this.width>e.x&&this.y<e.y+e.height&&this.y+this.height>e.y:void 0},Player.prototype.fill=function(){ctx.fillRect(this.x-cam.x,this.y-cam.y,this.width,this.height)},Player.prototype.intersects=function(e){return void 0!==e?this.x<e.x+e.width&&this.x+this.width>e.x&&this.y<e.y+e.height&&this.y+this.height>e.y:void 0},Player.prototype.draw=function(){switch(this.state){case 0:animations.idle.play(player.x,player.y,blockSize,blockSize,this.dir,gravity);break;case 1:animations.walk.play(player.x,player.y,blockSize,blockSize,this.dir,gravity);break;case-1:animations.dead.play(player.x,player.y,blockSize,blockSize,this.dir,gravity);break;default:animations.idle.play(player.x,player.y,blockSize,blockSize,this.dir,gravity)}};var currentScene=0,scenes=[];Scene.prototype.load=function(){},Scene.prototype.update=function(){},Scene.prototype.draw=function(){},Camera.prototype.focus=function(e,t){this.x=e-canvas.width/2,this.y=t-canvas.height/2,this.x<0?this.x=0:this.x>worldWidth-canvas.width&&(this.x=worldWidth-canvas.width),this.y<0?this.y=0:this.y>worldHeight-canvas.height&&(this.y=worldHeight-canvas.height)};var canvas,ctx,keysDown={},cam=null;worldWidth=0,worldHeight=0,i=null,l=null,window.addEventListener("load",init,!1),window.requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,17)}}(),addEventListener("keydown",function(e){keysDown[e.keyCode]=!0},!1),addEventListener("keyup",function(e){delete keysDown[e.keyCode]},!1);var win=!1,aa=new SFX,lastGravity,DIR_LEFT=-1,DIR_RIGHT=1,loadingTimer=0,deadTimer=0,mainScene=new Scene,gameScene=new Scene,enemies=[],enemy_walls=[],solidWalls={},gameLoops=0,frame=0,GAME_STATE={MAIN_PAGE:0,SELECT_LEVEL:1,PLAY:2},tiles={background:{x:0,y:0},top_left:{x:16,y:0},top_middle:{x:24,y:0},dead:{x:40,y:0},target:{x:56,y:0}},current_game_state=GAME_STATE.MAIN_PAGE,player=new Player(64,100,29,32),gravity=1,blockSize=32,spritesheet=new Image,wall=[],lava=[],decoTile=[],spawn={x:0,y:0},target=[],map0=[23,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2,4,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];map1=[23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,9,9,4,4,4,4,4,4,4,4,9,9,4,4,4,4,4,4,4,4,4,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,4,4,4,4,4,4,4,-1,0,0,0,4,4,4,4,4,4,4,4,0,0,0,-2,4,4,4,4,4,4,4,1,1,0,0,4,4,9,4,4,9,4,4,0,0,1,1,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,-8,0,-7,0,0,-8,-8,0,0,-7,0,-8,4,4,4,4,4,4,4,4,4,4,4,0,1,1,1,1,2,2,1,1,1,1,0,4,4,4,4,4,4,4,4,4,4,4,2,4,4,4,4,4,4,4,4,4,4,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],map2=[23,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,9,9,9,9,9,9,9,4,4,4,4,4,4,9,9,9,4,4,4,9,9,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,0,0,0,0,-8,-7,0,0,0,0,-7,0,0,0,0,-8,0,0,0,0,4,4,-2,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,4,4,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,9,9,4,4,4,4,4,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,0,-8,0,0,0,-7,0,-7,0,0,0,0,-8,0,0,0,0,0,0,0,4,4,-1,0,0,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,4,4,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],map3=[23,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,9,9,9,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,-1,0,0,-8,0,0,-7,0,-8,0,0,4,4,4,4,4,4,4,4,4,4,4,4,1,1,2,2,1,1,1,1,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,4,4,4,4,4,4,4,9,9,9,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,4,0,0,0,1,0,0,0,0,-2,0,0,0,0,4,4,0,0,0,0,0,0,0,4,2,2,2,4,0,0,0,0,1,0,0,0,0,4,4,1,1,1,1,1,1,1,4,4,4,4,4,2,2,2,2,4,2,2,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];var maps=[map0,map1,map2,map3],current_map=0;gameScene.load=function(e){canvas.width=512,canvas.height=384,spritesheet.src="assets/media/spritesheet.png",cam=new Camera,solidWalls[1]=!0,solidWalls[3]=!0,solidWalls[4]=!0,null==e&&(e=map0),setMap(e,blockSize),player.x=spawn.x,player.y=spawn.y,player.animation=0,sprites.skewers=new Sprite(16,0,8,8),sprites.grass_2=new Sprite(0,0,8,8),sprites.grass_3=new Sprite(8,0,8,8),sprites.idle_1=new Sprite(0,8,8,8),sprites.idle_2=new Sprite(8,8,8,8),sprites.idle_3=new Sprite(16,8,8,8),animations.idle=new Animation(["idle_1","idle_2","idle_3","idle_2"],.1),sprites.walk_1=new Sprite(24,8,8,8),sprites.walk_2=new Sprite(32,8,8,8),sprites.walk_3=new Sprite(40,8,8,8),animations.walk=new Animation(["walk_1","walk_2","walk_3","walk_2"],.15),sprites.lava_1=new Sprite(56,0,8,8),sprites.lava_2=new Sprite(64,0,8,8),sprites.lava_3=new Sprite(72,0,8,8),sprites.lava_4=new Sprite(48,8,8,8),sprites.lava_5=new Sprite(56,8,8,8),sprites.lava_6=new Sprite(64,8,8,8),sprites.lava_7=new Sprite(72,8,8,8),animations.lava=new Animation(["lava_1","lava_2","lava_3","lava_4","lava_5","lava_6","lava_7"],.09),sprites.e1=new Sprite(80,0,8,8),sprites.e2=new Sprite(88,0,8,8),sprites.e3=new Sprite(80,8,8,8),sprites.e4=new Sprite(88,8,8,8),animations.dead=new Animation(["e1","e2","e1","e2","e3","e2","e4","e3","e4"],2.5),sprites.en1=new Sprite(24,0,8,8),sprites.en2=new Sprite(32,0,8,8),sprites.en3=new Sprite(40,0,8,8),sprites.en4=new Sprite(48,0,8,8),animations.enemy=new Animation(["en1","en2","en3","en4","en3","en2"],.07),sprites.flag=new Sprite(16,0,8,8),aa.add("gravity_change",10,[[0,,.2075,,.2596,.4593,,.1299,,,,,,.4677,,,,,.4121,,,.0524,,.5]]),aa.add("dead",10,[[3,.0304,.2241,.0459,.2958,.5655,,,-.4732,.0367,-.3139,.9488,,.9239,.0039,.5782,.3299,-.0565,.9542,7e-4,.1345,8e-4,.4494,.5]]),reset_level(),ctx.globalAlpha=0,++loadingTimer},gameScene.update=function(){for(++gameLoops,lastGravity=gravity,-1==player.state&&(++deadTimer,deadTimer>50&&(reset_level(),player.state=0,deadTimer=0)),loadingTimer>=1&&(++loadingTimer,ctx.globalAlpha+=loadingTimer/300),loadingTimer>=100&&(loadingTimer=0),0==loadingTimer&&-1!=player.state&&(ctx.globalAlpha=1,input()),1==gravity&&(player.vy+=1,player.vy>10&&(player.vy=10)),-1==gravity&&(player.vy-=1,player.vy<-10&&(player.vy=-10)),i=0,l=enemies.length;l>i;i+=1){if(enemies[i].direction==DIR_RIGHT){for(enemies[i].x+=1,j=0;j<wall.length;j+=1)enemies[i].intersects(wall[j])&&(enemies[i].direction=DIR_LEFT);for(j=0;j<enemy_walls.length;j+=1)enemies[i].intersects(enemy_walls[j])&&(enemies[i].direction=DIR_LEFT)}if(enemies[i].direction==DIR_LEFT){for(enemies[i].x-=1,j=0;j<wall.length;j+=1)enemies[i].intersects(wall[j])&&(enemies[i].direction=DIR_RIGHT);for(j=0;j<enemy_walls.length;j+=1)enemies[i].intersects(enemy_walls[j])&&(enemies[i].direction=DIR_RIGHT)}}for(player.x+=player.vx,i=0,l=wall.length;l>i;i+=1)player.intersects(wall[i])&&(player.x=player.vx>0?wall[i].x-wall[i].width:wall[i].x+wall[i].width,player.vx=0);for(player.onGround=!1,player.y+=player.vy,i=0,l=wall.length;l>i;++i)1==gravity&&player.intersects(wall[i])&&(player.vy>0&&(player.y=wall[i].y-wall[i].height,player.onGround=!0),player.vy=0),-1==gravity&&player.intersects(wall[i])&&(player.vy<0&&(player.y=wall[i].y+wall[i].height,player.onGround=!0),player.vy=0);for(i=0,l=lava.length;l>i;++i)player.intersects(lava[i])&&(player.state=-1,aa.play("dead"));for(i=0,l=enemies.length;l>i;++i)player.intersects(enemies[i])&&(player.state=-1,aa.play("dead"));for(i=0,l=target.length;l>i;++i)player.intersects(target[i])&&(++current_map,current_map>=maps.length&&(win=!0),loadScene(gameScene,maps[current_map]));cam.focus(player.x,player.y)},gameScene.draw=function(){if(ctx.imageSmoothingEnabled=!1,ctx.imageSmoothingEnabled=!1,ctx.mozImageSmoothingEnabled=!1,1==win)ctx.font="30pt Calibri",ctx.textAlign="center",ctx.fillStyle="#ecf0f1",ctx.fillText("You Win!",canvas.width/2,canvas.height/2);else if(0==loadingTimer){var e=ctx.createLinearGradient(0,0,0,canvas.height);for(e.addColorStop(0,"#8ED6FF"),e.addColorStop(1,"#004CB3"),ctx.fillStyle=e,ctx.fillRect(0,0,canvas.width,canvas.height),i=0,l=wall.length;l>i;i+=1)wall[i].draw();for(i=0,l=decoTile.length;l>i;i+=1)decoTile[i].draw();for(ctx.fillStyle="#f00",i=0,l=lava.length;l>i;i+=1)lava[i].draw();for(i=0,l=enemies.length;l>i;i+=1)enemies[i].draw();for(ctx.fillStyle="#f0f",i=0,l=target.length;l>i;i+=1)target[i].draw();ctx.fillStyle="#0f0",player.draw()}else ctx.font="30pt Calibri",ctx.textAlign="center",ctx.fillStyle="#ecf0f1",ctx.fillText("Level "+current_map,canvas.width/2,canvas.height/2)},mainScene.update=function(){++gameLoops,13 in keysDown&&loadScene(gameScene,map0)},mainScene.draw=function(){ctx.imageSmoothingEnabled=!1,ctx.imageSmoothingEnabled=!1,ctx.mozImageSmoothingEnabled=!1,ctx.globalAlpha=1;var e=canvas.width/2,t=canvas.height/2,i=70;ctx.beginPath(),ctx.arc(e,t,i,0,2*Math.PI,!1),ctx.fillStyle="green",ctx.fill(),ctx.lineWidth=5,ctx.strokeStyle="#003300",ctx.stroke(),ctx.fillStyle="#efefef",ctx.fillRect(0,0,canvas.width,canvas.height),ctx.fillStyle="#000",ctx.font="30pt Calibri",ctx.textAlign="center",ctx.fillText("Reverse Gravity Ninja",canvas.width/2,60),ctx.font="12pt Calibri",ctx.textAlign="center",~~(.1*gameLoops)%2==0&&ctx.fillText("> Press Enter <",canvas.width-200,250),animations.idle.play(50,200,128,128,1,1)};