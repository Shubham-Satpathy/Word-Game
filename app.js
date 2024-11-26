const word=document.getElementById("word");
const message=document.getElementById("message");
const highest=document.getElementById("highest");
const score=document.getElementById("score")
const alphabet=document.querySelectorAll('.alp');
const high=parseInt(localStorage.getItem("high"))||0;
const heart=document.getElementById("heart");
const pop=document.getElementById("pop");
const won=document.getElementById("won");
const lost=document.getElementById("lost");

if(!high){
    localStorage.setItem("high",0);
}
highest.textContent=high;

class Word{
    score=0;
    getWord(){
        this.guess=Medium[Math.floor(Math.random()*Medium.length)];
        this.life=5;
        this.value=[];
        this.guessed=[];
        this.reStart();
        this.won=true;
        for(let i = 0; i < 5; i++) {
            const unit=document.createElement('DIV');
            const img=document.createElement('IMG');
            unit.setAttribute('class','heart-el');
            img.setAttribute('src','./assets/heart.png');
            unit.append(img);
            heart.append(unit);
        }
        this.heartEl=document.querySelectorAll('.heart-el');
        for(let i = 0; i < this.guess.word.length; i++) {
            this.value.push(this.guess.word[i].toUpperCase());
            this.guessed.push(false);
            const unit=document.createElement('DIV');
            unit.setAttribute('class','letter');
            word.append(unit);
        }
        this.letter=document.querySelectorAll('.letter');
        message.textContent=this.guess.hint;
        message.style.color="white";
    }
    decreaseLife(){
        pop.play();
        return --this.life;
    }
    typingLetter(key){
        const arr=this.value.map(e=> e==key);
        let flag=true;
        for(let i=0;i<this.value.length;i++){
            if(arr[i]){
                this.guessed[i]=true;
                this.letter[i].textContent=key;
                flag=false;
            }
        }
        let x=true;
        for(let i=0;i<this.guessed.length;i++){
            if(!this.guessed[i]){
                x=false;
                break;
            }
        }
        if(alphabet[key.charCodeAt(0)-65].style.color!="red" && flag){
            this.decreaseLife();
            this.heartEl[5-this.life-1].removeChild(this.heartEl[5-this.life-1].firstChild);
            alphabet[key.charCodeAt(0)-65].style.color="red";
        }else if(!flag){
            alphabet[key.charCodeAt(0)-65].style.color="green";
        }
        if(this.life==0 && this.won){
            for(let i=0;i<this.value.length;i++){
                this.letter[i].textContent=this.value[i];
            }
            this.won=false;
            this.score=0;
            message.textContent="You Lose";
            message.style.color="red";
            // alert(this.guess.word.toUpperCase());
            console.log(this.guess.word);
            console.log(this.guess.hint);
            lost.play();
            setTimeout(()=>{
                this.getWord();
                score.textContent=this.score;
            },3000);
        }
        if(x && this.won){
            this.score++;
            this.won=false;
            message.textContent="You Won";
            message.style.color="green";
            const high=parseInt(localStorage.getItem("high"));
            console.log(this.guess.word);
            console.log(this.guess.hint);
            won.play();
            setTimeout(()=>{
                if(high<this.score){
                    localStorage.setItem("high",this.score);
                    highest.textContent=this.score;
                }                
                this.getWord();
                score.textContent=this.score;
            },5000);
        }
    }
    reStart(){
        
        let child=word.lastChild;
        while(child){
            word.removeChild(child);
            child=word.lastChild;
        }
        child=heart.lastChild;
        while(child){
            heart.removeChild(child);
            child=heart.lastChild;
        }
        alphabet.forEach(element => {
            element.style.color="";
            element.style.textDecoration="";
        });
    }
}

const wordGuessing=()=>{
    const w=new Word();
    w.getWord();
    document.addEventListener("keypress",(e)=>{
        const key=e.key;
        if(key.match(/[a-z]/i)){
            w.typingLetter(key.toUpperCase());
        }
    });
    alphabet.forEach((element)=>{
        element.addEventListener("click",(e)=>{
            const key= e.target.innerText;
            w.typingLetter(key);
        });
    });
};
const boot=document.getElementById("boot");
let promise = document.querySelector('#startMusic');

const hardStart=()=>{
    boot.remove();
    promise.play();
    wordGuessing();
}

for(let i = 0; i < 5; i++) {
    const unit=document.createElement('DIV');
    const img=document.createElement('IMG');
    unit.setAttribute('class','heart-el');
    img.setAttribute('src','./assets/heart.png');
    unit.append(img);
    heart.append(unit);
}
