// const base = "https://api-jasonandyun.herokuapp.com/"
const base = "http://localhost:3000/"

const renderingRestaurantInfo_detail  = ()=> {
    detailPageSetup((result)=> {
        let res = JSON.parse(result)
        let res_name = document.getElementById('res_name_detail');
        let res_desc = document.getElementById('res_desc_detail');
        let res_phone = document.getElementById('res_phone_detail');
        let res_addr = document.getElementById('res_addr_detail');
        console.log(res)
        res_name.innerText = res[0]['restaurant_name']
        res_desc.innerText = res[0]['restaurant_desc']
        res_phone.innerText = res[0]['restaurant_phone']
        res_addr.innerText = res[0]['restaurant_addr']

    })
  
    
}

const detailPageSetup = (callback)=> {
    let xhttp= new XMLHttpRequest();
    console.log("detailPage");
    
    let parameter = window.location.href
    let restaurant_id = parameter.substring(parameter.length-1, parameter.length)
    xhttp.open('GET', base+'restaurant/'+restaurant_id, true)
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState==4 && this.status ==200) {
            console.log(this.responseText)
            callback(this.responseText)        
        }
    }
    
}

window.onpageshow = renderingRestaurantInfo_detail;