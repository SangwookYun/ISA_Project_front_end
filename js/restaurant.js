// const base = "https://api-jasonandyun.herokuapp.com/"
const base = "http://localhost:3000/api/"

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
    detailPageSetup_menu((result)=> {
        console.log(result);
        let res = JSON.parse(result);
        console.log(res.length)
        for(let i =0;i<res.length;i++) {
            let node = document.createElement('div');
            node.classList.add('menu_box')

            let menu_item = document.createElement('div');
            let menu_description = document.createElement('div');
            let menu_price = document.createElement('div');
            menu_item.innerText = res[i]['items']
            menu_price.innerText = res[i]['menuprice']
            menu_item.classList.add('menu_item')
            menu_price.classList.add('menu_price')
            menu_description.classList.add('menu_description')
            menu_description.innerText= res[i]['menudescription']
            
            
            node.appendChild(menu_item)
            node.appendChild(menu_price)
            node.appendChild(menu_description)
            
            

            let menu_container= document.getElementById('menu_container');
            menu_container.appendChild(node);
        }

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

const detailPageSetup_menu = (callback)=> {
    let xhttp= new XMLHttpRequest();
    console.log("detailPage");
    
    let parameter = window.location.href    
    let restaurant_id = parameter.substring(parameter.length-1, parameter.length)
    xhttp.open('GET', base+'menu/'+restaurant_id, true)
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
        alert("You are not authorized. Thanks")
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