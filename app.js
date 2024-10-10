const word=document.getElementById("word");
const counterEl=document.getElementById("counter");
const message=document.getElementById("message");
const highest=document.getElementById("highest");
const score=document.getElementById("score")
const alphabet=document.querySelectorAll('.alp');
const high=parseInt(localStorage.getItem("high"))||0;
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
        for(let i = 0; i < this.guess.word.length; i++) {
            this.value.push(this.guess.word[i].toUpperCase());
            this.guessed.push(false);
            const unit=document.createElement('DIV');
            unit.setAttribute('class','letter');
            word.append(unit);
        }
        this.letter=document.querySelectorAll('.letter');
        message.textContent=this.guess.hint;
        message.style.color="violet";
    }
    decreaseLife(){
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
            counterEl.textContent=this.decreaseLife();
            alphabet[key.charCodeAt(0)-65].style.color="red";
        }else if(!flag){
            alphabet[key.charCodeAt(0)-65].style.color="green";
        }
        if(this.life==0){
            for(let i=0;i<this.value.length;i++){
                this.letter[i].textContent=this.value[i];
            }
            this.score=0;
            message.textContent="You Lose";
            message.style.color="red";
            setTimeout(()=>{
                this.getWord();
                score.textContent=this.score;
            },3000);
        }
        if(x){
            this.score++;
            message.textContent="You Won";
            message.style.color="green";
            const high=parseInt(localStorage.getItem("high"));
            setTimeout(()=>{
                if(high<this.score){
                    localStorage.setItem("high",this.score);
                    highest.textContent=this.score;
                }                
                this.getWord();
                score.textContent=this.score;
            },1000);
        }
    }
    reStart(){
        let child=word.lastChild;
        while(child){
            word.removeChild(child);
            child=word.lastChild;
        }
        counterEl.textContent=this.life;
        alphabet.forEach(element => {
            element.style.color="";
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

wordGuessing();
