let prize_config = {
    count: 12,
    prize_names: ["3000 credits", "35% off", "hard luck", "70% off",'Swagpack',"100% off", "Netflix Subs", "50% off","Amazon voucher","2 Extra spin","shirt","book"]
}


let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 380,

    scene: {
        preload: preload,
        create: create,
        update: update,
    }

};


let game = new Phaser.Game(config);


function preload() {
    console.log("prelaod");
    this.load.image('background', '../assets/back.jpg');
    this.load.image('wheel', '../assets/wheel.png');
    this.load.image('pin', '../assets/pin.png');
    this.load.image('stand', '../assets/stand.png');
    this.load.image('button', '../assets/button2.png');

    this.load.audio('bgAudio','../assets/audio1.mp3');
    


}

function create() {
    console.log("create");
    spins_left=2;
    let W = game.config.width;
    let H = game.config.height;
    let background = this.add.sprite(W / 2+100, H / 2, 'background');
    background.setScale(0.20);
    this.wheel = this.add.sprite(W / 2+100, H / 2, 'wheel');
    this.wheel.setScale(0.15);
    this.wheel.depth = 1;
    this.pin = this.add.sprite(W / 2+100, H / 2 - 150, 'pin');
    this.pin.setScale(0.15);
    this.pin.depth = 2;
    this.stand = this.add.sprite(W / 2+100, H / 2 + 170, 'stand');
    this.stand.setScale(0.15);
    //event listener
    // this.input.on("pointerdown", spinwheel, this);
    this.button=this.add.sprite(200,200,'button').setInteractive();
    this.button.setScale(0.18);

    this.sound = this.sound.add('bgAudio');
    
    
        this.button.on("pointerdown",spinwheel,this);
    

    //text object
    font_style = {
        font: "bold 30px Roboto",
        align: "center",
        color: "red",


    }
    this.game_text = this.add.text(20, 20, 'WELCOME TO SPIN & WIN', font_style);
    this.spin_text=this.add.text(W-200,20,"spins left: "+spins_left,font_style);

}




//game loop
function update() {
    console.log("inside update");
    


}

function spinwheel() {
    if(spins_left>0)
        spins_left-=1;
    this.game_text.setText("Spinning!! Hold On...");
    this.spin_text.setText("Spin Left: "+spins_left);
    this.button.disableInteractive();
    this.sound.play({volume: 1});
    
    
   
    
    
    
    //spinning logic
    let rounds = Phaser.Math.Between(2, 7) ;
    let degrees = Phaser.Math.Between(0, 11);
    let total_angle = rounds*360 + degrees*30;
    
    // let indx= prize_config.count-1-Math.floor(degrees/(360/prize_config.count));
    let indx=prize_config.count-degrees-1;

    tween = this.tweens.add({
        targets:this.wheel,
        angle: total_angle,
        ease: "Cubic.easeOut",
        duration: 10000,
        callbackScope: this,
        onComplete: function () {
            this.game_text.setText("you won");
            console.log(indx);
            this.game_text.setText("you won: " + prize_config.prize_names[indx]);
            if(degrees==2)
            {
                spins_left+=2;

            }
            this.spin_text.setText("Spin Left: "+spins_left);
            if(spins_left>0)
                this.button.setInteractive();
        }


        


       
    });


    tween2=this.tweens.add({
        targets: this.sound,
        volume: 0.5,
        duration: 12000
    });

   



   
}