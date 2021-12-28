'use strict';

{
    const btn = document.getElementById('btn');
    const log = document.getElementById('log');
    const pointview = document.getElementById('pointview');
    const shop = document.getElementById('shop');
    const outClickerShop = document.getElementById('outClickerShop');
    const missValuePlus = document.getElementById('missValuePlus');
    const clickUp = document.getElementById('clickUp');
    const real = document.getElementById('real');
    const bonusUp = document.getElementById('bonusUp');
    const save = document.getElementById('save');
    const saveDelete = document.getElementById('saveDelete');

    let totals = {t1:0,
                    t1zg:0,
                    t1kt:0,
                    t2:0,
                    t3:0,
                    t4:0,
                    t5:0,
                    t6:0,
                    t7:0,
                    miss:0,
    };

    let total = 0;
    let point = 0;
    let outNumber = 0;
    let outClickerValue = 300;
    let missValue = 0;
    let missShopValue = 100;
    let clickPerClick = 0;
    let clickPerClickValue = 300;
    let bonusUpValue = 1000;
    let bonusUpBuyed = 0;

    const pointSave = () =>{
        localStorage.setItem('point',point);
        localStorage.setItem('total',total);
        localStorage.setItem('outNumber',outNumber);
        localStorage.setItem('outClickerValue',outClickerValue);
        localStorage.setItem('missValue',missValue);
        localStorage.setItem('missShopValue',missShopValue);
        localStorage.setItem('clickPerClick',clickPerClick);
        localStorage.setItem('clickPerClickValue',clickPerClickValue);
        localStorage.setItem('bonusUpValue',bonusUpValue);
        localStorage.setItem('bonusUpBuyed',bonusUpBuyed);
        localStorage.setItem('totals', JSON.stringify(totals));
    }

    save.addEventListener('click',()=>{
        pointSave();
    });

    saveDelete.addEventListener('click',()=>{
        const whiteScreen = document.createElement('div');
        whiteScreen.classList.add('whiteScreen');
        document.body.appendChild(whiteScreen);
        const saveDeleteCheck = document.createElement('div');
        saveDeleteCheck.innerText = 'データを削除してよろしいですか？';
        document.body.appendChild(saveDeleteCheck);
        const saveDeleteCheckOK = document.createElement('div');
        saveDeleteCheckOK.innerText = 'OK';
        const saveDeleteCheckNO = document.createElement('div');
        saveDeleteCheckNO.innerText = 'NO';
        const conteiner = document.createElement('div');
        conteiner.appendChild(saveDeleteCheckOK);
        conteiner.appendChild(saveDeleteCheckNO);
        saveDeleteCheck.appendChild(conteiner);
        saveDeleteCheck.classList.add('saveDelete');

        saveDeleteCheckNO.addEventListener('click',()=>{
            saveDeleteCheck.remove();
            whiteScreen.remove();
        });

        saveDeleteCheckOK.addEventListener('click',()=>{
            localStorage.clear();
            totals = {t1:0,
                t1zg:0,
                t1kt:0,
                t2:0,
                t3:0,
                t4:0,
                t5:0,
                t6:0,
                t7:0,
                miss:0,
            };

            total = 0;
            point = 0;
            outNumber = 0;
            outClickerValue = 300;
            missValue = 0;
            missShopValue = 100;
            clickPerClick = 0;
            clickPerClickValue = 300;
            bonusUpValue = 1000;
            bonusUpBuyed = 0;

            reloadScreen();
            saveDeleteCheck.remove();
            whiteScreen.remove();

        });
    });

    const reloadScreen = ()=>{
        const viewPoint = point.toLocaleString();
        pointview.innerText = `${viewPoint}point`;
        outClickerShop.innerText=`所持数:${outNumber} 自動購入装置+1 cost:${outClickerValue.toLocaleString()}point`;
        missValuePlus.innerText = `所持数:${missValue/10} ハズレでもpoint獲得+10 cost:${missShopValue.toLocaleString()}point`;
        clickUp.innerText = `所持数:${clickPerClick} クリックで獲得するクジ+1 cost:${clickPerClickValue.toLocaleString()}`;
        bonusUp.innerText = `ボーナス%:${5*bonusUpBuyed}% 当たりの配当5%アップ cost:${bonusUpValue.toLocaleString()}`;
        document.getElementById('total').innerText = 
        `一等:${totals.t1}
        前後賞:${totals.t1zg}
        組違い賞:${totals.t1kt}
        二等:${totals.t2}
        三等:${totals.t3}
        四等:${totals.t4}
        五等:${totals.t5}
        六等:${totals.t6}
        七等:${totals.t7}
        ハズレ:${totals.miss}
        引いた回数:${total}\n`;
        realRload();
    };

    const loadPoint = () =>{
        if(localStorage.getItem('point')){
            console.log('saveデータあり');
            point = Number(localStorage.getItem('point'));
            total = Number(localStorage.getItem('total'));
            outNumber = Number(localStorage.getItem('outNumber'));
            outClickerValue = Number(localStorage.getItem('outClickerValue'));
            missValue = Number(localStorage.getItem('missValue'));
            missShopValue = Number(localStorage.getItem('missShopValue'));
            clickPerClick = Number(localStorage.getItem('clickPerClick'));
            clickPerClickValue = Number(localStorage.getItem('clickPerClickValue'));
            bonusUpValue = Number(localStorage.getItem('bonusUpValue'));
            bonusUpBuyed = Number(localStorage.getItem('bonusUpBuyed'));
            totals = JSON.parse(localStorage.getItem('totals'));
            
            reloadScreen();

        }
    };

    const outSave = () => {
        pointSave();
        setTimeout(outSave,10000);
    };

    const randomNumber = () =>{
        return Math.floor(Math.random()*20000000);
    };

    const outClick = () => {
        for(let i = 0; i < outNumber; i++){
            clickHandler();
        }
        setTimeout(outClick,1000);
    };

    outClickerShop.addEventListener('click',()=>{
        if(outClickerValue <= point){
            point = point - outClickerValue;
            outNumber++;
            outClickerValue = outClickerValue * 1.2;
            outClickerValue = Math.floor(outClickerValue);
            outClickerShop.innerText=`所持数:${outNumber} 自動購入装置+1 cost:${outClickerValue.toLocaleString()}point`;
            const viewPoint = point.toLocaleString();
            pointview.innerText = `${viewPoint}point`;
        }
    });

    missValuePlus.addEventListener('click',()=>{
        if(missShopValue <= point){
            point = point - missShopValue;
            missValue+=10;
            missShopValue = Math.floor(missShopValue * 1.2);
            missValuePlus.innerText = `所持数:${missValue/10} ハズレでもpoint獲得+10 cost:${missShopValue.toLocaleString()}point`;
            const viewPoint = point.toLocaleString();
            pointview.innerText = `${viewPoint}point`;
        }
    });

    clickUp.addEventListener('click',()=>{
        if(clickPerClickValue <= point){
            point = point - clickPerClickValue;
            clickPerClick++;
            clickPerClickValue = Math.floor(clickPerClickValue * 1.2);
            clickUp.innerText = `所持数:${clickPerClick} クリックで獲得するクジ+1 cost:${clickPerClickValue.toLocaleString()}`;
            const viewPoint = point.toLocaleString();
            pointview.innerText = `${viewPoint}point`;
        }
    });

    bonusUp.addEventListener('click',()=>{
        if(bonusUpValue <= point){
            point = point - bonusUpValue;
            bonusUpBuyed++;
            bonusUpValue = Math.floor(bonusUpValue*1.2);
            bonusUp.innerText = `ボーナス%:${5*bonusUpBuyed}% 当たりの配当5%アップ cost:${bonusUpValue.toLocaleString()}`;
            const viewPoint = point.toLocaleString();
            pointview.innerText = `${viewPoint}point`;
        }
    });

    
    
    const clickHandler = () =>{
        const chicketNumber = randomNumber();
        total++;
        if(chicketNumber === 0){
            log.innerText = "一等";
            totals.t1++;
            point+=Math.floor(700000000 * (1 + bonusUpBuyed * 5 / 100));
        }else if(chicketNumber === 1|| chicketNumber === 2){
            log.innerText = "前後賞";
            totals.t1zg++;
            point+=Math.floor(150000000 * (1 + bonusUpBuyed * 5 / 100));
        } 
        else if(2 < chicketNumber && chicketNumber <= 202){
            log.innerText = "組違い賞";
            totals.t1kt++;
            point+=Math.floor(300000 * (1 + bonusUpBuyed * 5 / 100));
        } 
        else if(202 < chicketNumber && chicketNumber <= 206){
            log.innerText = "二等";
            totals.t2++;
            point+=Math.floor(10000000 * (1 + bonusUpBuyed * 5 / 100));
        } 
        else if(222 < chicketNumber && chicketNumber <= 262){
            log.innerText = "三等";
            totals.t3++;
            point+=Math.floor(1000000 * (1 + bonusUpBuyed * 5 / 100));
        } 
        else if(422 < chicketNumber && chicketNumber <= 2422){
            log.innerText = "四等";
            totals.t4++;
            point+=Math.floor(50000 * (1 + bonusUpBuyed * 5 / 100));
        } 
        else if(2422 < chicketNumber && chicketNumber <= 62482){
            log.innerText = "五等";
            totals.t5++;
            point+=Math.floor(10000 * (1 + bonusUpBuyed * 5 / 100));
        } 
        else if(62482 < chicketNumber && chicketNumber <= 262482){
            log.innerText = "六等";
            totals.t6++;
            point+=Math.floor(3000 * (1 + bonusUpBuyed * 5 / 100));
        } else if(262482 < chicketNumber && chicketNumber <= 2262482){
            log.innerText = "七等";
            totals.t7++;
            point+=Math.floor(300 * (1 + bonusUpBuyed * 5 / 100));
        } else{
            log.innerText = "ハズレ";
            totals.miss++;
            point+=Math.floor(0+missValue * (1 + bonusUpBuyed * 5 / 100));
        }

        document.getElementById('total').innerText = 
        `一等:${totals.t1}
        前後賞:${totals.t1zg}
        組違い賞:${totals.t1kt}
        二等:${totals.t2}
        三等:${totals.t3}
        四等:${totals.t4}
        五等:${totals.t5}
        六等:${totals.t6}
        七等:${totals.t7}
        ハズレ:${totals.miss}
        引いた回数:${total}\n`;
        const viewPoint = point.toLocaleString();
        pointview.innerText = `${viewPoint}point`;
        realRload();
    };
    btn.addEventListener('click',()=>{
        for(let i = 0;i < clickPerClick+1;i++){
            clickHandler();
        }
    });
    
    const realRload = () =>{
        const lose = total *300;
        const win = (totals.t1*700000000 + totals.t1zg*150000000 + totals.t1kt*300000 + totals.t2*10000000+
                     totals.t3*1000000 + totals.t4*50000 + totals.t5*10000 + totals.t6*3000 + totals.t7*300);
        real.innerText = `仮想投資額:${lose.toLocaleString()} 仮想獲得賞金:${win.toLocaleString()} 仮想収支:${(win - lose).toLocaleString()}`;
    };

    outClick();
    loadPoint();
    outSave();
}