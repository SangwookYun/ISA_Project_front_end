// const base = "https://api-jasonandyun.herokuapp.com/"
const base = "http://localhost:3001/api/"

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
    console.log(restaurant_id)
    console.log(base+'restaurant/'+restaurant_id)
    xhttp.open('GET', base+'restaurant/'+restaurant_id, true)
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState==4 && this.status ==200) {
            console.log(this.responseText)
            callback(this.responseText)        
        }
    }
    
}

const delete_restaurant_detail =() => {
    let password = prompt('Are u a admin? please input 4 digit password')
    if(password==1234) {
        deleteRestaurant((result)=> {
            console.log(result);
        })
        window.location.href="../index.html"
    }else {
        alert("You are not authorized. Thanks"s)
    }
    
}

const deleteRestaurant =(callback)=> {
    let xhttp= new XMLHttpRequest();
    console.log("Remove")
    let parameter = window.location.href    
    let restaurant_id = parameter.substring(parameter.length-1, parameter.length)

    xhttp.open('DELETE', base+'restaurant/'+restaurant_id, true)
    xhttp.send()
    xhttp.onreadystatechange = function() {
        if(this.readyState==4 && this.status ==200) {
            console.log(this.responseText)
            callback(this.responseText)        
        }
    }
}

window.onpageshow = renderingRestaurantInfo_detail;