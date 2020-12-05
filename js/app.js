// const base = "https://api-jasonandyun.herokuapp.com/"
let login_user = localStorage.getItem('login_user')==undefined? localStorage.getItem('login_user'):false;
const base = "http://localhost:3000/"

const renderingRestaurantInfo_Main  = ()=> {
    mainPageSetup((result)=> {
        let obj = JSON.parse(result);
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
            console.log(this.responseText)
            callback(this.responseText)        
        }
    }
    
}

const goToDetailPage =(id) => {
    if(login_user) {
        let get_id = id.substring(id.length-1, id.length) 
        let url = './src/restaurant.html?'+get_id;
        window.location.href = url;
        console.log(window.location.href);    
    }else {
        alert("Please login first")
    }
    
}

const addRestaurant = () => {
    let xhttp= new XMLHttpRequest();
    xhttp.open('POST', base+'api/restaurant/', true)
    console.log(base+'api/restaurant/')
    let new_res_name = document.getElementById('new_res_name').value;
    let new_res_phone =document.getElementById('new_res_phone').value;
    let new_res_addr =document.getElementById('new_res_addr').value;
    let new_res_desc =document.getElementById('new_res_desc').value;
    let data = {
        "restaurant_name": new_res_name,
        "restaurant_phone": new_res_phone,
        "restaurant_addr": new_res_addr,
        "restaurant_desc": new_res_desc
    }
    
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(data))
    xhttp.onreadystatechange = function() {
        if(this.readyState==4 && this.status ==200) {
            console.log(this.responseText)
        }
    }
}

const admin_open = () => {
    let password = prompt('Are u a admin? please input 4 digit password')
    if(password==1234) {
        document.getElementById("admin_modal_btn").click();        
    }else {
        alert("You are not authorized. Thanks")
    }

}


const delete_restaurant_shows_all =() => {
    delete_restaurant((result)=> {
        let res = JSON.parse(result);
        console.log(res.length)
        console.log(res)
        
        if(document.getElementById('btn_container_remove')) {
            let temp = document.getElementById('btn_container_remove')
            document.getElementById('remove_detail_modal').removeChild(temp);
        }

        
        let btn_container = document.createElement('div');
        btn_container.id = 'btn_container_remove'
       
        for(let i =0;i<res.length;i++) {
            let btn = document.createElement('Button');
            btn.innerText = res[i]['restaurant_name']
            btn.classList.add('remove_btn')
            btn_container.append(btn);
            let n =i+1
            btn.id='btn_'+n;
            btn.addEventListener('click', function() {
                console.log(this.id);
                let target = this.id
                handler_deletion_restaurant(target)
            })
        }
        
        document.getElementById('remove_detail_modal').append(btn_container)

        document.getElementById('remove_modal_btn').click();
    })

}

const delete_restaurant = (callback) => {
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', base+'api/restaurant/del/all', true )
    
    xhttp.send()
    xhttp.onreadystatechange = function() {
        if(this.readyState==4 && this.status ==200) {
            callback(this.responseText)
        }
    }
   

}

const handler_deletion_restaurant  = (id) => {
    delete_restaurant_by_id(id, (result)=> {
        
    })
    
}
const delete_restaurant_by_id =(id, callback)=> {
    let xhttp= new XMLHttpRequest();
    console.log("Remove")
    console.log(this);
    // let parameter = window.location.href    
    let restaurant_id = id.substring(id.length-1, id.length)

    xhttp.open('DELETE', base+'api/restaurant/'+restaurant_id, true)
    xhttp.send()
    xhttp.onreadystatechange = function() {
        if(this.readyState==4 && this.status ==200) {
            console.log(this.responseText)
            callback(this.responseText)        
        }
    }
}

const login= ()=> {
    document.getElementById("login_btn").click();        
}

const signup= () => {
    document.getElementById('signup_btn').click();
}
const login_submit = ()=> {
    login_handler((result)=> {
        if(result=='password wrong') {
            document.getElementById('login_close_btn').click();
            alert('password wrong')
        }else {
            document.getElementById('login_close_btn').click();
            login_user=true;
            localStorage.setItem("login_user", login_user);
            console.log(result);
            console.log(JSON.parse(result))
            console.log(JSON.parse(result)[0])
            let name = JSON.parse(result)[0];
            document.getElementById('user_name').innerText = "Welcome "+name['userid'];

            alert('Login success')

        }
    })
}

const login_handler = (callback)=> {
    let xhttp = new XMLHttpRequest();
    let userid = document.getElementById('login_id').value;
    let password = document.getElementById('login_password').value;
    console.log(userid)
    console.log(password)
    xhttp.open('GET', base+'api/user/'+userid+"&"+password);
    xhttp.send()
    xhttp.onreadystatechange = function() {
        if(this.readyState==4 && this.status ==200) {
            
            callback(this.responseText)        
        }
    }
}


const check_duplicate_id =() => {
    duplicate_id_handler((result)=> {
        console.log(result=="true");
        if(result=="true") {
            console.log(result);
            alert("Change your id")
        }else {
            console.log(result);
            document.getElementById("duplicate_id_check").innerText = "done";
        }
    })
}
const duplicate_id_handler = (callback) => {
    let xhttp = new XMLHttpRequest();
    let userid = document.getElementById('signup_id').value;
    console.log(userid)
    xhttp.open('GET', base+'api/user/signup/'+userid);
    xhttp.send()
    xhttp.onreadystatechange = function() {
        if(this.readyState==4 && this.status ==200) {
            
            callback(this.responseText)        
        }
    }

}
const signup_submit =() => {
    console.log(document.getElementById('duplicate_id_check').innerHTML)
    if(document.getElementById('duplicate_id_check').innerHTML=="done") {
        signup_submit_handler((result)=> {
            console.log(result);
        })
    }else {
        alert("Do duplicate check first")
        
    }
}

const signup_submit_handler = (callback)=> {
    let xhttp = new XMLHttpRequest();
    let userid = document.getElementById('signup_id').value;
    let password = document.getElementById('signup_password').value;
    console.log(userid)
    console.log(password)
    xhttp.open('POST', base+'api/user/new/signup')
    let data = {
        "new_id" : userid,
        "new_password": password
    }
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(data))
    xhttp.onreadystatechange = function() {
        if(this.readyState==4 && this.status ==200) {
            console.log(this.responseText)
            callback(this.responseText);
        }
    }
}
window.onpageshow = renderingRestaurantInfo_Main;
