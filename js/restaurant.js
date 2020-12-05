// const base = "https://api-jasonandyun.herokuapp.com/api/v1/"
let user_login = localStorage.getItem('login_user')
localStorage.setItem('login_user', 'true')
console.log(user_login)
const base = "http://localhost:3000/api/v1/"

const renderingRestaurantInfo_detail = () => {
    detailPageSetup((result) => {
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
    detailPageSetup_menu((result) => {
        console.log(result);
        let res = JSON.parse(result);
        console.log(res.length)
        for (let i = 0; i < res.length; i++) {
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
            menu_description.innerText = res[i]['menudescription']


            node.appendChild(menu_item)
            node.appendChild(menu_price)
            node.appendChild(menu_description)



            let menu_container = document.getElementById('menu_container');
            menu_container.appendChild(node);
        }

    })


}

const detailPageSetup = (callback) => {
    let xhttp = new XMLHttpRequest();
    console.log("detailPage");

    let parameter = window.location.href
    let restaurant_id = parameter.substring(parameter.length - 1, parameter.length)
    console.log(restaurant_id)
    console.log(base + 'restaurant/' + restaurant_id)
    xhttp.open('GET', base + 'restaurant/' + restaurant_id, true)
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)
            callback(this.responseText)
        }
    }

}

const detailPageSetup_menu = (callback) => {
    let xhttp = new XMLHttpRequest();
    let parameter = window.location.href
    let restaurant_id = parameter.substring(parameter.length - 1, parameter.length)
    xhttp.open('GET', base + 'menu/' + restaurant_id, true)
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)
            callback(this.responseText)
        }
    }

}

const add_menu = () => {
    add_menu_handler((result) => {
        console.log(result)
    })
}

const add_menu_handler = (callback) => {
    let xhttp = new XMLHttpRequest();
    let parameter = window.location.href;
    let restaurant_id = parameter.substring(parameter.length - 1, parameter.length);
    xhttp.open('POST', base + 'menu/' + restaurant_id, true)

    let new_menu_name = document.getElementById('new_menu_name').value;
    let new_menu_amount = document.getElementById('new_menu_amount').value;
    let new_menu_desc = document.getElementById('new_menu_desc').value;
    let data = {
        "restaurant_id": restaurant_id,
        "menu_name": new_menu_name,
        "menu_amount": new_menu_amount,
        "menu_desc": new_menu_desc
    }
    console.log(restaurant_id)
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(data))
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)
            callback(this.responseText)
        }
    }
}

const delete_menu = () => {
    console.log("delete menu")
    delete_menu_show_all_handler((res) => {
        res = JSON.parse(res)
        console.log(res)
        if (document.getElementById('btn_container_remove_menu')) {
            let temp = document.getElementById('btn_container_remove_menu')
            document.getElementById('remove_detail_modal_menu').removeChild(temp);
        }


        let btn_container = document.createElement('div');
        btn_container.id = 'btn_container_remove_menu'

        for (let i = 0; i < res.length; i++) {
            let btn = document.createElement('Button');
            btn.innerText = res[i]['items']
            btn.classList.add('remove_btn')
            btn_container.append(btn);
            btn.id = 'btn_' + res[i]['menuid'];
            btn.addEventListener('click', function() {
                console.log(this.id);
                let target = this.id
                delete_menu_by_id(target);
            })
        }
        document.getElementById('remove_detail_modal_menu').append(btn_container)



    })
}
const delete_menu_show_all_handler = (callback) => { // TODO UPDATE XHTTP CALL /menu/all/:restaurantid
    let xhttp = new XMLHttpRequest();
    let parameter = window.location.href;
    let restaurant_id = parameter.substring(parameter.length - 1, parameter.length);
    xhttp.open('GET', base + 'menu/del/all/' + restaurant_id, true)
    xhttp.send()
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            callback(this.responseText)
        }
    }

}

const delete_menu_by_id = (target) => {
    delete_menu_by_id_handler(target, (result) => {
        console.log(result);
    })
}
const delete_menu_by_id_handler = (target, callback) => {
    console.log(target);
    xhttp = new XMLHttpRequest();
    let parameter = target.substring(target.length - 1, target.length);
    xhttp.open('DELETE', base + 'menu/' + parameter, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText)
        }
    }
}

window.onpageshow = renderingRestaurantInfo_detail;