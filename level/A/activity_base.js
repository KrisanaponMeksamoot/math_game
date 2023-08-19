const container = document.getElementById("container");

let score = 0;
let done = 0;
let fullscore = 0;
let finish_cb = undefined;

function startTest(q_num,generator,onfinish=undefined) {
    let table = document.createElement("table");
    let last_inp = null;
    let last_ans;
    for (let i=0;i<q_num;i++) {
        let tr = document.createElement("tr");
        let q = generator(i);
        let td_q = document.createElement("td");
        td_q.innerText = q.q+" =";
        tr.appendChild(td_q);
        let td_a = document.createElement("td");
        let inp = document.createElement("input");
        inp.size = q.a.length;
        if (last_inp != null)
            last_inp.onkeydown = getCallBack(last_ans,inp);
        last_inp = inp;
        last_ans = q.a;
        td_a.appendChild(inp);
        tr.appendChild(td_a);
        table.appendChild(tr);
    }
    last_inp.onkeydown = getCallBack(last_ans);
    score = 0;
    done = 0;
    fullscore = q_num;
    finish_cb = onfinish;
    container.replaceChildren(table);
}

function getCallBack(ans,next=undefined) {
    return (e)=>check(e,ans,next);
}

function check(e,ans,next=undefined) {
    if (e.code != "Enter")
        return;
    let inp = e.target;
    if (checkAns(inp.value,ans)) {
        assignCorrect(inp);
    } else {
        assignWrong(inp);
    }
    done++;
    // console.log(done,score,fullscore);
    if (done==fullscore&&finish_cb!=undefined)
        finish_cb(score,fullscore);
    if (next!=undefined)
        next.focus();
}

function checkAns(a,b) {
    return a==b;
}

function assignCorrect(inp) {
    inp.disabled = true;
    inp.className = "correct";
    score++;
}
function assignWrong(inp) {
    inp.disabled = true;
    inp.className = "wrong";
}

function randInt(start,end,gap=1) {
    return Math.floor(Math.random()*(end-start)/gap)*gap+start;
}