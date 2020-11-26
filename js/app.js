// const base = "https://api-jasonandyun.herokuapp.com/"
const base = "http://localhost:3000/"
let testVarialbe;
const renderingRestaurantInfo  = ()=> {
    mainPageSetup((result)=> {
        console.log(result)
        let obj = JSON.parse(result);
        console.log(obj)
        for(let i=1;i<=obj.length;i++) {
            let rest_name = "res_name_"+i;
            let rest_desc = "res_desc_"+i;
            document.getElementById(rest_name).innerText = obj[i-1].restaurant_name;
            document.getElementById(rest_desc).innerText = obj[i-1].restaurant_desc;
        }
    })
  
    
}

const mainPageSetup = (callback)=> {
    let xhttp= new XMLHttpRequest();
    console.log("mainPageSetup");
    xhttp.open('GET', base, true)
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState==4 && this.status ==200) {
            console.log("this is working");
            console.log(this.responseText)
            callback(this.responseText)        
        }
    }
    
}

const test= ()=>{
    let xhttp = new XMLHttpRequest();
    console.log("Working?")
    xhttp.open("GET",base, true)
    console.log("Working2?")
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState==4 && this.status ==200) {
            console.log("this is working");
            console.log(this.responseText)
        }
    }


}
const goToDetailPage =(id) => {
    console.log(id)
    window.location.href = './src/restaurant.html'
    console.log(id);
    let a = document.getElementById('res_name_detail');
    console.log(a);
    testVarialbe = id;
    console.log(testVarialbe)
    
    
}
window.onpageshow = renderingRestaurantInfo;